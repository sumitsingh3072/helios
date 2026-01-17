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

router = APIRouter()
imagekit = ImageKit(
    private_key=os.getenv("IMAGEKIT_PRIVATE_KEY")
)

ALLOWED_TYPES = {
    "application/pdf",
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp"
}

@router.post("/upload")
async def upload_and_sign(file: UploadFile = File(...)):
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(status_code=400, detail="Unsupported file type")

    ext = file.filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    try:
        upload_result = imagekit.files.upload(
            file=file.file.read(),
            file_name=filename,
            folder="/ondemand-docs",
            use_unique_file_name=False
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    # print(upload_result)
    signed_url = imagekit.helper.build_url(
        url_endpoint= os.getenv("IMAGEKIT_URL_ENDPOINT"),
        src=upload_result.file_path,
        signed=True,
        expire_seconds=600
    )

    return {
        "file_id": upload_result.file_id,
        "file_type": file.content_type,
        "signed_url": signed_url,
        "expires_in_seconds": 600
    }