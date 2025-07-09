# Future: Plug in different sources (e.g., NewsAPI, GNews, Finnhub) here
from sentiment_engine.score_sentiment import get_sentiment_for_stock

def fetch_and_score_sentiment(ticker: str) -> float:
    return get_sentiment_for_stock(ticker)
