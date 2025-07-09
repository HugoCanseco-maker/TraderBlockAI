import os
import numpy as np
import pandas as pd
import yfinance as yf
from sklearn.preprocessing import MinMaxScaler

import tensorflow as tf
Sequential = tf.keras.models.Sequential
LSTM = tf.keras.layers.LSTM
Dense = tf.keras.layers.Dense
EarlyStopping = tf.keras.callbacks.EarlyStopping

def load_data(symbol='AAPL', window_size=60):
    df = yf.download(symbol, period='2y', progress=False)
    
    if 'Close' not in df or df.empty:
        raise ValueError(f"No data found for symbol: {symbol}")
    
    prices = df['Close'].values.reshape(-1, 1)

    # Normalize using MinMaxScaler
    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_prices = scaler.fit_transform(prices)

    X, y = [], []
    for i in range(len(scaled_prices) - window_size):
        X.append(scaled_prices[i:i+window_size])
        y.append(scaled_prices[i+window_size])
    
    return np.array(X), np.array(y), scaler

def build_model(input_shape):
    model = Sequential()
    model.add(LSTM(64, return_sequences=True, input_shape=input_shape))
    model.add(LSTM(64))
    model.add(Dense(1))
    model.compile(optimizer='adam', loss='mse')
    return model

def train_and_save(symbol='AAPL', window_size=60, save_path=None):
    print(f"[START] Training model for {symbol}")
    X, y, scaler = load_data(symbol, window_size=window_size)
    
    model = build_model((X.shape[1], X.shape[2]))
    early_stop = EarlyStopping(monitor='loss', patience=3)

    model.fit(X, y, epochs=10, batch_size=32, callbacks=[early_stop])

    # Create model directory if needed
    if save_path is None:
        os.makedirs('models', exist_ok=True)
        save_path = f'models/model_{symbol}.h5'
    
    model.save(save_path)
    print(f"[SAVED] Model saved to {save_path}")

if __name__ == "__main__":
    import sys
    symbol = sys.argv[1] if len(sys.argv) > 1 else 'AAPL'
    train_and_save(symbol)
