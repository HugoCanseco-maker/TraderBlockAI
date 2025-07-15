'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Trade {
  time: string;
  stock: string;
  side: 'buy' | 'sell';
  price: number;
  quantity: number;
}

export default function Dashboard() {
  const [risk, setRisk] = useState<'conservative' | 'moderate' | 'aggressive'>('moderate');
  const [mode, setMode] = useState<'sim' | 'live'>('sim');

  // sample portfolio values
  const totalBalance = 12500.35;
  const pnl = 350.75;
  const growth = 2.8;

  const trades: Trade[] = [
    {
      time: '2024-05-10 10:31',
      stock: 'AAPL',
      side: 'buy',
      price: 170.25,
      quantity: 10,
    },
    {
      time: '2024-05-09 14:22',
      stock: 'TSLA',
      side: 'sell',
      price: 180.7,
      quantity: 5,
    },
    {
      time: '2024-05-08 09:15',
      stock: 'MSFT',
      side: 'buy',
      price: 312.5,
      quantity: 3,
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white px-4 py-6 md:px-8 md:py-10">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">TraderBlockAI Dashboard</h1>
        <div className="w-9 h-9 rounded-full bg-zinc-700 flex items-center justify-center">
          <Image src="/avatar-placeholder.png" alt="User" width={36} height={36} className="rounded-full" />
        </div>
      </header>

      {/* Portfolio summary */}
      <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 mb-8">
        <div className="bg-zinc-800 p-4 rounded-xl shadow">
          <p className="text-gray-400 text-sm">Total Balance</p>
          <p className="text-2xl font-semibold">{totalBalance.toLocaleString()}</p>
        </div>
        <div className="bg-zinc-800 p-4 rounded-xl shadow">
          <p className="text-gray-400 text-sm">P&amp;L</p>
          <p className="text-2xl font-semibold">{pnl.toFixed(2)}</p>
        </div>
        <div className="bg-zinc-800 p-4 rounded-xl shadow">
          <p className="text-gray-400 text-sm">Growth %</p>
          <p className="text-2xl font-semibold">{growth}%</p>
        </div>
      </section>

      {/* Risk mode selector */}
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

      {/* Chart placeholder */}
      <section className="mb-8">
        <div className="h-64 w-full bg-zinc-800 rounded-xl flex items-center justify-center text-gray-400 shadow">
          Chart Placeholder
        </div>
      </section>

      {/* Mode toggle */}
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

      {/* Recent trades */}
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
    </main>
  );
}

