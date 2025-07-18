import NavBar from '../components/NavBar';
import StockTicker from '../components/StockTicker';
import Hero from '../components/Hero';
import FeatureSection from '../components/FeatureSection';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <main className="bg-black text-white font-sans overflow-x-hidden scroll-smooth">
      <StockTicker />
      <NavBar />
      <section id="hero">
        <Hero />
      </section>
      <section id="features">
        <FeatureSection />
      </section>

      {/* Join Beta with Sim Mode mention */}
      <section id="join-beta" className="pt-24 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4 text-green-400">Join the Beta</h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-6">
          TraderBlockAI’s Sim Mode is now built directly into the Dashboard — giving you a risk-free way to test trades with real-time predictions. Join the beta and start exploring the future of trading today.
        </p>
        {/* Optionally embed a Join Beta form or button */}
        <a
          href="/dashboard"
          className="inline-block px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-500 transition"
        >
          Launch Dashboard
        </a>
      </section>

      {/* Removed Sim Mode section because it's merged into Dashboard */}
      
      <Footer />
    </main>
  );
}
