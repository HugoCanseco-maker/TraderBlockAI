'use client'

import { motion } from 'framer-motion'

export default function RiskModeSection() {
  return (
    <section className="w-full py-16 bg-gray-900 text-white">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-semibold mb-4"
        >
          Choose Your Risk Mode
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg mb-10 text-gray-300"
        >
          Conservative, Moderate, or Aggressive — our model tunes itself to your comfort zone.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          {['Conservative', 'Moderate', 'Aggressive'].map((mode, i) => (
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.2 }}
              className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-white transition"
            >
              <h3 className="text-xl font-bold mb-2">{mode}</h3>
              <p className="text-gray-400 text-sm">
                {mode === 'Conservative'
                  ? 'Low volatility, long-term safety plays.'
                  : mode === 'Moderate'
                  ? 'Balanced mix of growth and stability.'
                  : 'High risk, high reward — let’s go.'}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
