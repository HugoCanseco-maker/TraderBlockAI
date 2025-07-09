from fastapi import APIRouter
from backend.supabase.supabase import supabase

router = APIRouter()

@router.get("/trades")
def get_trades():
    try:
        response = supabase.from_("trades").select("*").order("timestamp", desc=True).limit(10).execute()
        trades = response.data or []
        return trades
    except Exception as e:
        return {"error": str(e)}
