// frontend/components/sim/TickerSection.tsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const steps = [
  "Fetching stock ticker...",
  "Calling yFinance API...",
  "Analyzing trends with AI model...",
  "Prediction Ready!"
];

export default function TickerSection() {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-16 px-6 text-center bg-gradient-to-b from-gray-900 to-black text-white">
      <h2 className="text-3xl font-bold mb-8">How It Works</h2>
      <motion.div
        key={stepIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-xl font-medium"
      >
        {steps[stepIndex]}
      </motion.div>
    </div>
  );
}
