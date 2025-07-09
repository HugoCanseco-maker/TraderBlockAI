# backend/services/trade_executor.py

from backend.services.alpaca_client import get_alpaca_client
from backend.keys.user_keys import get_alpaca_keys_for_user

def execute_trade_for_user(user_id, symbol, qty, side):
    key, secret = get_alpaca_keys_for_user(user_id)
    client = get_alpaca_client(key, secret)
    
    try:
        order = client.submit_order(
            symbol=symbol,
            qty=qty,
            side=side,
            type="market",
            time_in_force="gtc"
        )
        return {"status": "success", "order": order._raw}
    except Exception as e:
        return {"status": "error", "message": str(e)}
