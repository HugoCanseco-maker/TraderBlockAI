# backend/services/trade_executor.py

from backend.services.alpaca_client import get_alpaca_client
from backend.keys.user_keys import get_user_keys

def execute_trade(user_id: str, symbol: str, qty: int, side: str = "buy"):
    """
    Submit a trade for the given user using Alpaca paper trading.
    """
    key, secret = get_user_keys(user_id)
    client = get_alpaca_client(key, secret)

    try:
        order = client.submit_order(
            symbol=symbol,
            qty=qty,
            side=side,
            type="market",
            time_in_force="gtc"
        )
        return {
            "status": "success",
            "order": order._raw  # careful: avoid exposing too much in prod
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }
