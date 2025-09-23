from fastapi import HTTPException
from bson import ObjectId
from app.schemas import User
from app.db import users_collection

# Helper function to convert MongoDB document to a User model
def user_helper(user) -> dict:
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "hashed_password": user["hashed_password"],
        "websites": user.get("websites", []),
        "tier_type": user["tier_type"],
        "created_at": user["created_at"],
    }

def create_user(user: User):
    user_dict = user.dict(by_alias=True)
    result = users_collection.insert_one(user_dict)
    created_user = users_collection.find_one({"_id": result.inserted_id})
    return user_helper(created_user)

def get_user(user_id: str):
    user = users_collection.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user_helper(user)

def update_user(user_id: str, updated_user: User):
    result = users_collection.find_one_and_update(
        {"_id": ObjectId(user_id)},
        {"$set": updated_user.dict(by_alias=True)},
        return_document=True,
    )
    if not result:
        raise HTTPException(status_code=404, detail="User not found")
    return user_helper(result)

def delete_user(user_id: str):
    result = users_collection.delete_one({"_id": ObjectId(user_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted successfully"}