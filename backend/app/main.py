from fastapi import FastAPI
from app.db import users_collection
from app.schemas import User
from fastapi.middleware.cors import CORSMiddleware
from app.routes import prompts as prompts_router
from app.routes import reports as reports_router

app = FastAPI()

app.include_router(prompts_router.router)
app.include_router(reports_router.router)


@app.get("/")
def root():
    return {"message": "Backend is running in Docker"}


@app.post("/users/")
def add_user(user: User):
    result = users_collection.insert_one(user.dict())
    return {"inserted_id": str(result.inserted_id)}