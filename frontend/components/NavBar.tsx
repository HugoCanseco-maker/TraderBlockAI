// frontend/components/NavBar.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function NavBar() {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-black text-white border-b border-zinc-800">
      <div className="flex items-center gap-2">
        <Image src="/logo.svg" alt="TraderBlockAI Logo" width={32} height={32} />
        <span className="text-xl font-bold text-green-500">TraderBlockAI</span>
      </div>
      <div className="hidden md:flex gap-6 text-sm">
        <Link href="#features" className="hover:text-green-400 transition">Features</Link>
        <Link href="#sim" className="hover:text-green-400 transition">Sim Mode</Link>
        <Link href="#signup" className="hover:text-green-400 transition">Join Beta</Link>
      </div>
    </nav>
  );
}
