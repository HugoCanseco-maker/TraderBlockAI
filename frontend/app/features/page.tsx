"use client";

import { motion } from "framer-motion";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-5xl font-bold mb-4">What's Inside the Block?</h1>
          <p className="text-gray-400 text-lg">
            TraderBlockAI isn’t magic. It's a blend of rigorous stats, real-world modeling, and AI that adapts.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          <motion.div
            className="bg-zinc-900 rounded-2xl p-6 shadow hover:shadow-lg transition"
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="text-2xl font-semibold mb-3">📈 Machine Learning Models</h2>
            <p className="text-gray-400">
              LSTM networks forecast price direction 3–5 days out. Random forests validate trends. Bayesian logic weighs uncertainty.
            </p>
          </motion.div>

          <motion.div
            className="bg-zinc-900 rounded-2xl p-6 shadow hover:shadow-lg transition"
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="text-2xl font-semibold mb-3">📊 Statistical Foundations</h2>
            <p className="text-gray-400">
              Bollinger Bands, moving averages, and RSI form the core indicators. Regression analysis is used for baseline comparisons.
            </p>
          </motion.div>

          <motion.div
            className="bg-zinc-900 rounded-2xl p-6 shadow hover:shadow-lg transition"
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="text-2xl font-semibold mb-3">🤖 Risk Mode Intelligence</h2>
            <p className="text-gray-400">
              Toggle between Chill, Moderate, and Aggressive — each mode adjusts position sizing, entry confidence, and stop-loss logic.
            </p>
          </motion.div>

          <motion.div
            className="bg-zinc-900 rounded-2xl p-6 shadow hover:shadow-lg transition"
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="text-2xl font-semibold mb-3">🔍 Transparent Decisions</h2>
            <p className="text-gray-400">
              Each trade includes a confidence score, explanation, and a backtest comparison — so you see how it performed historically.
            </p>
          </motion.div>
        </div>

        {/* Real Trade Examples */}
        <div className="mt-10">
          <h2 className="text-3xl font-bold mb-6 text-center">📌 Live Trade Snapshots</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="bg-zinc-800 rounded-xl p-5"
              whileHover={{ scale: 1.01 }}
            >
              <h3 className="text-xl font-semibold mb-2">AAPL Trade – Chill Mode</h3>
              <p className="text-gray-400 text-sm mb-3">📆 July 17, 2025 – Buy Signal</p>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>📉 RSI: 28 (oversold)</li>
                <li>📊 Confidence Score: 87%</li>
                <li>📈 Prediction: +2.8% in 3 days</li>
                <li>✅ Executed @ $193.45 → Closed @ $198.02</li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-zinc-800 rounded-xl p-5"
              whileHover={{ scale: 1.01 }}
            >
              <h3 className="text-xl font-semibold mb-2">GOOGL Trade – Aggressive Mode</h3>
              <p className="text-gray-400 text-sm mb-3">📆 July 18, 2025 – Short Signal</p>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>📉 Bollinger upper breach</li>
                <li>📊 Confidence Score: 73%</li>
                <li>📉 Prediction: -1.5% in 48 hours</li>
                <li>✅ Executed @ $141.80 → Closed @ $139.55</li>
              </ul>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
}
