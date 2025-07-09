import logging
from sentiment_engine.fetch_headlines import fetch_headlines_gnews
from sentiment_engine.vader_sentiment import get_sentiment_score
from config import GNEWS_API_KEY

def get_sentiment_for_stock(ticker: str) -> float:
    """
    Computes the average sentiment score for a stock based on recent headlines.
    Falls back to default headlines if GNews fails or quota is exceeded.
    """
    try:
        headlines = fetch_headlines_gnews(ticker, GNEWS_API_KEY)
        
        if not headlines:
            logging.warning(f"No headlines available for {ticker}. Sentiment defaulted to 0.")
            return 0.0

        scores = [get_sentiment_score(headline) for headline in headlines if headline]
        
        if not scores:
            logging.warning(f"No sentiment scores generated for {ticker}.")
            return 0.0

        average_sentiment = round(sum(scores) / len(scores), 4)
        return average_sentiment

    except Exception as e:
        logging.error(f"Sentiment scoring failed for {ticker}: {e}")
        return 0.0
