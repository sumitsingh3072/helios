import datetime
from pydantic import BaseModel
from decimal import Decimal

class TransactionBase(BaseModel):
    """Base schema with common transaction attributes."""
    description: str | None = None
    amount: Decimal
    category: str
    vendor_name: str | None = None


class TransactionCreate(TransactionBase):
    """Schema for creating a new transaction in the database."""
    pass


class Transaction(TransactionBase):
    """Schema for returning a transaction from the API."""
    id: int
    owner_id: int
    transaction_date: datetime.datetime

    class Config:
        from_attributes = True
