import os
import numpy as np
import yfinance as yf
import joblib
from sklearn.preprocessing import MinMaxScaler
from keras.models import load_model

# Constants
SAVE_DIR = os.path.join(os.path.dirname(__file__), "saved")
WINDOW_SIZE = 60

def load_latest_data(symbol):
    df = yf.download(symbol, period="90d", interval="1d", progress=False)
    if "Close" not in df or df.empty:
        raise ValueError(f"[ERROR] No recent price data for {symbol}")
    
    prices = df["Close"].values.reshape(-1, 1)
    return prices

def prepare_input(prices, scaler):
    if len(prices) < WINDOW_SIZE:
        raise ValueError(f"[ERROR] Not enough data to generate window for {len(prices)} points")

    scaled = scaler.transform(prices)
    last_sequence = scaled[-WINDOW_SIZE:]
    return np.expand_dims(last_sequence, axis=0)

def predict_price(symbol):
    model_path = os.path.join(SAVE_DIR, f"{symbol}.keras")
    scaler_path = os.path.join(SAVE_DIR, f"{symbol}_scaler.pkl")

    if not os.path.exists(model_path) or not os.path.exists(scaler_path):
        raise FileNotFoundError(f"[ERROR] Missing model or scaler for {symbol}")

    # Load model and scaler
    model = load_model(model_path)
    scaler = joblib.load(scaler_path)

    # Get and prepare data
    prices = load_latest_data(symbol)
    input_data = prepare_input(prices, scaler)

    # Predict
    scaled_prediction = model.predict(input_data)[0][0]
    predicted_price = scaler.inverse_transform([[scaled_prediction]])[0][0]

    last_price = prices[-1][0]
    direction = "up" if predicted_price > last_price else "down"
    confidence = round(abs(predicted_price - last_price) / last_price, 4)

    return {
        "symbol": symbol,
        "predicted_price": round(predicted_price, 2),
        "last_price": round(last_price, 2),
        "direction": direction,
        "confidence": confidence
    }

# Example usage
if __name__ == "__main__":
    example = predict_price("AAPL")
    print(example)
