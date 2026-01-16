from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from backend.app.schemas.transactions import Transaction
# Import the schemas for the related models
from .document import Document
from .chat_message import ChatMessage

# --- User Schemas ---

class UserBase(BaseModel):
    """Base schema with common user attributes."""
    email: EmailStr
    full_name: str | None = None
    phone_number: str | None = Field(None, description="Indian mobile number (e.g., 9876543210)")


class UserCreate(UserBase):
    """Schema for creating a new user."""
    password: str = Field(
        ...,
        min_length=8,
        max_length=256,
        description="Password must be at least 8 characters long."
    )
    phone_number: str = Field(..., description="Phone number is required for Bank Integration")

class UserUpdate(UserBase):
    """Schema for updating user details."""
    password: Optional[str] = None
    phone_number: Optional[str] = None


class User(UserBase):
    """Schema for returning a user from the API, including their related data."""
    id: int
    is_active: bool = True
    documents: list[Document] = []
    chat_messages: list[ChatMessage] = [] # Added the list of chat messages
    transactions: list[Transaction] = [] 

    class Config:
        from_attributes = True

