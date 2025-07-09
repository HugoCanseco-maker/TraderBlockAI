from nltk.sentiment.vader import SentimentIntensityAnalyzer
import nltk

try:
    nltk.data.find('sentiment/vader_lexicon')
except LookupError:
    nltk.download('vader_lexicon', quiet=True)

analyzer = SentimentIntensityAnalyzer()

def get_sentiment_score(text: str) -> float:
    return analyzer.polarity_scores(text).get('compound', 0.0)
