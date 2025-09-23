from fastapi import APIRouter
from app.schemas import Website
import app.services.website_service as ws

router = APIRouter(prefix="/websites", tags=["websites"])

@router.post("/", response_model=Website)
def create_website(website: Website):
    return ws.create_website(website)

@router.get("/{website_id}", response_model=Website)
def get_website(website_id: str):
    return ws.get_website(website_id)

@router.put("/{website_id}", response_model=Website)
def update_website(website_id: str, updated_website: Website):
    return ws.update_website(website_id, updated_website)

@router.delete("/{website_id}")
def delete_website(website_id: str):
    return ws.delete_website(website_id)