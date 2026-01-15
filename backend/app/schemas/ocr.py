from pydantic import BaseModel

class OCRResponse(BaseModel):
    """
    Defines the response schema for an OCR request.
    """
    filename: str
    extracted_text: str