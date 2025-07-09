import os
import json
import matplotlib.pyplot as plt
import yfinance as yf
from datetime import datetime, timedelta

# Load simulation results
RISK_MODE = os.getenv("RISK_MODE", "Moderate")
RESULTS_DIR = os.path.join(os.path.dirname(__file__), "results")
RESULT_FILE = os.path.join(RESULTS_DIR, f"sim_trades_{RISK_MODE.lower()}.json")

with open(RESULT_FILE, "r") as f:
    trades = json.load(f)

# Group trades by symbol
trades_by_symbol = {}
for trade in trades:
    symbol = trade["symbol"]
    trades_by_symbol.setdefault(symbol, []).append(trade)

# Plot each symbol’s trades
for symbol, symbol_trades in trades_by_symbol.items():
    # Get recent 90-day price history
    df = yf.download(symbol, period="90d", interval="1d", progress=False)
    if df.empty or "Close" not in df:
        print(f"[SKIP] No data for {symbol}")
        continue

    df["Date"] = df.index

    plt.figure(figsize=(12, 6))
    plt.plot(df["Date"], df["Close"], label="Close Price", linewidth=2)

    # Add trade markers
    for trade in symbol_trades:
        timestamp = datetime.fromisoformat(trade["timestamp"])
        price = trade["price"]
        plt.scatter(timestamp, price, color="green", s=80, label="Buy Signal")

        # Annotate with confidence
        plt.annotate(f"{trade['confidence']:.2f}", (timestamp, price),
                     textcoords="offset points", xytext=(0,10), ha='center', fontsize=8)

    plt.title(f"{symbol} - Buy Signals ({RISK_MODE} Mode)")
    plt.xlabel("Date")
    plt.ylabel("Price ($)")
    plt.legend()
    plt.grid(True)
    plt.tight_layout()

    # Save chart
    chart_path = os.path.join(RESULTS_DIR, f"{symbol}_trades_{RISK_MODE.lower()}.png")
    plt.savefig(chart_path)
    plt.close()

    print(f"[DONE] Saved chart for {symbol}: {chart_path}")
