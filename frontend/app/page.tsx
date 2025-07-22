// app/dashboard/page.tsx will be locked separately — this is landing

"use client";
"use client";
import { useRouter } from "next/navigation";
import Ticker from "@/components/StockTicker";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Top: Welcome + Ticker */}
      <div className="py-10 px-6 text-center border-b border-gray-800">
        <h1 className="text-4xl font-bold mb-2">Welcome to TraderBlock AI</h1>
        <p className="max-w-xl mx-auto text-gray-400">
          Your AI-powered trading assistant, built to help underserved inv$estors make smarter financial decisions.
        </p>
        <div className="mt-6">
          <Ticker />
        </div>
      </div>

      {/* Middle: Why TraderBlockAI */}
      <div className="py-12 px-6 bg-zinc-900 border-b border-gray-800">
        <h2 className="text-2xl font-semibold text-center mb-8">Why TraderBlockAI?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="p-6 bg-zinc-800 rounded-2xl shadow text-center">
            <h3 className="text-xl font-bold mb-2">Try Sim</h3>
            <p className="text-gray-400">Test trades in our risk-free simulation environment.</p>
          </div>
          <div className="p-6 bg-zinc-800 rounded-2xl shadow text-center">
            <h3 className="text-xl font-bold mb-2">See Mode</h3>
            <p className="text-gray-400">Preview how Chill / Moderate / Aggressive trading works.</p>
          </div>
          <div className="p-6 bg-zinc-800 rounded-2xl shadow text-center">
            <h3 className="text-xl font-bold mb-2">Preview Dashboard</h3>
            <p className="text-gray-400">Understand the dashboard layout before logging in.</p>
          </div>
        </div>
      </div>

      {/* Bottom: Sim Mode Preview + Callouts */}
      <div className="py-12 px-6 bg-black text-center">
        <h2 className="text-2xl font-semibold mb-4">Ready to Explore?</h2>
        <p className="text-gray-400 mb-8">Watch how the model acts live. Then go hands-on.</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Button onClick={() => router.push("/sim")}>Try Sim Mode</Button>
          <Button variant="secondary" onClick={() => router.push("/dashboard")}>See Dashboard</Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 px-6 text-center text-sm text-gray-500 border-t border-gray-800">
        &copy; 2025 TraderBlockAI. All rights reserved.
      </footer>
    </div>
  );
}
