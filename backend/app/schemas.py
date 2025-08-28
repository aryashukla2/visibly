from pydantic import BaseModel, Field
from datetime import datetime
from typing import List, Optional, Dict

class User(BaseModel):
    id: Optional[str] = Field(alias="_id")   # Mongo ObjectId as str
    name: str
    email: str
    websites: Optional[List[str]] = []
    tier_type: str
    created_at: datetime = Field(datetime.now())

class Website(BaseModel):
    id: Optional[str] = Field(alias="_id")
    user_id: str
    url: str
    description: Optional[str] = None
    ai_prompts: Optional[List[str]] = []
    latest_report_id: Optional[str] = None # allows for faster queries
    reports: Optional[List[str]] = []
    created_at: datetime = Field(datetime.now())

class Report(BaseModel):
    id: Optional[str] = Field(alias="_id")
    website_id: str
    visibility_score: float
    competitor_analysis: List[float]
    insights: List[str]
    questions_answers: Dict[str, str] # prompt and answer pairs
    created_at: datetime = Field(datetime.now())
    updated_at: datetime = Field(datetime.now())

