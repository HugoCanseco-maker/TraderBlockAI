'use client';

import React from 'react';

const tickers = ['AAPL', 'GOOGL', 'META', 'AMZN', 'TSLA', 'NVDA', 'MSFT'];

export default function StockTicker() {
  return (
    <div className="w-full bg-zinc-900 py-2 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap flex gap-8 px-4">
        {tickers.map((ticker, index) => (
          <span key={index} className="text-white font-semibold text-sm tracking-wide">
            {ticker} ▲ $1234.56
          </span>
        ))}
      </div>
    </div>
  );
}
