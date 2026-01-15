from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.app.schemas.chat_message import ChatMessageCreateDB
from backend.app.schemas.chat import ChatMessageResponse, ChatMessageCreate
from backend.app.services.chat_service import generate_gemini_response
from backend.app.api import deps
from backend.db import crud
from backend.models.user import User as UserModel


router = APIRouter()


@router.post("/", response_model=ChatMessageResponse)
def process_chat_message(
    *,
    db: Session = Depends(deps.get_db),
    chat_in: ChatMessageCreate,
    current_user: UserModel = Depends(deps.get_current_user)
):
    """
    Processes a chat message using the new LangChain agent, which can use tools.
    Saves the user's message and the agent's final response to the database.
    """
    from backend.app.services import agent_service 
    # 1. Save the user's message to the database
    user_message_to_save = ChatMessageCreateDB(message=chat_in.message, is_from_user=True)
    crud.create_chat_message(db=db, msg=user_message_to_save, owner_id=current_user.id)

    # 2. Create a personalized and multilingual input for the agent
    # The agent's prompt already knows to respond in the user's language.
    agent_input = (
        f"My name is {current_user.full_name} and my user_id is {current_user.id}. "
        f"I would like to speak in {chat_in.language}. "
        f"Here is my request: '{chat_in.message}'"
    )

    # 3. Run the agent executor
    agent_response_text = agent_service.run_agent_conversation(user_input=agent_input, user_id=current_user.id) #type: ignore


    # 4. Save the agent's final response to the database
    ai_message_to_save = ChatMessageCreateDB(message=agent_response_text, is_from_user=False)
    crud.create_chat_message(db=db, msg=ai_message_to_save, owner_id=current_user.id)

    # 5. Return the response to the user
    return {"response": agent_response_text, "message": chat_in.message}

