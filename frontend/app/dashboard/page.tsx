'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface Prediction {
  symbol: string;
  confidence: number;
  sentiment_score: number;
  direction: string;
  current_price: number;
}

interface Trade {
  symbol: string;
  executed_price: number;
  action: string;
  timestamp: string;
}

export default function Dashboard() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';

        const [predRes, tradeRes] = await Promise.all([
          fetch(`${baseUrl}/api/top_predictions`),
          fetch(`${baseUrl}/api/trades`),
        ]);

        const predData = await predRes.json();
        const tradeData = await tradeRes.ok ? await tradeRes.json() : [];

        setPredictions(predData);
        setTrades(tradeData);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">📊 TraderBlockAI Dashboard</h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading predictions and trades...</p>
      ) : (
        <>
          {/* Predictions Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Top Stock Predictions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {predictions.map((p) => (
                <div
                  key={p.symbol}
                  className="bg-zinc-800 rounded-xl p-4 shadow-md border border-zinc-700"
                >
                  <h3 className="text-xl font-bold text-green-400">${p.symbol}</h3>
                  <p className="text-gray-300 mt-1">
                    Confidence:{' '}
                    <span className="text-white font-semibold">
                      {(p.confidence * 100).toFixed(2)}%
                    </span>
                  </p>
                  <p className="text-gray-300">
                    Sentiment Score:{' '}
                    <span className="text-white font-semibold">{p.sentiment_score.toFixed(2)}</span>
                  </p>
                  <p className="text-gray-300">
                    Direction:{' '}
                    <span
                      className={`font-bold ${
                        p.direction === 'up' ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {p.direction.toUpperCase()}{' '}
                      {p.direction === 'up' ? (
                        <ArrowUpRight className="inline-block" size={16} />
                      ) : (
                        <ArrowDownRight className="inline-block" size={16} />
                      )}
                    </span>
                  </p>
                  <p className="text-gray-300">
                    Current Price:{' '}
                    <span className="text-white font-semibold">${p.current_price.toFixed(2)}</span>
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Trade History Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Recent Trades</h2>
            {trades.length === 0 ? (
              <p className="text-gray-400">No trades have been executed yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full table-auto text-left border-collapse">
                  <thead className="bg-zinc-900">
                    <tr>
                      <th className="px-4 py-2">Symbol</th>
                      <th className="px-4 py-2">Action</th>
                      <th className="px-4 py-2">Executed Price</th>
                      <th className="px-4 py-2">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trades.map((trade, index) => (
                      <tr
                        key={index}
                        className="border-t border-zinc-700 hover:bg-zinc-800 transition"
                      >
                        <td className="px-4 py-2 text-green-400 font-bold">${trade.symbol}</td>
                        <td className="px-4 py-2 capitalize">{trade.action}</td>
                        <td className="px-4 py-2">${trade.executed_price.toFixed(2)}</td>
                        <td className="px-4 py-2 text-sm text-gray-400">
                          {new Date(trade.timestamp).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
}
