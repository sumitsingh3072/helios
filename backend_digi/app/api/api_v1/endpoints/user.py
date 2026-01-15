from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from backend.db import crud
from backend.db.session import SessionLocal
from backend.app.schemas.user import User, UserCreate
from backend.app.api import deps
from backend.models.user import User as UserModel

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=User, status_code=status.HTTP_201_CREATED)
def create_user_endpoint(
    *,
    db: Session = Depends(deps.get_db), # Use the get_db dependency from deps.py
    user_in: UserCreate
):
    user = crud.get_user_by_email(db, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The user with this email already exists in the system.",
        )
    user = crud.create_user(db, user=user_in)
    return user

@router.get("/me", response_model=User)
def read_current_user(
    current_user: UserModel = Depends(deps.get_current_user)
):
    """
    Get the details of the currently logged-in user.
    """
    return current_user