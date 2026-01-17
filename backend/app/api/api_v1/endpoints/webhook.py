import os
from dotenv import load_dotenv
load_dotenv()
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from imagekitio import ImageKit
from fastapi import HTTPException
import uuid
from pathlib import Path
from fastapi import File, UploadFile
from fastapi import Request

router = APIRouter()
@router.post("/webhook")
async def ondemand_webhook(request: Request):
    data = await request.json()

    execution_id = data.get("executionId")
    output = data.get("output")

    # store in DB / trigger next workflow / return to user
    print("Execution finished:", execution_id)
    print("Output:", output)

    return {"status": "received"}