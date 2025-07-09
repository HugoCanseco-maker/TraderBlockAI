'use client';

import Link from 'next/link';

export default function SimPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <h1 className="text-4xl font-bold mb-4 text-green-500">🚀 Sim Mode Preview</h1>
      <p className="text-gray-300 max-w-2xl mb-8">
        Welcome to Sim Mode. Here you can preview how TraderBlockAI makes trading decisions using your selected risk tier, live predictions, and AI commentary.
      </p>

      <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg mb-6">
        <h2 className="text-2xl font-semibold mb-2">📈 Sample Forecast</h2>
        <p className="text-gray-400 mb-2">Model predicts $AAPL will rise 1.43% over the next 2 days.</p>
        <div className="w-full bg-zinc-800 rounded-full h-4">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{ width: '65%' }}
          ></div>
        </div>
      </div>

      <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg mb-6">
        <h2 className="text-2xl font-semibold mb-2">🧠 Model Commentary</h2>
        <p className="text-gray-400">
          “Strong momentum in large-cap tech stocks and favorable macro news drove positive sentiment. LSTM confidence level: 88%.”
        </p>
      </div>

      <Link href="/" className="text-green-500 underline mt-6 block">← Back to Home</Link>
    </main>
  );
}
