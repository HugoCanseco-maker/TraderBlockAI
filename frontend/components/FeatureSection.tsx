'use client';

export default function FeatureSection() {
  return (
    <section className="bg-black text-white py-24 px-6 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-8">Why TraderBlockAI?</h2>
      <div className="grid gap-12 md:grid-cols-3 max-w-6xl mx-auto">
        <div className="bg-zinc-900 p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-green-400 mb-2">🚀 AI-Powered Trading</h3>
          <p className="text-gray-300">
            Our LSTM model learns from real market data to deliver smarter forecasts — personalized for your strategy.
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-green-400 mb-2">🧪 Try Sim Mode in Dashboard</h3>
          <p className="text-gray-300">
            Sim Mode is now built right into the Dashboard. Explore predictions and test ideas before going live — all in one place.
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-green-400 mb-2">🌍 Built for the Culture</h3>
          <p className="text-gray-300">
            Created for underserved investors. We democratize tools once locked behind hedge funds — and make them yours.
          </p>
        </div>
      </div>
    </section>
  );
}
