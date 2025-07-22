// app/login/LoginForm.tsx
"use client";

import { useState } from "react";
import { useSupabase } from "@/lib/supabaseProvider";

export default function LoginForm() {
  const { supabase } = useSupabase();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      setMessage("Login failed. Please try again.");
    } else {
      setMessage("Check your email for the login link.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email address
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-700 rounded-md bg-black text-white"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 transition px-4 py-2 rounded-md font-semibold"
      >
        {loading ? "Sending..." : "Send Magic Link"}
      </button>

      {message && <p className="text-sm text-center mt-2">{message}</p>}
    </form>
  );
}
