"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function VerifyEmailPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/sign-in");
    }, 5000); // 5 saniye sonra giriş sayfasına yönlendir

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-6 rounded-lg shadow max-w-md w-full text-center">
        <img src="/logo.png" alt="DrGulf Logo" className="mx-auto mb-4 h-20" />
        <h1 className="text-xl font-semibold mb-2">Thank you for verifying your email!</h1>
        <p className="text-sm text-gray-600 mb-4">
          Your account has been successfully verified. You will be redirected to the login page shortly.
        </p>
        <button
          onClick={() => router.push("/sign-in")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}
