from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from backend.app.schemas.document import Document
from backend.app.api import deps
from backend.db import crud
from backend.models.user import User as UserModel

router = APIRouter()


@router.get("/", response_model=List[Document])
def read_user_documents(
    db: Session = Depends(deps.get_db),
    current_user: UserModel = Depends(deps.get_current_user),
    skip: int = 0,
    limit: int = 100,
):
    """
    Retrieve all documents for the currently logged-in user.
    """
    documents = crud.get_user_documents(db, user_id=current_user.id, skip=skip, limit=limit)
    return documents