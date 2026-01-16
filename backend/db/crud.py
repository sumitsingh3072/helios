from sqlalchemy import desc, func
from sqlalchemy.orm import Session
from backend.app.schemas.transactions import TransactionCreate
from backend.models.transaction import Transaction
from backend.models.user import User
from backend.models.document import Document
from backend.models.chat_message import ChatMessage
from backend.app.schemas.user import UserCreate
from backend.app.schemas.document import DocumentCreate
from backend.app.schemas.chat_message import ChatMessageCreateDB
from backend.app.core.security import get_password_hash
from datetime import datetime
from decimal import Decimal

# --- User CRUD Functions ---

def get_user_by_email(db: Session, email: str) -> User | None:
    """Fetches a user from the database by their email address."""
    return db.query(User).filter(User.email == email).first()


def create_user(db: Session, user: UserCreate) -> User:
    """Creates a new user in the database."""
    hashed_password = get_password_hash(user.password)
    db_user = User(
        email=user.email,
        full_name=user.full_name,
        phone_number=user.phone_number,
        hashed_password=hashed_password,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


# --- Document CRUD Functions ---

def create_user_document(db: Session, doc: DocumentCreate, owner_id: int) -> Document:
    """Creates a new document in the database and associates it with a user."""
    db_document = Document(**doc.model_dump(), owner_id=owner_id)
    db.add(db_document)
    db.commit()
    db.refresh(db_document)
    return db_document


def get_user_documents(db: Session, user_id: int, skip: int = 0, limit: int = 100) -> list[Document]:
    """Retrieves a list of documents for a specific user."""
    return db.query(Document).filter(Document.owner_id == user_id).offset(skip).limit(limit).all()


# --- Chat Message CRUD Functions ---

def create_chat_message(db: Session, msg: ChatMessageCreateDB, owner_id: int) -> ChatMessage:
    """
    Creates a new chat message in the database for a user.

    Args:
        db: The database session.
        msg: The chat message creation data.
        owner_id: The ID of the user who sent or received the message.

    Returns:
        The newly created ChatMessage object.
    """
    db_message = ChatMessage(**msg.model_dump(), owner_id=owner_id)
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message

def get_user_chat_history(db: Session, user_id: int, skip: int = 0, limit: int = 100) -> list[ChatMessage]:
    """
    Retrieves the chat history for a specific user.

    Args:
        db: The database session.
        user_id: The ID of the user whose chat history to retrieve.
        skip: The number of records to skip (for pagination).
        limit: The maximum number of records to return.

    Returns:
        A list of ChatMessage objects.
    """
    return db.query(ChatMessage).filter(ChatMessage.owner_id == user_id).order_by(ChatMessage.timestamp.asc()).offset(skip).limit(limit).all()

# --- Transaction CRUD Functions ---

# --- Transaction CRUD Functions ---

def create_user_transaction(db: Session, transaction: TransactionCreate, owner_id: int) -> Transaction:
    """
    Creates a new transaction in the database and associates it with a user.

    Args:
        db: The database session.
        transaction: The transaction creation data.
        owner_id: The ID of the user who owns this transaction.

    Returns:
        The newly created Transaction object.
    """
    db_transaction = Transaction(**transaction.model_dump(), owner_id=owner_id)
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction


def get_user_transactions(db: Session, user_id: int, skip: int = 0, limit: int = 100) -> list[Transaction]:
    """
    Retrieves a list of transactions for a specific user.

    Args:
        db: The database session.
        user_id: The ID of the user whose transactions to retrieve.
        skip: The number of records to skip (for pagination).
        limit: The maximum number of records to return.

    Returns:
        A list of Transaction objects.
    """
    return db.query(Transaction).filter(Transaction.owner_id == user_id).order_by(desc(Transaction.transaction_date)).offset(skip).limit(limit).all()


# --- Dashboard CRUD Functions ---

def get_monthly_spending_summary(db: Session, user_id: int) -> dict:
    """
    Calculates the total spending and spending per category for the current month for a given user.

    Args:
        db: The database session.
        user_id: The ID of the user to summarize.

    Returns:
        A dictionary containing the total spending and a breakdown by category.
    """
    today = datetime.utcnow()
    
    # Calculate total spending for the current month
    total_spending = db.query(func.sum(Transaction.amount)).filter(
        Transaction.owner_id == user_id,
        func.extract('year', Transaction.transaction_date) == today.year,
        func.extract('month', Transaction.transaction_date) == today.month
    ).scalar() or Decimal('0.00')

    # Calculate spending by category for the current month
    spending_by_category_query = db.query(
        Transaction.category,
        func.sum(Transaction.amount).label("total")
    ).filter(
        Transaction.owner_id == user_id,
        func.extract('year', Transaction.transaction_date) == today.year,
        func.extract('month', Transaction.transaction_date) == today.month
    ).group_by(Transaction.category).all()

    spending_by_category = {
        category: total for category, total in spending_by_category_query
    }

    return {
        "total_spending": total_spending,
        "spending_by_category": spending_by_category
    }

