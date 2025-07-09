# backend/supabase/supabase.py

from supabase import create_client, Client
import os
from dotenv import load_dotenv

load_dotenv()  # Load from .env

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Missing SUPABASE_URL or SUPABASE_SERVICE_KEY in environment.")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
