import yfinance as yf
import pandas as pd

def get_trending_stocks(limit=20):
    # Hardcoded top trending tech/NASDAQ tickers for now
    watchlist = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA', 'NFLX',
                 'AMD', 'INTC', 'PLTR', 'BABA', 'SHOP', 'ROKU', 'UBER', 'LYFT',
                 'SNOW', 'COIN', 'CRM', 'PYPL']

    data = []
    for ticker in watchlist:
        try:
            hist = yf.download(ticker, period="5d", interval="1d")
            change = (hist['Close'][-1] - hist['Open'][0]) / hist['Open'][0]
            data.append((ticker, round(change * 100, 2)))
        except Exception as e:
            data.append((ticker, None))

    df = pd.DataFrame(data, columns=["Symbol", "5D % Change"])
    df = df.dropna().sort_values(by="5D % Change", ascending=False)
    return df.head(limit).to_dict(orient="records")
