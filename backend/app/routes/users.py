from fastapi import APIRouter
from app.schemas import User
import app.services.user_service as us

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/", response_model=User)
def create_user(user: User):
    return us.create_user(user)

@router.get("/{user_id}", response_model=User)
def get_user(user_id: str):
    return us.get_user(user_id)

@router.put("/{user_id}", response_model=User)
def update_user(user_id: str, updated_user: User):
    return us.update_user(user_id, updated_user)

@router.delete("/{user_id}")
def delete_user(user_id: str):
    return us.delete_user(user_id)