from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.agents import tool, AgentExecutor, create_react_agent
from langchain_core.prompts import PromptTemplate
from backend.app.core.config import settings
from backend.app.services import fraud_detection_service, ocr_service, expense_analysis_service
from backend.db import crud, session
import json

# --- 1. Initialize the LLM ---
llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", google_api_key=settings.GEMINI_API_KEY)

# --- 2. Define the Tools ---

@tool
def analyze_text_for_fraud(text_to_analyze: str | dict) -> str:
    """
    Analyzes a given text message for signs of financial fraud or scams. Use this tool
    when a user shares a suspicious message or asks if something is a scam.
    """
    if isinstance(text_to_analyze, dict):
        text_to_analyze = text_to_analyze.get("text_to_analyze", "")
    result = fraud_detection_service.analyze_text_for_fraud(text_to_analyze) #type: ignore
    return json.dumps(result)

@tool
def extract_structured_data_from_text(text_to_analyze: str | dict) -> str:
    """
    Analyzes a block of raw text from a document (like a bill or ID card) and extracts
    structured information like vendor name, total amount, name, or date of birth.
    Use this tool when you need to understand the contents of a document.
    """
    if isinstance(text_to_analyze, dict):
        text_to_analyze = text_to_analyze.get("text_to_analyze", "")
    result = ocr_service.extract_structured_data_from_text(text_to_analyze) #type: ignore
    return json.dumps(result)

@tool
def save_expense_transaction(user_id: int, vendor_name: str, total_amount: str) -> str:
    """
    Saves an expense to the user's transaction history. Use this tool after you have
    extracted the vendor_name and total_amount from a user's bill or receipt.
    You must provide the user_id, vendor_name, and total_amount.
    """
    db = session.SessionLocal()
    try:
        extracted_data = {"vendor_name": vendor_name, "total_amount": total_amount}
        transaction_to_create = expense_analysis_service.categorize_expense_and_create_transaction(
            extracted_data=extracted_data
        )
        if transaction_to_create:
            crud.create_user_transaction(db=db, transaction=transaction_to_create, owner_id=user_id)
            return "Successfully saved the transaction to the user's history."
        else:
            return "Failed to save the transaction due to missing information."
    finally:
        db.close()

# --- 3. Create the list of tools for the agent ---
tools = [analyze_text_for_fraud, extract_structured_data_from_text, save_expense_transaction]

# --- 4. Create the Agent Prompt Template ---
# (Prompt template remains the same)
prompt_template = """
You are DigiSaathi, a helpful and friendly AI financial companion for users in India.

You have access to the following tools:

{tools}

Use the following format for your thought process:

Question: the input question you must answer
Thought: you should always think about what to do.
Action: the action to take, should be one of [{tool_names}]
Action Input: the input to the action
Observation: the result of the action
... (this Thought/Action/Action Input/Observation can repeat N times)
Thought: I now know the final answer
Final Answer: the final answer to the original input question. This should be a helpful, conversational response in the user's requested language.

Begin!

Question: {input}
{agent_scratchpad}
"""
prompt = PromptTemplate.from_template(prompt_template)


# --- 5. Create the Agent ---
agent = create_react_agent(llm, tools, prompt)
agent_executor = AgentExecutor(
    agent=agent,
    tools=tools,
    verbose=True,
    handle_parsing_errors=True
)

# --- 6. Define the function to run the agent ---
def run_agent_conversation(user_input: str, user_id: int) -> str:
    """
    Runs the conversational agent with the user's input and user_id.
    """
    # We pass the user_id into the agent's context so tools can use it.
    response = agent_executor.invoke({"input": user_input, "user_id": user_id})
    return response.get("output", "I'm sorry, I had trouble processing that request.")

