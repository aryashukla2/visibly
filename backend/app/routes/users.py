from fastapi import APIRouter
from app.schemas import User
from bson import ObjectId
import app.services.user_service as us

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/", response_model=User)
def create_user(user: User):
    return 