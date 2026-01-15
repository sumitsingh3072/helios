from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.app.schemas.dashboard import DashboardSummary
from backend.app.api import deps
from backend.db import crud
from backend.models.user import User as UserModel

router = APIRouter()


@router.get("/summary", response_model=DashboardSummary)
def get_dashboard_summary(
    db: Session = Depends(deps.get_db),
    current_user: UserModel = Depends(deps.get_current_user),
):
    """
    Retrieve a summary of the user's financial activity for the current month.
    Requires authentication.
    """
    summary_data = crud.get_monthly_spending_summary(db, user_id=current_user.id)
    return summary_data
