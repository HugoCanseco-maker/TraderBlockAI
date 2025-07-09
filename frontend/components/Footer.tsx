// components/Footer.tsx
'use client';

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-10 px-6 text-center border-t border-zinc-800">
      <p className="text-sm mb-2">
        &copy; {new Date().getFullYear()} TraderBlockAI. All rights reserved.
      </p>
      <p className="text-xs">
        Built with ❤️ by traders, for traders. Powered by AI + real data.
      </p>
    </footer>
  );
}
