import pytesseract
from PIL import Image
import io
import json
import logging
from backend.app.services.chat_service import generate_gemini_response

def extract_text_from_image(image_bytes: bytes) -> str:
    """
    Extracts plain text from an image using Tesseract OCR.
    """
    try:
        image = Image.open(io.BytesIO(image_bytes))
        text = pytesseract.image_to_string(image)
        return text
    except Exception as e:
        logging.error(f"Error during OCR processing: {e}")
        return "Error: Could not extract text from the image."


def extract_structured_data_from_text(text_to_analyze: str) -> dict:
    """
    Analyzes a block of text (from OCR) and extracts structured data (e.g.,
    KYC details, bill amounts) using a specialized prompt with the Gemini AI model.

    Args:
        text_to_analyze: The raw text extracted from a document.

    Returns:
        A dictionary with the extracted structured data.
    """
    # This prompt instructs the AI to act as a data extraction expert and
    # identify the type of document before extracting relevant fields into a JSON.
    prompt = f"""
    You are a data extraction expert for DigiSaathi, an app that helps users in India.
    Your task is to analyze the following text, which was extracted from a user's document via OCR.
    First, identify the type of document (e.g., 'Aadhaar Card', 'PAN Card', 'Electricity Bill', 'Receipt', 'Other').
    Then, extract the key information from the text into a structured JSON object.

    Analyze the following text:
    ---
    "{text_to_analyze}"
    ---

    Based on your analysis, respond with a JSON object ONLY. The JSON object must have two main keys:
    1. "document_type": a string representing the type of document you identified.
    2. "extracted_data": an object containing the key-value pairs of the data you extracted.
       - For an Aadhaar Card, extract "name", "dob", "gender", and "aadhaar_number".
       - For a PAN Card, extract "name", "father_name", "dob", and "pan_number".
       - For a bill or receipt, extract "vendor_name", "total_amount", and "due_date".
       - If you cannot find a value for a field, set it to null.
       - If the document type is 'Other', make a best guess at relevant key-value pairs.

    Do not add any other text or explanations outside of the JSON object.
    """
    try:
        ai_response_str = generate_gemini_response(prompt)
        
        # Clean the response to ensure it's a valid JSON string
        if ai_response_str.strip().startswith("```json"):
            ai_response_str = ai_response_str.strip()[7:-3]

        analysis_result = json.loads(ai_response_str)
        
        # Basic validation
        if "document_type" in analysis_result and "extracted_data" in analysis_result:
            return analysis_result
        else:
            raise ValueError("AI response is missing required keys.")

    except (json.JSONDecodeError, ValueError) as e:
        logging.error(f"Error processing structured data extraction: {e}")
        # Provide a safe, default response
        return {
            "document_type": "Other",
            "extracted_data": {"error": "Could not analyze the document's text."}
        }
