def explain_prediction(symbol, direction, confidence):
    reason = "based on recent momentum and sentiment analysis"
    if direction == "up":
        statement = f"{symbol} is likely going up {reason}."
    else:
        statement = f"{symbol} is showing downward signals {reason}."

    return {
        "summary": statement,
        "confidence_level": f"{round(confidence * 100)}%",
        "factors": [
            "LSTM forecast over past 60 days",
            "Price momentum",
            "Recent sentiment score (if available)"
        ]
    }
