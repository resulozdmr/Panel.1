"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";

export default function CompleteProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    university: "",
    graduationYear: "",
    hospital: "",
    specialty: "",
    licenseNumber: "",
    certifications: [] as File[],
    cvFile: null as File | null,
  });
  const [loading, setLoading] = useState(false);
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

  const uploadFile = async (file: File, path: string) => {
    const { error } = await supabase.storage.from("documents").upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from("documents").getPublicUrl(path);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated.");

      const userId = user.id;

      let cvUrl = null;
      if (formData.cvFile) {
        const path = `${userId}/cv_${Date.now()}.pdf`;
        cvUrl = await uploadFile(formData.cvFile, path);
      }

      const certUrls = [];
      for (const file of formData.certifications) {
        const path = `${userId}/cert_${Date.now()}_${file.name}`;
        const url = await uploadFile(file, path);
        certUrls.push(url);
      }

      const { error: userError } = await supabase.from("users").update({
        university: formData.university,
        graduation_year: formData.graduationYear,
        hospital: formData.hospital,
        specialty: formData.specialty,
        license_number: formData.licenseNumber,
        cv_url: cvUrl,
      }).eq("user_id", userId);

      if (userError) throw new Error(userError.message);

      for (const certUrl of certUrls) {
        await supabase.from("documents").insert({
          user_id: userId,
          file_name: "Certification",
          file_url: certUrl,
        });
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow rounded-lg">
      <img src="/logo.png" alt="DrGulf Logo" className="mx-auto mb-4 h-20" />
      <h2 className="text-center text-lg font-semibold mb-6">
        Complete your profile to continue
      </h2>

      {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="university" placeholder="University" required onChange={handleChange} className="w-full border p-2 rounded-lg text-sm" />

        <select name="graduationYear" required value={formData.graduationYear} onChange={handleChange} className="w-full border p-2 rounded-lg text-sm">
          <option value="">Select Graduation Year</option>
          {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <input name="hospital" placeholder="Hospital" required onChange={handleChange} className="w-full border p-2 rounded-lg text-sm" />
        <input name="specialty" placeholder="Specialty" required onChange={handleChange} className="w-full border p-2 rounded-lg text-sm" />
        <input name="licenseNumber" placeholder="License Number" required onChange={handleChange} className="w-full border p-2 rounded-lg text-sm" />

        <label className="block font-semibold">Upload Certifications (PDFs)</label>
        <input type="file" name="certifications" multiple accept="application/pdf" onChange={handleFileChange} className="w-full text-sm" required />

        <label className="block font-semibold mt-2">Upload CV (PDF)</label>
        <input type="file" name="cvFile" accept="application/pdf" onChange={handleFileChange} className="w-full text-sm" required />

        <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 transition text-white p-2 w-full rounded-lg font-semibold">
          {loading ? "Submitting..." : "Complete Profile"}
        </button>
      </form>
    </div>
  );
}
