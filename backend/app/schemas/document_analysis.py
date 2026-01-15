from pydantic import BaseModel
from typing import Dict, Any

class DocumentAnalysisResponse(BaseModel):
    """
    Schema for the structured response after analyzing a document's text.
    """
    document_type: str
    extracted_data: Dict[str, Any]
