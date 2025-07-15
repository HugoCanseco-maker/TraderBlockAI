# backend/services/alpaca_client.py
from alpaca_trade_api.rest import REST
import config

def get_alpaca_client(api_key=None, api_secret=None):
    api_key = api_key or config.DEFAULT_ALPACA_KEY
    api_secret = api_secret or config.DEFAULT_ALPACA_SECRET
    base_url = "https://paper-api.alpaca.markets"
    return REST(api_key, api_secret, base_url)

def validate_account(client: REST):
    try:
        return client.get_account()
    except Exception as e:
        return {"error": str(e)}
