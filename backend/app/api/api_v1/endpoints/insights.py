from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import httpx
import os
import random
import json
from fastapi import APIRouter, File, UploadFile, Depends, Request
from backend.app.api import deps
from backend.models.user import User as UserModel
from backend.app.api import deps
router = APIRouter()
from dotenv import load_dotenv
load_dotenv()

ONDEMAND_API_KEY = os.getenv("onDemand_key")
BASE_URL = "https://api.on-demand.io/chat/v1"

# Change if your backend runs on a different host/port
INTERNAL_API_BASE = "http://localhost:8000/api/v1/"


@router.post("/get-insights")
async def get_insights(
    *,
    file: UploadFile = File(...),
    request: Request,
    current_user: UserModel = Depends(deps.get_current_user)
):
    try:
        # --------------------------------
        # 1️⃣ CALL /analyze INTERNALLY
        # --------------------------------
        file_bytes = await file.read()

        headers = {
            "Authorization": request.headers.get("authorization")
        }

        async with httpx.AsyncClient(timeout=60.0) as client:
            analyze_res = await client.post(
                f"{INTERNAL_API_BASE}document-analysis/analyze",
                headers=headers,
                files={
                    "file": (
                        file.filename,
                        file_bytes,
                        file.content_type
                    )
                }
            )

        analyze_res.raise_for_status()
        structured_data = analyze_res.json()

        # --------------------------------
        # 2️⃣ CREATE ON-DEMAND SESSION
        # --------------------------------
        ondemand_headers = {
            "apikey": f"{ONDEMAND_API_KEY}",
            "Content-Type": "application/json"
        }

        async with httpx.AsyncClient(timeout=90.0) as client:
            session_payload = {
                "externalUserID": str(random.randint(100000, 999999)),
                "agentIds": []
            }

            session_res = await client.post(
                f"{BASE_URL}/sessions",
                headers=ondemand_headers,
                json=session_payload
            )
            session_res.raise_for_status()
            session_id = session_res.json()["data"]["id"]

            # --------------------------------
            # 3️⃣ QUERY WITH STRUCTURED DATA
            # --------------------------------
            query_payload = {
                "endpointId": "predefined-gemini-3.0-pro",
                "query": (
                    "The following is structured financial data extracted from a document:\n\n"
                    f"{json.dumps(structured_data, indent=2)}\n\n"
                    "Generate a comprehensive financial advisory using ONLY this data."
                ),
                "agentIds": ["plugin-1726231605"],
                "responseMode": "sync",
                "reasoningMode": "medium",
                "modelConfigs": {
                    "fulfillmentPrompt": (
                        "You are a Supervisor Financial Agent.\n\n"
                        "Use only the provided structured data.\n"
                        "Do not ask for additional documents.\n"
                        "Do not mention tools or execution steps.\n"
                        "Return strictly valid JSON."
                    ),
                    "maxTokens": 1000,
                    "temperature": 0.7,
                    "topP": 1,
                    "presencePenalty": 0,
                    "frequencyPenalty": 0
                }
            }

            query_res = await client.post(
                f"{BASE_URL}/sessions/{session_id}/query",
                headers=ondemand_headers,
                json=query_payload
            )
            query_res.raise_for_status()
            query_data = query_res.json()

        # --------------------------------
        # 4️⃣ RETURN ONLY "answer"
        # --------------------------------
        raw_answer = query_data["data"]["answer"]

        try:
            return json.loads(raw_answer)
        except json.JSONDecodeError:
            return {"answer": raw_answer}

    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=e.response.text)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))