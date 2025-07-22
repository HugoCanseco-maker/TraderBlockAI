//frontend/app/sim/page.tsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const simSteps = [
  {
    title: "Step 1: Scanning the Market 📈",
    description:
      "Our LSTM and statistical models pull historical data to detect trends across 50+ stocks.",
  },
  {
    title: "Step 2: Making a Prediction 🧠",
    description:
      "TraderBlockAI forecasts stock movement with a confidence score and a target window.",
  },
  {
    title: "Step 3: Recommendation Ready ✅",
    description:
      "You get a simple trade suggestion: Buy, Sell, or Hold — fully explainable, no black boxes.",
  },
  {
    title: "Step 4: You Approve the Trade 🧠",
    description:
      "Sim Mode lets you approve or reject trade suggestions before anything is executed.",
  },
  {
    title: "Step 5: Trade Simulated 🧪",
    description:
      "Watch the trade “execute” in real-time, updating your virtual P&L instantly.",
  },
];

export default function SimModePage() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % simSteps.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const currentStep = simSteps[step];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4 py-12">
      <motion.div
        key={currentStep.title}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-xl"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">{currentStep.title}</h2>
        <p className="text-lg sm:text-xl">{currentStep.description}</p>
      </motion.div>

      <motion.div
        className="mt-12 flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <Button
          className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg text-md"
          onClick={() => window.location.href = "/join"}
        >
          Join the Beta
        </Button>

        <Button
          className="border border-white text-white hover:bg-white hover:text-black px-6 py-3 rounded-lg text-md"
          onClick={() => window.location.href = "/dashboard"}
        >
          Launch Dashboard
        </Button>
      </motion.div>
    </div>
  );
}
