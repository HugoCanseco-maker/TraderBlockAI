//frontend/app/sim/page.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function SimModePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10 flex flex-col gap-10">
      {/* TITLE */}
      <h1 className="text-4xl md:text-5xl font-bold text-center">
        Sim Mode Preview
      </h1>
      <p className="text-center max-w-xl mx-auto text-gray-400">
        See how TraderBlockAI makes real predictions using market data, AI pattern
        detection, and transparent decision logic.
      </p>

      {/* ANIMATION SEQUENCE */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-900 p-6 rounded-2xl shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Step 1</h2>
          <p className="text-sm">Scanning market data (yFinance)</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-900 p-6 rounded-2xl shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Step 2</h2>
          <p className="text-sm">Analyzing chart patterns with LSTM</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-900 p-6 rounded-2xl shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Step 3</h2>
          <p className="text-sm">Calculating confidence + prediction</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-green-700/80 p-6 rounded-2xl shadow-lg border border-green-300"
        >
          <h2 className="text-xl font-semibold mb-2">Step 4</h2>
          <p className="text-sm font-mono">
            BUY AAPL ↑ @ $211.53 <br />
            (July 22, 2025)
          </p>
        </motion.div>
      </div>

      {/* EXPLANATION BLOCK */}
      <div className="bg-gray-800 p-8 rounded-2xl max-w-4xl mx-auto text-left shadow-xl">
        <h2 className="text-2xl font-bold mb-4">How TraderBlockAI Works</h2>
        <ul className="list-disc pl-6 space-y-2 text-sm text-gray-300">
          <li>
            Uses real historical data from yFinance and (soon) Alpaca for modeling
          </li>
          <li>
            LSTM model learns from price action trends and volume indicators
          </li>
          <li>
            Confidence scoring added using standard deviation + future intervals
          </li>
          <li>
            Sentiment analysis (news headlines) will soon refine predictions further
          </li>
        </ul>
        <Button className="mt-6" onClick={() => router.push("/login")}>Login to Access Live Sim Mode</Button>
      </div>
    </div>
  );
}
