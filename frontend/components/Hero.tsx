'use client';

import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formBaseURL =
      'https://docs.google.com/forms/d/e/1FAIpQLSf8v4RyvQYfBzlegBb04JFaYrXNBI8NFFYVzoYhenCcRRCKzg/viewform?usp=pp_url&entry.1429822610=';
    const fullURL = `${formBaseURL}${encodeURIComponent(email)}`;
    window.open(fullURL, '_blank');
  };

  return (
    <main className="bg-black text-white font-sans overflow-x-hidden">
      {/* Hero */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full z-0 opacity-30 whitespace-nowrap animate-marquee pointer-events-none text-green-400 font-mono font-bold text-xl">
          $AAPL +1.24% &nbsp;|&nbsp; $TSLA -0.43% &nbsp;|&nbsp; $GOOGL +0.65% &nbsp;|&nbsp; $MSFT +0.89% &nbsp;|&nbsp; $NVDA +2.31% &nbsp;|&nbsp; $AMZN +0.56% &nbsp;|&nbsp; $META +1.17% &nbsp;|&nbsp;
          $UBER +0.24% &nbsp;|&nbsp; $SQ -1.04% &nbsp;|&nbsp; $COIN +3.12%
        </div>

        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Welcome to <span className="text-green-500">TraderBlockAI</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto">
            An AI-powered trading assistant helping you invest smarter with personalized models and risk modes — built for the culture, powered by LSTM + Alpaca.
          </p>
        </div>

        {/* Scroll Hint */}
        <div className="absolute bottom-6 z-10 animate-bounce text-green-500 text-2xl">↓</div>
      </section>

      {/* Sections remain unchanged... */}

      {/* Final Signup CTA */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Get Early Access</h2>
        <p className="text-gray-300 text-lg mb-6">We’re launching soon. Be the first to test it out — and help shape the future of personal AI investing.</p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 rounded-xl bg-zinc-900 text-white border border-zinc-600 placeholder-gray-400 w-72 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-400 text-black font-semibold py-3 px-6 rounded-2xl shadow-lg transition"
          >
            Join the Beta
          </button>
        </form>

        {/* Dashboard CTA */}
        <div className="mt-6">
          <a
            href="/dashboard"
            className="inline-block bg-zinc-700 hover:bg-zinc-600 text-white font-semibold px-6 py-3 rounded-lg shadow transition mt-4"
          >
            🧠 See the Dashboard
          </a>
        </div>

        {/* Sim Mode CTA */}
        <div className="mt-10 text-center">
          <a
            href="/sim"
            className="inline-block bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-lg shadow transition mt-6"
          >
            🚀 Try Sim Mode Preview
          </a>
          <p className="text-xs text-gray-400 mt-2">
            *Preview your AI trade assistant in action
          </p>
        </div>
      </section>
    </main>
  );
}
