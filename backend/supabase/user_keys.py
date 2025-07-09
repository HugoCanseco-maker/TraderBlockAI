# backend/keys/user_keys.py

import os
from dotenv import load_dotenv
from backend.keys.user_keys import FINNHUB_API_KEY, SUPABASE_URL, SUPABASE_KEY

# Load environment variables from .env file
load_dotenv()

# API Keys & Secrets
FINNHUB_API_KEY = os.getenv("FINNHUB_API_KEY")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
DEFAULT_ALPACA_KEY = os.getenv("DEFAULT_ALPACA_KEY")
DEFAULT_ALPACA_SECRET = os.getenv("DEFAULT_ALPACA_SECRET")
GNEWS_API_KEY = os.getenv("GNEWS_API_KEY")

# Safety check (optional)
missing_keys = [
    name for name, value in {
        "FINNHUB_API_KEY": FINNHUB_API_KEY,
        "SUPABASE_URL": SUPABASE_URL,
        "SUPABASE_KEY": SUPABASE_KEY,
        "DEFAULT_ALPACA_KEY": DEFAULT_ALPACA_KEY,
        "DEFAULT_ALPACA_SECRET": DEFAULT_ALPACA_SECRET,
        "GNEWS_API_KEY": GNEWS_API_KEY,
    }.items() if value is None
]

if missing_keys:
    raise EnvironmentError(f"Missing required environment variables: {', '.join(missing_keys)}")
