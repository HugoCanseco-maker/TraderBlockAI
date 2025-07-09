# backend/auth/login.py
import os
from supabase import create_client, Client

SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
def login(email: str, password: str):
    return supabase.auth.sign_in_with_password({"email": email, "password": password})

def signup(email: str, password: str):
    return supabase.auth.sign_up({"email": email, "password": password})

def get_user():
    return supabase.auth.get_user()

def logout():
    return supabase.auth.sign_out()
