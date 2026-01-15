from fastapi import APIRouter, File, UploadFile, Depends, HTTPException, status
from sqlalchemy.orm import Session

from backend.app.schemas.transactions import Transaction
from backend.app.services import ocr_service, expense_analysis_service
from backend.app.api import deps
from backend.db import crud
from backend.models.user import User as UserModel

router = APIRouter()


@router.post("/process-bill", response_model=Transaction)
async def process_bill_and_create_transaction(
    *,
    db: Session = Depends(deps.get_db),
    file: UploadFile = File(...),
    current_user: UserModel = Depends(deps.get_current_user)
):
    """
    Orchestrates the entire bill processing flow:
    1. Uploads an image of a bill.
    2. Performs OCR to extract raw text.
    3. Extracts structured data (e.g., vendor, amount).
    4. Intelligently categorizes the expense.
    5. Saves the result as a transaction in the database.
    """
    # Step 1 & 2: OCR and Structured Data Extraction
    contents = await file.read()
    raw_text = ocr_service.extract_text_from_image(contents)
    if "Error:" in raw_text:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Could not read text from the uploaded image."
        )

    structured_data = ocr_service.extract_structured_data_from_text(raw_text)
    
    # Step 3: Categorize Expense and Prepare Transaction
    transaction_to_create = expense_analysis_service.categorize_expense_and_create_transaction(
        extracted_data=structured_data.get("extracted_data", {})
    )

    if not transaction_to_create:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Could not analyze the expense from the document, likely missing a vendor name or total amount."
        )

    # Step 4: Save the Transaction to the Database
    created_transaction = crud.create_user_transaction(
        db=db, transaction=transaction_to_create, owner_id=current_user.id
    )

    return created_transaction
