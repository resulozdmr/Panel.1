"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";

export default function SignUpPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    birthdate: "",
    graduationYear: "",
    phoneNumber: "",
    countryCode: "+90",
    university: "",
    hospital: "",
    specialty: "",
    licenseNumber: "",
    certifications: [] as File[],
    cvFile: null as File | null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (!files) return;
    if (name === "certifications") {
      setFormData((prev) => ({
        ...prev,
        certifications: Array.from(files),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      // Kullanıcı hesabı oluştur (sadece email + password + metadata ile)
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      // Diğer form bilgilerini localStorage'ta geçici olarak tut
      localStorage.setItem("pending_user", JSON.stringify(formData));

      setMessage("Please check your email to verify your account.");
      router.push("/verify-email"); // veya teşekkür sayfası
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
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow rounded-lg">
      <img src="/logo.png" alt="DrGulf Logo" className="mx-auto mb-4 h-20" />
      <h2 className="text-center text-lg font-semibold mb-6">
        Join our network of healthcare professionals and explore new opportunities in the Gulf region.
      </h2>

      {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}
      {message && <p className="text-green-600 mb-4 text-sm">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input name="firstName" placeholder="First Name" required onChange={handleChange} className="border p-2 rounded-lg text-sm w-full" />
          <input name="lastName" placeholder="Last Name" required onChange={handleChange} className="border p-2 rounded-lg text-sm w-full" />
        </div>
        <input name="email" type="email" placeholder="Email" required onChange={handleChange} className="border p-2 rounded-lg text-sm w-full" />
        <input name="password" type="password" placeholder="Password" required onChange={handleChange} className="border p-2 rounded-lg text-sm w-full" />
        <input name="birthdate" type="date" required onChange={handleChange} className="border p-2 rounded-lg text-sm w-full" />

        <select name="graduationYear" required value={formData.graduationYear} onChange={handleChange} className="border p-2 rounded-lg text-sm w-full text-gray-500">
          <option value="">Select Graduation Year</option>
          {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <div className="flex gap-2">
          <select name="countryCode" value={formData.countryCode} onChange={handleChange} className="w-28 border p-2 rounded-lg text-sm">
            {countryCodes.map(({ code, flag }) => (
              <option key={code} value={code}>{`${code} ${flag}`}</option>
            ))}
          </select>
          <input name="phoneNumber" placeholder="Phone Number" onChange={handleChange} className="flex-1 border p-2 rounded-lg text-sm w-full" required />
        </div>

        <input name="university" placeholder="University" required onChange={handleChange} className="border p-2 rounded-lg text-sm w-full" />
        <input name="hospital" placeholder="Hospital" required onChange={handleChange} className="border p-2 rounded-lg text-sm w-full" />
        <input name="specialty" placeholder="Specialty" required onChange={handleChange} className="border p-2 rounded-lg text-sm w-full" />
        <input name="licenseNumber" placeholder="License Number" required onChange={handleChange} className="border p-2 rounded-lg text-sm w-full" />

        <label className="block font-semibold">Upload Certifications (PDFs)</label>
        <input type="file" name="certifications" multiple accept="application/pdf" onChange={handleFileChange} className="w-full text-sm" required />

        <label className="block font-semibold mt-2">Upload CV (PDF)</label>
        <input type="file" name="cvFile" accept="application/pdf" onChange={handleFileChange} className="w-full text-sm" required />

        <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 transition text-white p-2 w-full rounded-lg font-semibold">
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
