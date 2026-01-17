from fastapi import APIRouter, File, UploadFile, Depends
from backend.app.schemas.document_analysis import DocumentAnalysisResponse
from backend.app.services import ocr_service
from backend.app.api import deps
from backend.models.user import User as UserModel

router = APIRouter()


@router.post("/analyze", response_model=DocumentAnalysisResponse)
async def analyze_document_image(
    *,
    file: UploadFile = File(...),
    current_user: UserModel = Depends(deps.get_current_user)
):
    """
    Accepts a document image, performs OCR, and then uses an AI model
    to extract structured data from the text. Requires authentication.
    """
    # 1. Read the image file contents
    contents = await file.read()


    # 2. Extract the raw text
    if file.content_type == "application/pdf" or file.filename.lower().endswith(".pdf"):
        raw_text = ocr_service.extract_text_from_pdf(contents)
    else:
        raw_text = ocr_service.extract_text_from_image(contents)

    # 3. Use the AI service to analyze the raw text and get structured data
    structured_data = ocr_service.extract_structured_data_from_text(raw_text)

    return structured_data
