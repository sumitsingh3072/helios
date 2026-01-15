from fastapi import APIRouter, File, UploadFile, Depends
from sqlalchemy.orm import Session

from backend.app.schemas.ocr import OCRResponse
from backend.app.schemas.document import Document, DocumentCreate
from backend.app.services.ocr_service import extract_text_from_image
from backend.app.api import deps
from backend.db import crud
from backend.models.user import User as UserModel

router = APIRouter()

@router.post("/upload", response_model=OCRResponse)
async def upload_image_for_ocr(
    *,
    db: Session = Depends(deps.get_db),
    file: UploadFile = File(...),
    current_user: UserModel = Depends(deps.get_current_user)
):
    contents = await file.read()
    extracted_text = extract_text_from_image(contents) #type: ignore

    # 2. Prepare the document data for the database
    doc_in = DocumentCreate(
        filename=file.filename,  # type: ignore
        extracted_text=extracted_text
    )
    owner_id: int = current_user.id  # type: ignore
    created_document = crud.create_user_document(
        db=db, doc=doc_in, owner_id=owner_id
    )

    return created_document