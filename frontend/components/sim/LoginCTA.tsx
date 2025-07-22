'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function LoginCTA() {
  return (
    <section className="w-full py-20 bg-black text-white border-t border-gray-800">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-semibold mb-4"
        >
          Ready to Test It Live?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-400 mb-8"
        >
          Connect your Alpaca key and unlock your personalized trading AI dashboard.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link href="/login">
            <button className="bg-green-600 hover:bg-green-700 transition px-6 py-3 text-white font-medium rounded-full text-lg shadow-md">
              Sign In to Begin
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
