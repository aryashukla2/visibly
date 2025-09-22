from fastapi import HTTPException
from bson import ObjectId
from app.schemas import AiPrompt
from app.db import prompts_collection

def _obj_id(id_str: str):
    try:
        return ObjectId(id_str)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid id format")

def create_prompt(prompt: AiPrompt):
    doc = prompt.model_dump(by_alias=True, exclude_none=True)
    doc.pop("_id", None) # check if _id exists in db
    result = prompts_collection.insert_one(doc)
    return {"inserted_id": str(result.inserted_id)}

def list_prompts():
    items = []
    for doc in prompts_collection.find():
        doc["_id"] = str(doc.get("_id"))
        items.append(AiPrompt(**doc))
    return items

def get_prompt(prompt_id: str):
    oid = _obj_id(prompt_id)
    doc = prompts_collection.find_one({"_id": oid})
    if not doc:
        raise HTTPException(status_code=404, detail="Prompt not found")
    doc["_id"] = str(doc.get("_id"))
    return AiPrompt(**doc)

def update_prompt(prompt_id: str, prompt: AiPrompt):
    oid = _obj_id(prompt_id)
    update_doc = {k: v for k, v in prompt.model_dump(by_alias=True, exclude_none=True).items() if k != "_id" and v is not None}
    result = prompts_collection.update_one({"_id": oid}, {"$set": update_doc})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Prompt not found")
    return {"modified_count": result.modified_count}

def delete_prompt(prompt_id: str):
    oid = _obj_id(prompt_id)
    result = prompts_collection.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Prompt not found")
    return {"deleted_count": result.deleted_count}