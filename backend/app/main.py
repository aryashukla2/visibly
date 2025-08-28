from fastapi import FastAPI
from app.db import users_collection
from app.schemas import User
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Backend is running in Docker"}

@app.post("/users/")
def add_user(user: User):
    result = users_collection.insert_one(user.dict())
    return {"inserted_id": str(result.inserted_id)}