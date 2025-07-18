// frontend/app/page.tsx
'use client';

import NavBar from '../components/NavBar';
import StockTicker from '../components/StockTicker';
import Hero from '../components/Hero';
import FeatureSection from '../components/FeatureSection';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Ticker */}
      <div className="sticky top-0 z-50 bg-black border-b border-gray-800">
        <StockTicker />
      </div>

      {/* Nav */}
      <NavBar />

      {/* Hero Section */}
      <section className="pt-24 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4 text-green-500">TraderBlockAI</h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed mb-6">
          Your AI-powered trading co-pilot. Trade smarter with real-time predictions,
          news sentiment analysis, and risk-tuned strategies. Built by students, for everyone.
        </p>
        <a
          href="/dashboard"
          className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-500 transition"
        >
          Launch Dashboard
        </a>
      </section>

      {/* Features */}
      <section id="features" className="mt-32 px-6">
        <FeatureSection />
      </section>

      {/* CTA */}
      <section id="join-beta" className="mt-32 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4 text-green-400">Join the Beta</h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-6">
          Sim Mode is now built directly into the dashboard. Click below to get started and try the live prediction engine.
        </p>
        <a
          href="/dashboard"
          className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-500 transition"
        >
          Launch Dashboard
        </a>
      </section>

      {/* Footer */}
      <div className="mt-32">
        <Footer />
      </div>
    </main>
  );
}
