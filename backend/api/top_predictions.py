# backend/api/top_predictions.py
from fastapi import APIRouter
from backend.models.predict_stock import predict_single_stock  # Adjust import if needed

router = APIRouter()

@router.get("/top_predictions")
def get_top_predictions():
    symbols = ["AAPL", "MSFT", "PLTR", "AMZN", "TSLA"]
    predictions = []

    for symbol in symbols:
        try:
            result = predict_single_stock(symbol)
            predictions.append(result)
        except Exception as e:
            print(f"[ERROR] Failed for {symbol}: {e}")

    sorted_preds = sorted(predictions, key=lambda x: x['confidence'], reverse=True)
    return sorted_preds[:5]
