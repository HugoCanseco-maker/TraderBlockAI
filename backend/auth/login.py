# backend/auth/login.py

import os
from supabase import create_client, Client

# Load Supabase credentials from environment
SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def login_user(email: str, password: str):
    """Sign in a user with Supabase."""
    try:
        response = supabase.auth.sign_in_with_password({"email": email, "password": password})
        if not response.user:
            raise Exception("Login failed: No user returned.")
        return response
    except Exception as e:
        raise Exception(f"Login error: {str(e)}")

def signup_user(email: str, password: str):
    """Create a new Supabase user."""
    try:
        response = supabase.auth.sign_up({"email": email, "password": password})
        if not response.user:
            raise Exception("Signup failed: No user created.")
        return response
    except Exception as e:
        raise Exception(f"Signup error: {str(e)}")

def get_user():
    return supabase.auth.get_user()

def logout():
    return supabase.auth.sign_out()
