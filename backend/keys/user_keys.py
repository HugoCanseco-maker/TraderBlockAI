# ✅ backend/keys/user_keys.py
import os
import supabase
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase_client = supabase.create_client(SUPABASE_URL, SUPABASE_KEY)

USER_KEYS_TABLE = "user_alpaca_keys"

def store_user_keys(user_id: str, alpaca_key: str, alpaca_secret: str):
    data = {
        "user_id": user_id,
        "alpaca_key": alpaca_key,
        "alpaca_secret": alpaca_secret
    }
    return supabase_client.table(USER_KEYS_TABLE).upsert(data).execute()

def get_user_keys(user_id: str):
    result = supabase_client.table(USER_KEYS_TABLE).select("alpaca_key, alpaca_secret").eq("user_id", user_id).execute()
    if result.data:
        return result.data[0]["alpaca_key"], result.data[0]["alpaca_secret"]
    return None, None
