"use client";

import { useState } from "react";
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

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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

  const uploadFile = async (file: File, path: string) => {
    const { error } = await supabase.storage
      .from("documents")
      .upload(path, file);
    if (error) throw error;

    const { data } = supabase.storage
      .from("documents")
      .getPublicUrl(path);
    return data.publicUrl;
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      // 1. Kullanıcı oluştur
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email: formData.email.toLowerCase(),
          password: formData.password,
        });

      if (signUpError || !signUpData.user) {
        throw new Error(signUpError?.message || "Kayıt başarısız oldu.");
      }

      const userId = signUpData.user.id;

      // 2. CV dosyasını yükle
      let cvUrl = null;
      if (formData.cvFile) {
        const path = `${userId}/cv_${Date.now()}.pdf`;
        cvUrl = await uploadFile(formData.cvFile, path);
      }

      // 3. Sertifikaları yükle
      const certUrls = [];
      for (const file of formData.certifications) {
        const path = `${userId}/cert_${Date.now()}_${file.name}`;
        const url = await uploadFile(file, path);
        certUrls.push(url);
      }

      // 4. Kullanıcı bilgilerini kaydet
      const { error: userError } = await supabase.from("users").insert({
        user_id: userId,
        full_name: `${formData.firstName} ${formData.lastName}`,
        phone_number: `${formData.countryCode}${formData.phoneNumber}`,
        birthdate: formData.birthdate,
        graduation_year: formData.graduationYear,
        university: formData.university,
        hospital: formData.hospital,
        specialty: formData.specialty,
        license_number: formData.licenseNumber,
        cv_url: cvUrl,
      });

      if (userError) throw new Error(userError.message);

      // 5. Sertifika verilerini documents tablosuna yaz
      for (const certUrl of certUrls) {
        await supabase.from("documents").insert({
          user_id: userId,
          file_name: "Certification",
          file_url: certUrl,
        });
      }

      setMessage("Başarılı kayıt! Lütfen e-posta adresinizi doğrulayın.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-6">Kayıt Ol</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {message && <p className="text-green-600 mb-4">{message}</p>}

      <form onSubmit={handleSignUp} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input name="firstName" placeholder="First Name" required onChange={handleChange} className="border p-2" />
          <input name="lastName" placeholder="Last Name" required onChange={handleChange} className="border p-2" />
        </div>
        <input name="email" type="email" placeholder="Email" required onChange={handleChange} className="w-full border p-2" />
        <input name="password" type="password" placeholder="Password" required onChange={handleChange} className="w-full border p-2" />
        <input name="birthdate" type="date" required onChange={handleChange} className="w-full border p-2" />

        <select name="graduationYear" required value={formData.graduationYear} onChange={handleChange} className="w-full border p-2">
          <option value="">Select Graduation Year</option>
          {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <div className="flex gap-2">
          <select name="countryCode" value={formData.countryCode} onChange={handleChange} className="w-24 border p-2">
            <option value="+90">+90 🇹🇷</option>
            <option value="+1">+1 🇺🇸</option>
            <option value="+44">+44 🇬🇧</option>
            {/* İstediğin kadar ülke ekleyebilirsin */}
          </select>
          <input name="phoneNumber" placeholder="Phone Number" onChange={handleChange} className="flex-1 border p-2" required />
        </div>

        <input name="university" placeholder="University" onChange={handleChange} className="w-full border p-2" />
        <input name="hospital" placeholder="Hospital" onChange={handleChange} className="w-full border p-2" />
        <input name="specialty" placeholder="Specialty" onChange={handleChange} className="w-full border p-2" />
        <input name="licenseNumber" placeholder="License Number" onChange={handleChange} className="w-full border p-2" />

        <label className="block font-semibold">Upload Certifications (PDFs)</label>
        <input type="file" name="certifications" multiple accept="application/pdf" onChange={handleFileChange} className="w-full" />

        <label className="block font-semibold mt-2">Upload CV (PDF)</label>
        <input type="file" name="cvFile" accept="application/pdf" onChange={handleFileChange} className="w-full" />

        <button type="submit" disabled={loading} className="bg-blue-600 text-white p-2 w-full rounded">
          {loading ? "Kayıt Yapılıyor..." : "Kayıt Ol"}
        </button>
      </form>
    </div>
  );
}
