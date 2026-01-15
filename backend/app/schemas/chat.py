from pydantic import BaseModel, Field
from typing import Literal

SupportedLanguage = Literal["English", "Hindi", "Bhojpuri", "Bengali" , "Tamil", "Telugu", "Marathi", "Gujarati", "Kannada", "Malayalam", "Odia", "Punjabi", "Assamese"]

class ChatMessageCreate(BaseModel):
    """
    Pydantic model for creating a new chat message.
    Ensures that any incoming request has a 'message' field of type string.
    """
    message: str
    language: SupportedLanguage = Field(
        "English",
        description="The language in which the user wants the AI to respond."
    )

class ChatMessageResponse(BaseModel):
    """
    Pydantic model for the response of a chat message.
    Defines the structure of the JSON response sent back to the client.
    """
    message: str
    response: str