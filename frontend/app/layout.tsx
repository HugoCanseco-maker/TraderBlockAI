// frontend/app/layout.tsx
import '../styles/globals.css';
import { AuthProvider } from '../lib/AuthProvider';
import { SupabaseProvider } from '../lib/supabaseProvider';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TraderBlockAI',
  description: 'AI-powered trading co-pilot for everyone',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white font-sans min-h-screen antialiased">
        <SupabaseProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
