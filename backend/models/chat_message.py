import datetime
from sqlalchemy import Column, Integer, Text, ForeignKey, Boolean, DateTime
from sqlalchemy.orm import relationship

from backend.db.session import Base

class ChatMessage(Base):
    """
    Database model for a single chat message in a conversation.
    """
    __tablename__ = "chat_messages"

    id = Column(Integer, primary_key=True, index=True)
    message = Column(Text, nullable=False)
    is_from_user = Column(Boolean, nullable=False)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    
    # Foreign key to link this message to a user
    owner_id = Column(Integer, ForeignKey("users.id"))

    # Relationship to the User model
    owner = relationship("User", back_populates="chat_messages")
