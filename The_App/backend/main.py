from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from db import users_collection
from schemas import UserCreate, UserLogin, UserPublic
from models import user_helper

import uvicorn

app = FastAPI()

# ✅ CORS – allow Angular frontend
origins = [
    "http://localhost:4200",
    "http://192.168.1.45:4200",  # change this to your friend's IP if needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for DEV you can keep "*", later restrict to `origins`
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "FastAPI + MongoDB auth backend"}


@app.post("/signup", response_model=UserPublic)
def signup(user: UserCreate):
    # Check if user already exists
    if users_collection.find_one({"username": user.username}):
        raise HTTPException(status_code=400, detail="Username already taken")

    user_dict = user.dict()
    insert_result = users_collection.insert_one(
        {
            "username": user_dict["username"],
            "email": user_dict["email"],
            # ⚠️ For demo only – plain password. Use hashing (bcrypt) in real apps.
            "password": user_dict["password"],
        }
    )
    new_user = users_collection.find_one({"_id": insert_result.inserted_id})
    return user_helper(new_user)


@app.post("/login")
def login(credentials: UserLogin):
    user = users_collection.find_one({"username": credentials.username})
    if not user or user["password"] != credentials.password:
        raise HTTPException(status_code=400, detail="Invalid username or password")
    return {"message": "Login successful"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8088, reload=True)
