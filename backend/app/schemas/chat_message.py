import datetime
from pydantic import BaseModel

class ChatMessageBase(BaseModel):
    """Base schema with common chat message attributes."""
    message: str


class ChatMessageCreateDB(ChatMessageBase):
    """Schema for creating a new chat message in the DB."""
    is_from_user: bool


class ChatMessage(ChatMessageBase):
    """Schema for returning a chat message from the API."""
    id: int
    owner_id: int
    is_from_user: bool
    timestamp: datetime.datetime

    class Config:
        from_attributes = True
