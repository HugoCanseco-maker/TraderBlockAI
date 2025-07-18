'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Image from 'next/image';

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
  time: string;
  stock: string;
  side: 'buy' | 'sell';
  price: number;
  quantity: number;
}

export default function Dashboard() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [risk, setRisk] = useState<'conservative' | 'moderate' | 'aggressive'>('moderate');
  const [mode, setMode] = useState<'sim' | 'live'>('sim');

  const totalBalance = 12500.35;
  const pnl = 350.75;
  const growth = 2.8;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';

        const [predRes, tradeRes] = await Promise.all([
          fetch(`${baseUrl}/api/top_predictions`),
          fetch(`${baseUrl}/api/trades`)
        ]);

        const predData = await predRes.json();
        const tradeData = tradeRes.ok ? await tradeRes.json() : [];

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
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">TraderBlockAI Dashboard</h1>
        <div className="w-9 h-9 rounded-full bg-zinc-700 flex items-center justify-center">
          <Image src="/avatar-placeholder.png" alt="User" width={36} height={36} className="rounded-full" />
        </div>
      </header>

      {/* Sim Mode Welcome */}
      <section className="bg-zinc-800 p-4 rounded-xl shadow mb-8">
        <p className="text-lg text-green-400 font-semibold">Welcome to Sim Mode!</p>
        <p className="text-gray-300 text-sm mt-1">
          Try out AI-powered trades in a safe environment before switching to live mode. Performance is simulated using real-time market predictions.
        </p>
      </section>

      {/* Portfolio Summary */}
      <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 mb-8">
        <div className="bg-zinc-800 p-4 rounded-xl shadow">
          <p className="text-gray-400 text-sm">Total Balance</p>
          <p className="text-2xl font-semibold">${totalBalance.toLocaleString()}</p>
        </div>
        <div className="bg-zinc-800 p-4 rounded-xl shadow">
          <p className="text-gray-400 text-sm">P&amp;L</p>
          <p className="text-2xl font-semibold">${pnl.toFixed(2)}</p>
        </div>
        <div className="bg-zinc-800 p-4 rounded-xl shadow">
          <p className="text-gray-400 text-sm">Growth %</p>
          <p className="text-2xl font-semibold">{growth}%</p>
        </div>
      </section>

      {/* Risk Mode Selector */}
      <section className="mb-8">
        <div className="flex gap-2">
          {['conservative', 'moderate', 'aggressive'].map((r) => (
            <button
              key={r}
              onClick={() => setRisk(r as typeof risk)}
              className={`px-4 py-2 rounded-full text-sm capitalize border transition-colors ${
                risk === r ? 'bg-green-600 border-green-600' : 'border-zinc-600'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </section>

      {/* Mode Toggle */}
      <section className="mb-8">
        <div className="inline-flex rounded-full bg-zinc-800 p-1">
          {['sim', 'live'].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m as typeof mode)}
              className={`px-4 py-2 text-sm rounded-full transition-colors ${
                mode === m ? 'bg-green-600' : ''
              }`}
            >
              {m === 'sim' ? 'Sim Mode' : 'Live Mode'}
            </button>
          ))}
        </div>
      </section>

      {loading ? (
        <p className="text-center text-gray-400">Loading predictions and trades...</p>
      ) : (
        <>
          {/* Predictions */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Top Stock Predictions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {predictions.map((p) => (
                <div key={p.symbol} className="bg-zinc-800 rounded-xl p-4 shadow-md border border-zinc-700">
                  <h3 className="text-xl font-bold text-green-400">${p.symbol}</h3>
                  <p className="text-gray-300 mt-1">
                    Confidence: <span className="text-white font-semibold">{(p.confidence * 100).toFixed(2)}%</span>
                  </p>
                  <p className="text-gray-300">
                    Sentiment Score: <span className="text-white font-semibold">{p.sentiment_score.toFixed(2)}</span>
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
                    Current Price: <span className="text-white font-semibold">${p.current_price.toFixed(2)}</span>
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Trade History */}
          <section className="bg-zinc-800 rounded-xl p-4 shadow">
            <h2 className="text-xl font-semibold mb-4">Recent Trades</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-400">
                    <th className="py-2">Time</th>
                    <th className="py-2">Stock</th>
                    <th className="py-2">Side</th>
                    <th className="py-2">Price</th>
                    <th className="py-2">Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {trades.map((t, idx) => (
                    <tr key={idx} className="border-t border-zinc-700 last:border-b">
                      <td className="py-2">{t.time}</td>
                      <td className="py-2">{t.stock}</td>
                      <td className="py-2 capitalize">{t.side}</td>
                      <td className="py-2">{t.price.toFixed(2)}</td>
                      <td className="py-2">{t.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
