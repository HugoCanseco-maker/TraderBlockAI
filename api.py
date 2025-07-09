import os
import pickle
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from tensorflow.keras.models import load_model
import numpy as np

app = FastAPI()

# Path to saved models and scalers
MODEL_DIR = os.path.join(os.path.dirname(__file__), "models", "saved")
SCALER_DIR = os.path.join(MODEL_DIR, "scalers")
os.makedirs(SCALER_DIR, exist_ok=True)

class PredictionInput(BaseModel):
    symbol: str
    window: list[float]  # The last 60 normalized prices

@app.post("/predict")
def predict_price(data: PredictionInput):
    model_path = os.path.join(MODEL_DIR, f"{data.symbol}.keras")
    scaler_path = os.path.join(SCALER_DIR, f"{data.symbol}_scaler.pkl")

    if not os.path.exists(model_path):
        raise HTTPException(status_code=404, detail=f"Model for {data.symbol} not found")
    if not os.path.exists(scaler_path):
        raise HTTPException(status_code=404, detail=f"Scaler for {data.symbol} not found")

    # Load model
    model = load_model(model_path)

    # Load scaler
    with open(scaler_path, "rb") as f:
        scaler = pickle.load(f)

    # Prepare input
    input_data = np.array(data.window).reshape(1, -1, 1)
    prediction = model.predict(input_data)[0][0]
    predicted_price = scaler.inverse_transform([[prediction]])[0][0]

    return {"predicted_price": round(predicted_price, 2)}
