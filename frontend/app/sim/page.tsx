'use client';

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function SimModePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12 flex flex-col gap-16 items-center">
      {/* HEADER */}
      <section className="text-center max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Sim Mode Preview
        </h1>
        <p className="text-gray-400 text-lg">
          See how TraderBlockAI makes real predictions using market data, AI pattern
          detection, and transparent decision logic.
        </p>
      </section>

      {/* ANIMATION SEQUENCE */}
      <section className="w-full grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl">
        {[
          { step: "Step 1", desc: "Scanning market data (yFinance)" },
          { step: "Step 2", desc: "Analyzing chart patterns with LSTM" },
          { step: "Step 3", desc: "Calculating confidence + prediction" },
          {
            step: "Step 4",
            desc: "BUY AAPL ↑ @ $211.53\n(July 22, 2025)",
            isFinal: true,
          },
        ].map((item, index) => (
          <motion.div
            key={item.step}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * (index + 1), type: "spring" }}
            className={`p-6 rounded-2xl shadow ${
              item.isFinal
                ? "bg-green-700/80 border border-green-300 shadow-lg"
                : "bg-gray-900"
            }`}
          >
            <h2 className="text-xl font-semibold mb-2">{item.step}</h2>
            <p
              className={`text-sm ${
                item.isFinal ? "font-mono whitespace-pre-line" : ""
              }`}
            >
              {item.desc}
            </p>
          </motion.div>
        ))}
      </section>

      {/* EXPLANATION + CTA */}
      <section className="bg-gray-800 px-6 py-10 rounded-2xl max-w-4xl w-full shadow-xl text-left space-y-6">
        <h2 className="text-2xl font-bold">How TraderBlockAI Works</h2>
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
        <Button className="mt-4" onClick={() => router.push("/login")}>
          Login to Access Live Sim Mode
        </Button>
      </section>
    </main>
  );
}
