bson fastapi import APIRouter, HTTPException
from typing import List
from bson import ObjectId
from app.schemas import AiPrompt
from app.db import prompts_collection

router = APIRouter(prefix="/prompts", tags=["prompts"])


def _obj_id(id_str: str):
    try:
        return ObjectId(id_str)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid id format")


@router.post("/", response_model=dict)
def create_prompt(prompt: AiPrompt):
    doc = prompt.dict()
    # remove id if provided
    doc.pop("_id", None)
    result = prompts_collection.insert_one(doc)
    return {"inserted_id": str(result.inserted_id)}


@router.get("/", response_model=List[AiPrompt])
def list_prompts():
    items = []
    for doc in prompts_collection.find():
        doc["_id"] = str(doc.get("_id"))
        items.append(AiPrompt(**doc))
    return items


@router.get("/{prompt_id}", response_model=AiPrompt)
def get_prompt(prompt_id: str):
    oid = _obj_id(prompt_id)
    doc = prompts_collection.find_one({"_id": oid})
    if not doc:
        raise HTTPException(status_code=404, detail="Prompt not found")
    doc["_id"] = str(doc.get("_id"))
    return AiPrompt(**doc)


@router.put("/{prompt_id}", response_model=dict)
def update_prompt(prompt_id: str, prompt: AiPrompt):
    oid = _obj_id(prompt_id)
    update_doc = {k: v for k, v in prompt.dict().items() if k != "_id" and v is not None}
    result = prompts_collection.update_one({"_id": oid}, {"$set": update_doc})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Prompt not found")
    return {"modified_count": result.modified_count}


@router.delete("/{prompt_id}", response_model=dict)
def delete_prompt(prompt_id: str):
    oid = _obj_id(prompt_id)
    result = prompts_collection.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Prompt not found")
    return {"deleted_count": result.deleted_count}
