# models/batch_trainer.py

import os
import numpy as np
import yfinance as yf
import joblib

from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Input
from tensorflow.keras.callbacks import EarlyStopping

# Save to simplified folder with clean names
SAVE_DIR = os.path.join(os.path.dirname(__file__), "saved")
os.makedirs(SAVE_DIR, exist_ok=True)

TOP_30 = [
    "AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "META", "TSLA", "NFLX",
    "AMD", "INTC", "AVGO", "QCOM", "TXN", "CRM", "ADBE", "ORCL", "CSCO",
    "PYPL", "SPY", "QQQ", "DIA", "VTI", "IWM", "KO", "PEP", "NKE", "MCD",
    "DIS", "UBER", "SHOP", "PLTR"
]

def load_binary_data(symbol, window_size=60):
    df = yf.download(symbol, period="2y", interval="1d", progress=False, auto_adjust=True)
    if "Close" not in df or df.empty:
        raise ValueError(f"No data for {symbol}")

    prices = df["Close"].values.reshape(-1, 1)
    scaler = MinMaxScaler()
    scaled = scaler.fit_transform(prices)

    X, y = [], []
    for i in range(window_size, len(scaled) - 1):
        X.append(scaled[i-window_size:i])
        y.append(1 if scaled[i+1] > scaled[i] else 0)

    return np.array(X), np.array(y), scaler

def build_binary_model(input_shape):
    model = Sequential([
        Input(shape=input_shape),
        LSTM(64, return_sequences=True),
        LSTM(64),
        Dense(1, activation='sigmoid')
    ])
    model.compile(optimizer="adam", loss="binary_crossentropy", metrics=["accuracy"])
    return model

def train_and_save_binary(symbol, window_size=60):
    print(f"[INFO] Training binary model for {symbol}")
    try:
        X, y, scaler = load_binary_data(symbol, window_size)
        model = build_binary_model((X.shape[1], X.shape[2]))

        early_stopping = EarlyStopping(patience=3, monitor="val_loss", restore_best_weights=True)
        model.fit(X, y, epochs=50, batch_size=32, validation_split=0.2,
                  callbacks=[early_stopping], verbose=0)

        model.save(os.path.join(SAVE_DIR, f"{symbol}.h5"))
        joblib.dump(scaler, os.path.join(SAVE_DIR, f"{symbol}_scaler.pkl"))
        print(f"[DONE] Saved model and scaler for {symbol}")
    except Exception as e:
        print(f"[ERROR] {symbol}: {e}")

if __name__ == "__main__":
    for symbol in TOP_30:
        train_and_save_binary(symbol)
