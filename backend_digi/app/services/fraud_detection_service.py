import json
import logging
from backend.app.services.chat_service import generate_gemini_response

def analyze_text_for_fraud(text_to_analyze: str) -> dict:
    """
    Analyzes a piece of text for signs of financial fraud using a specialized
    prompt with the Gemini AI model.

    Args:
        text_to_analyze: The text from an SMS, WhatsApp message, etc.

    Returns:
        A dictionary with the analysis result, e.g.,
        {"is_scam": True, "reason": "This message creates false urgency..."}
    """
    # This detailed prompt is engineered to make the AI act as a fraud detection expert
    # for the Indian context and to return a structured JSON response.
    prompt = f"""
    You are a fraud detection expert for DigiSaathi, an app that helps users in India.
    Your task is to analyze the following text message and determine if it is a scam.
    Consider common scam tactics in India: fake KYC updates, lottery wins, fake job offers,
    requests for OTPs, unofficial payment links, threats of account suspension, etc.

    Analyze the following text:
    ---
    "{text_to_analyze}"
    ---

    Based on your analysis, respond with a JSON object ONLY. The JSON object must have two keys:
    1. "is_scam": a boolean value (true if it is a scam, false otherwise).
    2. "reason": a string, written in simple language, explaining exactly why the message is or is not a scam.
       If it is a scam, point out the specific red flags (e.g., "It asks for an OTP which you should never share.").
       If it is not a scam, explain why it looks legitimate (e.g., "It comes from an official sender ID and provides information without asking for anything.").
    
    Do not add any other text or explanations outside of the JSON object.
    """

    try:
        # Get the raw response from the AI
        ai_response_str = generate_gemini_response(prompt)
        
        # Clean the response to ensure it's a valid JSON string
        # LLMs sometimes add markdown formatting like ```json ... ```
        if ai_response_str.strip().startswith("```json"):
            ai_response_str = ai_response_str.strip()[7:-3]

        # Parse the JSON string into a Python dictionary
        analysis_result = json.loads(ai_response_str)
        
        # Validate the structure of the response
        if "is_scam" in analysis_result and "reason" in analysis_result:
            return analysis_result
        else:
            raise ValueError("AI response is missing required keys.")

    except (json.JSONDecodeError, ValueError) as e:
        logging.error(f"Error processing fraud detection response: {e}")
        # Provide a safe, default response in case of any errors
        return {
            "is_scam": False,
            "reason": "Could not analyze the message. Please be cautious."
        }
