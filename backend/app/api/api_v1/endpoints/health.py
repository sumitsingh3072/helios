from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def check_health():
    """
    Health check endpoint.
    Returns a success message if the API is running.
    """
    return {"status": "ok", "message": "API is healthy"}
