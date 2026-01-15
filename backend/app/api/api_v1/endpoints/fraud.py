from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.app.schemas.fraud import FraudAnalysisRequest, FraudAnalysisResponse
from backend.app.services import fraud_detection_service
from backend.app.api import deps
from backend.models.user import User as UserModel

router = APIRouter()


@router.post("/analyze", response_model=FraudAnalysisResponse)
def analyze_text(
    *,
    db: Session = Depends(deps.get_db),
    request_body: FraudAnalysisRequest,
    current_user: UserModel = Depends(deps.get_current_user)
):
    """
    Analyzes a piece of text for potential financial fraud.
    Requires authentication.
    """
    # We have the current_user object, which can be used for logging or context.
    # For now, we pass the text directly to our specialized service.
    analysis_result = fraud_detection_service.analyze_text_for_fraud(
        text_to_analyze=request_body.text
    )
    return analysis_result
