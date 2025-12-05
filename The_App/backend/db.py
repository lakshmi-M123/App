# backend/db.py
from pymongo import MongoClient
import os
import sys
import time
from pymongo.errors import ServerSelectionTimeoutError

MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "authdb")

# small retry to give Docker a moment (useful in compose)
client = None
for i in range(3):
    try:
        client = MongoClient(MONGO_URL, serverSelectionTimeoutMS=5000)
        client.admin.command("ping")   # quick check
        break
    except ServerSelectionTimeoutError as e:
        print(f"Mongo connect attempt {i+1} failed: {e}", file=sys.stderr)
        time.sleep(1)

if client is None:
    raise RuntimeError(f"Could not connect to MongoDB at {MONGO_URL}")

db = client[DB_NAME]
users_collection = db["users"]
