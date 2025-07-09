# sim_mode/strategy_logic.py

def generate_signals(symbol, predicted, last, direction, confidence, risk_mode):
    """
    Decide whether to buy based on predicted price movement, confidence, and selected risk tolerance.

    Parameters:
    - symbol: str
    - predicted: float (predicted price from model)
    - last: float (latest known market price)
    - direction: 'up' or 'down'
    - confidence: float (0 to 1)
    - risk_mode: 'Conservative', 'Moderate', or 'Aggressive'

    Returns:
    - "buy" if trade is recommended, "hold" otherwise
    """

    # Risk-mode thresholds for minimum confidence
    confidence_thresholds = {
        "Conservative": 0.02,
        "Moderate": 0.01,
        "Aggressive": 0.005
    }

    threshold = confidence_thresholds.get(risk_mode, 0.01)

    price_diff = predicted - last
    rel_change = price_diff / last if last != 0 else 0

    # Logic: buy only if confident AND direction is up
    if direction == "up" and confidence >= threshold and rel_change > 0:
        return "buy"

    return "hold"
