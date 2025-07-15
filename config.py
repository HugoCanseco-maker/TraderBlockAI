# config.py

import os
from dotenv import load_dotenv

load_dotenv()

FINNHUB_API_KEY = os.getenv("FINNHUB_API_KEY")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY") or os.getenv("SUPABASE_KEY")
DEFAULT_ALPACA_KEY = os.getenv("DEFAULT_ALPACA_KEY")
DEFAULT_ALPACA_SECRET = os.getenv("DEFAULT_ALPACA_SECRET")
GNEWS_API_KEY = os.getenv("GNEWS_API_KEY")

# Runtime check for missing vars
required = {
    "FINNHUB_API_KEY": FINNHUB_API_KEY,
    "SUPABASE_URL": SUPABASE_URL,
    "SUPABASE_KEY": SUPABASE_KEY,
    "DEFAULT_ALPACA_KEY": DEFAULT_ALPACA_KEY,
    "DEFAULT_ALPACA_SECRET": DEFAULT_ALPACA_SECRET,
    "GNEWS_API_KEY": GNEWS_API_KEY,
}

missing = [k for k, v in required.items() if not v]
if missing:
    raise RuntimeError(f"Missing required environment variables: {', '.join(missing)}")
