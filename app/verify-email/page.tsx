"use client";
import Image from "next/image";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/sign-in");
    }, 5000); // 5 saniye sonra yönlendirme

    return () => clearTimeout(timer); // Cleanup
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 px-4">
      <Image src="/logo.png" alt="DrGulf Logo" height={80} width={80} />
      <h2 className="text-xl font-semibold mb-2">Please verify your email</h2>
      <p className="text-gray-600 text-center max-w-md">
        We've sent you an email with a verification link. Please check your inbox
        and confirm your email address to activate your account.
      </p>
      <p className="mt-4 text-sm text-gray-400">
      You ll be redirected to the login page shortly...
      </p>
    </div>
  );
}
