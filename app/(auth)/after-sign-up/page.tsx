"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";

const AfterSignUp = () => {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Doğrulama kodu işlemlerini burada gerçekleştirin.
      // Örneğin, Clerk'in doğrulama API'sini çağırabilirsiniz:
      // const verificationResult = await signUp.attemptEmailAddressVerification({ code });
      // if (verificationResult.status === "complete") {
      //   router.push("/dashboard");
      // } else {
      //   throw new Error("Doğrulama başarısız");
      // }
      
      // Şimdilik, doğrulama başarılı sayıp yönlendirelim:
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Doğrulama sırasında bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg p-8 rounded-lg text-center">
        <h1 className="text-2xl font-bold text-gray-800">Kayıt Başarılı!</h1>
        <p className="text-gray-600 mt-2">Lütfen size gönderilen doğrulama kodunu girin:</p>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Doğrulama kodu"
            className="p-2 border rounded w-full"
            required
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white p-2 rounded w-full"
            disabled={loading}
          >
            {loading ? "Onaylanıyor..." : "Onayla"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AfterSignUp;
