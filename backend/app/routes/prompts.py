from fastapi import APIRouter
from typing import List
from app.schemas import AiPrompt
import app.services.prompt_service as ps

router = APIRouter(prefix="/prompts", tags=["prompts"])

# TODO: Implement openai for prompt generation
@router.post("/prompts/create", response_model=dict)
def create_prompt(prompt: AiPrompt):
    return ps.create_prompt(prompt)


@router.get("/prompts/list", response_model=List[AiPrompt])
def list_prompts():
    return ps.list_prompts()


@router.get("/prompts/{prompt_id}", response_model=AiPrompt)
def get_prompt(prompt_id: str):
    return ps.get_prompt(prompt_id)


@router.put("/prompts/update/{prompt_id}", response_model=dict)
def update_prompt(prompt_id: str, prompt: AiPrompt):
    return ps.update_prompt(prompt_id, prompt)


@router.delete("/prompts/delete/{prompt_id}", response_model=dict)
def delete_prompt(prompt_id: str):
    return ps.delete_prompt(prompt_id)
