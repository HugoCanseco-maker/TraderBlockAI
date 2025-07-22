'use client'

import { motion } from 'framer-motion'

export default function DashboardPreview() {
  return (
    <section className="w-full py-20 bg-gradient-to-b from-black to-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold mb-4"
        >
          Preview the Dashboard
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-400 mb-10"
        >
          See your daily portfolio forecasts, trade signals, and news insights — all in one place.
        </motion.p>

        <div className="flex justify-center">
          <div className="bg-gray-800 h-64 w-full sm:w-3/4 rounded-xl flex items-center justify-center text-gray-400">
            {/* Replace with a live dashboard animation or video later */}
            Dashboard Preview (Coming Soon)
          </div>
        </div>
      </div>
    </section>
  )
}
