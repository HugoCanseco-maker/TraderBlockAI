import os
import json
import random
import numpy as np
from datetime import datetime
from sim_mode.strategy_logic import generate_signals
from models.lstm_predict import predict_price
from models.batch_trainer import TOP_30  # ✅ dynamically import top 30 list

# Sim Config
RISK_MODE = os.getenv("RISK_MODE", "Moderate")  # Can be Conservative, Moderate, Aggressive
STARTING_BALANCE = 10000
TRADES_LOG = []

# Sim results folder
RESULTS_DIR = os.path.join(os.path.dirname(__file__), "results")
os.makedirs(RESULTS_DIR, exist_ok=True)

# Position sizing by risk mode
RISK_MULTIPLIER = {
    "Conservative": 0.05,
    "Moderate": 0.15,
    "Aggressive": 0.30
}[RISK_MODE]

def simulate():
    balance = STARTING_BALANCE
    portfolio = {}

    for symbol in TOP_30:  # ✅ use full batch list
        try:
            result = predict_price(symbol)
            predicted = float(result["predicted_price"])
            last = float(result["last_price"])
            direction = result["direction"]
            confidence = float(result["confidence"])

            trade_signal = generate_signals(symbol, predicted, last, direction, confidence, RISK_MODE)

            if trade_signal == "buy":
                alloc = balance * RISK_MULTIPLIER
                shares = int(alloc / last)
                cost = shares * last

                if shares > 0:
                    balance -= cost
                    portfolio[symbol] = {
                        "shares": shares,
                        "buy_price": last,
                        "predicted": predicted
                    }

                    TRADES_LOG.append({
                        "symbol": symbol,
                        "action": "BUY",
                        "shares": shares,
                        "price": last,
                        "predicted": predicted,
                        "confidence": confidence,
                        "timestamp": datetime.utcnow().isoformat()
                    })
        except Exception as e:
            print(f"[ERROR] {symbol}: {e}")

    # Save trades
    with open(os.path.join(RESULTS_DIR, f"sim_trades_{RISK_MODE.lower()}.json"), "w") as f:
        json.dump(TRADES_LOG, f, indent=2)

    print(f"[DONE] Sim complete under {RISK_MODE} mode. {len(TRADES_LOG)} trades logged.")

if __name__ == "__main__":
    simulate()
