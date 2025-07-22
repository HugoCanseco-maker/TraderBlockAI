'use client'

import { motion } from 'framer-motion'

export default function ResultComparison() {
  return (
    <section className="w-full py-20 bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold mb-6"
        >
          Before vs After the Trade
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-400 mb-10"
        >
          Visualize the confidence. Our models called this before it happened.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-800 p-6 rounded-xl border border-gray-700"
          >
            <h3 className="text-xl font-semibold mb-2">Model Prediction</h3>
            <p className="text-gray-400 text-sm">"AAPL will rise 2.4% in the next 3 days."</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-green-900 p-6 rounded-xl border border-green-600"
          >
            <h3 className="text-xl font-semibold mb-2">Actual Result</h3>
            <p className="text-green-200 text-sm">AAPL rose 2.7% by July 21st. Confidence unlocked.</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
