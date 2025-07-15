from fastapi import APIRouter, HTTPException
from backend.supabase.supabase import supabase

router = APIRouter()

@router.post("/log_prediction")
def log_prediction(payload: dict):
    """Store a prediction result in Supabase"""
    try:
        response = supabase.table("predictions").insert(payload).execute()
        if getattr(response, "error", None):
            raise Exception(response.error)
        return {"status": "ok"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
