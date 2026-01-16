import datetime
from sqlalchemy import Column, Integer, String, Numeric, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from pgvector.sqlalchemy import Vector  

from backend.db.session import Base

class Transaction(Base):
    """
    Database model for a single financial transaction.
    Now includes AI Embeddings for Semantic Search (RAG).
    """
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String, index=True)
    amount = Column(Numeric(10, 2), nullable=False)
    category = Column(String, index=True)
    vendor_name = Column(String, index=True)
    transaction_date = Column(DateTime, default=datetime.datetime.utcnow)
    embedding = Column(Vector(768)) 
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="transactions")