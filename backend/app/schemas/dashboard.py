from pydantic import BaseModel
from decimal import Decimal
from typing import Dict

class DashboardSummary(BaseModel):
    """
    Schema for the response from the dashboard summary endpoint.
    Provides a high-level overview of the user's financial activity.
    """
    total_spending: Decimal
    spending_by_category: Dict[str, Decimal]

    class Config:
        from_attributes = True
