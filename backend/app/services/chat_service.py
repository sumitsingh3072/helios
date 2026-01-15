# backend/services/chat_service.py

from xml.parsers.expat import model
from google import genai
from backend.app.core.config import settings
import logging

# Configure the Gemini API with the key from settings
try:
    client = genai.Client(api_key=settings.GEMINI_API_KEY)
except Exception as e:
    logging.error(f"Error configuring Gemini API: {e}")

def generate_gemini_response(user_message: str) -> str:
    """
    Generates a response from the Gemini API based on the user's message.

    Args:
        user_message: The message from the user.

    Returns:
        The text response from the Gemini model.
    """
    try:
        # For text-only input, use the gemini-pro model
        # Generate the content
        response = client.models.generate_content(
            model="gemini-2.5-flash", contents=user_message
        )
        return response.text or "No response received from the Gemini model."
    except Exception as e:
        logging.error(f"An error occurred while generating Gemini response: {e}")
        return "Sorry, I'm having trouble connecting to the AI service right now."
