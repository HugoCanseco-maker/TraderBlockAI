'use client';

import Hero from '../components/Hero';
import FeatureSection from '../components/FeatureSection';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

export default function HomePage() {
  return (
    <main className="bg-black text-white font-sans overflow-x-hidden">
      <NavBar />
      <Hero />
      <FeatureSection />
      <Footer />
    </main>
  );
}
