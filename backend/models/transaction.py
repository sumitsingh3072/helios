import datetime
from sqlalchemy import Column, Integer, String, Numeric, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from backend.db.session import Base

class Transaction(Base):
    """
    Database model for a single financial transaction (e.g., an expense from a bill).
    """
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String, index=True)
    amount = Column(Numeric(10, 2), nullable=False) # Suitable for currency
    category = Column(String, index=True)
    vendor_name = Column(String, index=True)
    transaction_date = Column(DateTime, default=datetime.datetime.utcnow)

    # Foreign key to link this transaction to a user
    owner_id = Column(Integer, ForeignKey("users.id"))

    # Relationship to the User model
    owner = relationship("User", back_populates="transactions")
