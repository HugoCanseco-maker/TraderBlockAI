'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Prediction {
  symbol: string;
  predicted_price?: number;
  direction?: string;
  confidence?: number;
  [key: string]: any;
}

export default function SimPage() {
  const [symbol, setSymbol] = useState('AAPL');
  const [result, setResult] = useState<Prediction | null>(null);
  const [loading, setLoading] = useState(false);

  const runPrediction = async () => {
    setLoading(true);
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || '';
    try {
      const res = await fetch(`${baseURL}/api/predict?symbol=${encodeURIComponent(symbol)}&risk=Moderate`);
      const data: Prediction = await res.json();
      setResult(data);

      // log prediction (fire and forget)
      fetch(`${baseURL}/api/log_prediction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).catch(() => {});
    } catch (e) {
      console.error('Prediction failed', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <h1 className="text-4xl font-bold mb-4 text-green-500">🚀 Sim Mode Preview</h1>
      <p className="text-gray-300 max-w-2xl mb-8">
        Welcome to Sim Mode. Enter a ticker below to run the live model.
      </p>

      <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg mb-6">
        <h2 className="text-2xl font-semibold mb-4">📈 Run Prediction</h2>
        <div className="flex items-center gap-4 mb-4">
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            className="px-3 py-2 rounded-lg bg-zinc-800 text-white focus:outline-none"
            placeholder="Ticker e.g. AAPL"
          />
          <button
            onClick={runPrediction}
            disabled={loading}
            className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            {loading ? 'Loading...' : 'Predict'}
          </button>
        </div>

        {result && (
          <div className="mt-4 text-sm text-gray-200">
            <p>
              {result.symbol}: {result.direction} with{' '}
              {result.confidence ? (result.confidence * 100).toFixed(1) : '0'}% confidence.
            </p>
            {result.predicted_price && (
              <p>Target price: {'$' + result.predicted_price.toFixed(2)}</p>
            )}
          </div>
        )}
      </div>

      <Link href="/" className="text-green-500 underline mt-6 block">
        ← Back to Home
      </Link>
    </main>
  );
}
