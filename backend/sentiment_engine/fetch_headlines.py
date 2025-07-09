import requests
import logging

# Optional fallback headlines if API fails
DEFAULT_HEADLINES = [
    "Tech stocks rise amid market optimism",
    "Investors eye inflation data for future rate decisions",
    "Stock market steadies after volatile week",
    "Economic indicators suggest potential slowdown",
    "Analysts revise growth forecasts for major firms"
]

def fetch_headlines_gnews(query: str, api_key: str, max_results: int = 10) -> list:
    """
    Fetches recent news headlines for a stock or keyword from GNews API.
    Includes fallback logic and broader query strategy.
    """
    try:
        broader_query = f"{query} stock OR {query} company OR {query} finance"
        url = f"https://gnews.io/api/v4/search?q={broader_query}&token={api_key}&lang=en&max={max_results}"
        response = requests.get(url, timeout=10)
        response.raise_for_status()

        articles = response.json().get("articles", [])
        headlines = [article.get("title", "") for article in articles if article.get("title")]

        if not headlines:
            logging.warning(f"No headlines found for {query}. Using fallback headlines.")
            return DEFAULT_HEADLINES

        return headlines

    except requests.RequestException as e:
        logging.error(f"GNews API error for '{query}': {str(e)} — using fallback headlines.")
        return DEFAULT_HEADLINES
