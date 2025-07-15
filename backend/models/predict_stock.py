import os
import sys
import joblib
import yfinance as yf
import numpy as np
from tensorflow.keras.models import load_model

# Fix import paths
ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
sys.path.append(ROOT_DIR)

from backend.sentiment_engine.score_sentiment import get_sentiment_for_stock
from config import GNEWS_API_KEY

# Folder where models and scalers are stored
SAVE_DIR = os.path.join(os.path.dirname(__file__), "saved")

def predict_single_stock(symbol, window_size=60):
    try:
        model_path = os.path.join(SAVE_DIR, f"{symbol}.h5")
        scaler_path = os.path.join(SAVE_DIR, f"{symbol}_scaler.pkl")

        if not os.path.exists(model_path) or not os.path.exists(scaler_path):
            return {"error": "Model or scaler not found", "symbol": symbol}

        model = load_model(model_path)
        scaler = joblib.load(scaler_path)

        df = yf.download(symbol, period="90d", interval="1d", progress=False, auto_adjust=True)
        prices = df["Close"].values.reshape(-1, 1)

        if len(prices) < window_size:
            return {"error": "Not enough data", "symbol": symbol}

        scaled = scaler.transform(prices)
        X_input = np.expand_dims(scaled[-window_size:], axis=0)

        pred = model.predict(X_input)[0][0]
        direction = "up" if pred > 0.5 else "down"
        confidence = round(abs(pred - 0.5) * 2, 3)

        sentiment_score = get_sentiment_for_stock(symbol)

        return {
            "symbol": symbol,
            "direction": direction,
            "confidence": confidence,
            "prediction_raw": round(float(pred), 3),
            "current_price": round(float(prices[-1][0]), 2),
            "sentiment_score": round(sentiment_score, 3)
        }

    except Exception as e:
        return {"error": str(e), "symbol": symbol}

# Local test
if __name__ == "__main__":
    symbol = sys.argv[1] if len(sys.argv) > 1 else "AAPL"
    print(predict_single_stock(symbol))
