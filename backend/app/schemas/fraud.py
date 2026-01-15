from pydantic import BaseModel, Field

class FraudAnalysisRequest(BaseModel):
    """
    Schema for the incoming text that needs to be analyzed for fraud.
    """
    text: str = Field(..., min_length=10, description="The text message to be analyzed.")


class FraudAnalysisResponse(BaseModel):
    """
    Schema for the structured response from the fraud analysis service.
    """
    is_scam: bool
    reason: str
