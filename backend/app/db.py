from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()
DB_URL = os.getenv("MONGO_URL")
client = MongoClient(DB_URL)
db = client["visiblydb"]
users_collection = db["users"]
prompts_collection = db["ai_prompts"]