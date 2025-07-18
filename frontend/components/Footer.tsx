'use client';

import Link from 'next/link';
import useSupabaseUser from '../lib/useSupabaseUser';

export default function Footer() {
  const user = useSupabaseUser();

  return (
    <footer className="bg-black text-gray-400 py-10 px-6 text-center border-t border-zinc-800">
      {!user && (
        <div className="mb-6 text-sm text-red-400">
          ⚠️ Please <Link href="/login" className="underline hover:text-red-300">log in</Link> to access full features. You’ll also need your own Alpaca API key to run live model predictions.
        </div>
      )}
      <p className="text-sm mb-2">
        &copy; {new Date().getFullYear()} TraderBlockAI. All rights reserved.
      </p>
      <p className="text-xs">
        Built with ❤️ by traders, for traders. Powered by AI + real data.
      </p>
    </footer>
  );
}
