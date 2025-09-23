from fastapi import HTTPException
from bson import ObjectId
from app.schemas import Website
from app.db import websites_collection

# Helper function to convert MongoDB document to a Website model
def website_helper(website) -> dict:
    return {
        "id": str(website["_id"]),
        "user_id": website["user_id"],
        "url": website["url"],
        "description": website.get("description"),
        "ai_prompts": website.get("ai_prompts", []),
        "latest_report_id": website.get("latest_report_id"),
        "reports": website.get("reports", []),
        "created_at": website["created_at"],
    }

def create_website(website: Website):
    website_dict = website.dict(by_alias=True)
    result = websites_collection.insert_one(website_dict)
    created_website = websites_collection.find_one({"_id": result.inserted_id})
    return website_helper(created_website)

def get_website(website_id: str):
    website = websites_collection.find_one({"_id": ObjectId(website_id)})
    if not website:
        raise HTTPException(status_code=404, detail="Website not found")
    return website_helper(website)

def update_website(website_id: str, updated_website: Website):
    result = websites_collection.find_one_and_update(
        {"_id": ObjectId(website_id)},
        {"$set": updated_website.dict(by_alias=True)},
        return_document=True,
    )
    if not result:
        raise HTTPException(status_code=404, detail="Website not found")
    return website_helper(result)

def delete_website(website_id: str):
    result = websites_collection.delete_one({"_id": ObjectId(website_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Website not found")
    return {"message": "Website deleted successfully"}