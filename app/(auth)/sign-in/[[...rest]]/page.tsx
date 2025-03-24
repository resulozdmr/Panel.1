"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/dashboard");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200">
      <div className="bg-white p-10 shadow-xl rounded-lg w-full max-w-lg">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Image src="/logo.png" alt="Dr. Gulf Logo" width={120} height={120} />
        </div>

        {/* Giriş Başlığı */}
        <h1 className="text-center text-3xl font-extrabold text-gray-800 mb-2">Welcome to DrGulf</h1>

        {/* Alt Başlık */}
        <h2 className="text-center text-lg font-semibold text-gray-600 mb-6">
          Sign in to your account
        </h2>

        {/* Hata Mesajı */}
        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

        {/* Giriş Formu */}
        <form onSubmit={handleSignIn} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-2 w-full"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Kayıt Ol Linki */}
        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <a href="/sign-up" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
