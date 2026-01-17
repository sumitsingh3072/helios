from fastapi import APIRouter
from backend.app.api.api_v1.endpoints import document, expense, fraud, health, chat, login, ocr, user , document_analysis , dashboard, imagekit, webhook, insights
api_router = APIRouter()

api_router.include_router(login.router, prefix="/login", tags=["login"])
api_router.include_router(user.router, prefix="/users", tags=["users"])
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])
api_router.include_router(ocr.router, prefix="/ocr", tags=["ocr"])
api_router.include_router(health.router, prefix="/health", tags=["health"])
api_router.include_router(document.router, prefix="/documents", tags=["documents"])
api_router.include_router(fraud.router, prefix="/fraud", tags=["fraud"])
api_router.include_router(document_analysis.router,prefix="/document-analysis",tags=["document-analysis"])
api_router.include_router(expense.router, prefix="/expense", tags=["expense"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
api_router.include_router(imagekit.router, prefix="/imagekit", tags=["imagekit"])
api_router.include_router(webhook.router, prefix="/ondemand", tags=["ondemand"])
api_router.include_router(insights.router, prefix="/financial", tags=["financial"])

