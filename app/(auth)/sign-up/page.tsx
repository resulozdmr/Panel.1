"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";

export default function SignUpStepOne() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    countryCode: "+971",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: `${formData.firstName} ${formData.lastName}`,
            phone: `${formData.countryCode}${formData.phone}`,
          },
        },
      });

      if (error) throw error;

      setMessage("Sign up successful! Please check your email to verify your account.");
      router.push("/verify-email");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const countryCodes = [
    { code: "+90", flag: "🇹🇷" },
    { code: "+971", flag: "🇦🇪" },
    { code: "+1", flag: "🇺🇸" },
    { code: "+44", flag: "🇬🇧" },
    { code: "+49", flag: "🇩🇪" },
    { code: "+33", flag: "🇫🇷" },
    { code: "+39", flag: "🇮🇹" },
    { code: "+34", flag: "🇪🇸" },
    { code: "+61", flag: "🇦🇺" },
    { code: "+7", flag: "🇷🇺" },
    { code: "+81", flag: "🇯🇵" },
    { code: "+82", flag: "🇰🇷" },
    { code: "+91", flag: "🇮🇳" },
    { code: "+86", flag: "🇨🇳" },
    { code: "+966", flag: "🇸🇦" },
    { code: "+973", flag: "🇧🇭" },
    { code: "+974", flag: "🇶🇦" },
  ];

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded-lg">
      <img src="/logo.png" alt="DrGulf Logo" className="mx-auto mb-4 h-20" />
      <h2 className="text-center text-lg font-semibold mb-2">
        Create your account
      </h2>
      <p className="text-center text-sm text-gray-600 mb-6">
        Join our network of healthcare professionals and explore new opportunities in the Gulf region.
      </p>

      {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}
      {message && <p className="text-green-600 mb-4 text-sm">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input name="firstName" placeholder="First Name" required onChange={handleChange} className="border p-2 rounded-lg text-sm w-full" />
          <input name="lastName" placeholder="Last Name" required onChange={handleChange} className="border p-2 rounded-lg text-sm w-full" />
        </div>
        <input name="email" type="email" placeholder="Email" required onChange={handleChange} className="border p-2 rounded-lg text-sm w-full" />
        <input name="password" type="password" placeholder="Password" required onChange={handleChange} className="border p-2 rounded-lg text-sm w-full" />

        <div className="flex gap-2">
          <select
            name="countryCode"
            value={formData.countryCode}
            onChange={handleChange}
            className="border p-2 rounded-lg text-sm"
          >
            {countryCodes.map(({ code, flag }) => (
              <option key={code} value={code}>{`${flag} ${code}`}</option>
            ))}
          </select>
          <input name="phone" placeholder="Phone Number" required onChange={handleChange} className="border p-2 rounded-lg text-sm flex-1" />
        </div>

        <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white p-2 w-full rounded-lg font-semibold">
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
