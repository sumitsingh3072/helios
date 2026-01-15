import json
import logging
from decimal import Decimal
from backend.app.services.chat_service import generate_gemini_response
from backend.app.schemas.transactions import TransactionCreate

def categorize_expense_and_create_transaction(
    extracted_data: dict,
) -> TransactionCreate | None:
    """
    Analyzes extracted bill data, assigns a spending category using an AI model,
    and prepares a transaction object for database insertion.

    Args:
        extracted_data: A dictionary containing data like 'vendor_name' and 'total_amount'.

    Returns:
        A TransactionCreate schema object ready to be saved, or None if data is invalid.
    """
    vendor = extracted_data.get("vendor_name")
    amount_value = extracted_data.get("total_amount") # Renamed for clarity

    if not vendor or not amount_value:
        logging.warning("Missing vendor name or total amount for expense analysis.")
        return None

    # This prompt asks the AI to act as a financial analyst and categorize the expense.
    prompt = f"""
    You are a financial analyst for DigiSaathi, an app for users in India.
    Your task is to categorize an expense based on the vendor's name.
    Common categories are: 'Utilities', 'Groceries', 'Shopping', 'Food & Dining',
    'Travel', 'Health', 'Entertainment', 'Other'.

    Analyze the following vendor name:
    ---
    "{vendor}"
    ---

    Based on your analysis, respond with a JSON object ONLY. The JSON object must have one key:
    1. "category": a string representing the most likely expense category.

    Do not add any other text or explanations outside of the JSON object.
    """

    try:
        # Get and parse the AI's category suggestion
        ai_response_str = generate_gemini_response(prompt)
        if ai_response_str.strip().startswith("```json"):
            ai_response_str = ai_response_str.strip()[7:-3]
        
        category_result = json.loads(ai_response_str)
        category = category_result.get("category", "Other")
        amount_str = str(amount_value)
        cleaned_amount = amount_str.replace(",", "")

        transaction_data = TransactionCreate(
            description=f"Payment to {vendor}",
            amount=Decimal(cleaned_amount),
            category=category,
            vendor_name=vendor
        )
        return transaction_data

    except (json.JSONDecodeError, ValueError) as e:
        logging.error(f"Error processing expense categorization response: {e}")
        return None

