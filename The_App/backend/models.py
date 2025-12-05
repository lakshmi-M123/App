from bson import ObjectId


def user_helper(user: dict) -> dict:
    """
    Convert MongoDB document to a JSON‑safe dict.
    """
    return {
        "id": str(user["_id"]) if isinstance(user.get("_id"), ObjectId) else str(user["_id"]),
        "username": user["username"],
        "email": user["email"],
    }
