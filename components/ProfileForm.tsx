"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";

interface Props {
  userId: string;
}

export default function ProfileForm({ userId }: Props) {
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    birthdate: "",
    graduation_year: "",
    university: "",
    hospital: "",
    specialty: "",
    license_number: "",
  });

  const [certifications, setCertifications] = useState<string[]>([]);
  const [newCertFiles, setNewCertFiles] = useState<FileList | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvUrl, setCvUrl] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await supabase
        .from("applications")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (data) {
        setFormData({
          full_name: data.full_name || "",
          phone_number: data.phone_number || "",
          birthdate: data.birthdate || "",
          graduation_year: data.graduation_year || "",
          university: data.university || "",
          hospital: data.hospital || "",
          specialty: data.specialty || "",
          license_number: data.license_number || "",
        });

        setCertifications(data.certification_urls || []);
        setCvUrl(data.cv_url || null);
        setProfileImageUrl(data.profile_image_url || null);
      }

      setLoading(false);
    };

    fetchProfile();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCertFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setNewCertFiles(e.target.files);
  };

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setCvFile(e.target.files[0]);
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setProfileImage(e.target.files[0]);
  };

  const uploadFile = async (file: File, path: string): Promise<string> => {
    const uploadResult = await supabase.storage.from("documents").upload(path, file, {
      cacheControl: "3600",
      upsert: true,
    });

    if (uploadResult.error) throw uploadResult.error;

    const { data } = supabase.storage.from("documents").getPublicUrl(path);
    if (!data?.publicUrl) throw new Error("Dosya URL'si alınamadı");
    return data.publicUrl;
  };

  const handleCertDelete = async (url: string) => {
    const filename = url.split("/").pop();
    if (!filename) return;

    await supabase.storage.from("documents").remove([`${userId}/${filename}`]);

    const updatedCerts = certifications.filter((cert) => cert !== url);
    setCertifications(updatedCerts);

    await supabase
      .from("applications")
      .update({ certification_urls: updatedCerts })
      .eq("user_id", userId);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      let uploadedCerts: string[] = [];

      if (newCertFiles) {
        for (const file of Array.from(newCertFiles)) {
          const path = `${userId}/cert_${Date.now()}_${file.name}`;
          const url = await uploadFile(file, path);
          uploadedCerts.push(url);
        }
      }

      let newCvUrl = cvUrl;
      if (cvFile) {
        const path = `${userId}/cv_${Date.now()}.pdf`;
        newCvUrl = await uploadFile(cvFile, path);
      }

      let newProfileImageUrl = profileImageUrl;
      if (profileImage) {
        const path = `${userId}/avatar_${Date.now()}.${profileImage.name.split(".").pop()}`;
        newProfileImageUrl = await uploadFile(profileImage, path);
      }

      const updatedCerts = [...certifications, ...uploadedCerts];

      const { error } = await supabase
        .from("applications")
        .update({
          ...formData,
          certification_urls: updatedCerts,
          cv_url: newCvUrl,
          profile_image_url: newProfileImageUrl,
        })
        .eq("user_id", userId);

      if (error) {
        setMessage("❌ Bir hata oluştu.");
      } else {
        setCertifications(updatedCerts);
        setCvUrl(newCvUrl || null);
        setProfileImageUrl(newProfileImageUrl || null);
        setMessage("✅ Bilgiler başarıyla güncellendi.");
      }
    } catch (err) {
      console.error("Yükleme hatası:", err);
      setMessage("❌ Dosya yüklenirken bir hata oluştu.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Yükleniyor...</p>;

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-3xl mx-auto px-4 py-6 bg-white shadow-md rounded-lg">
      {formData.full_name && (
        <h1 className="text-2xl font-bold text-center">Hoş geldiniz, {formData.full_name}</h1>
      )}

      {message && (
        <div className="text-center text-sm font-medium text-green-700 bg-green-100 py-2 rounded">
          {message}
        </div>
      )}

      {/* Profil Resmi */}
      <div className="flex items-center gap-4">
        {profileImage ? (
          <img
            src={URL.createObjectURL(profileImage)}
            alt="Preview"
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : profileImageUrl ? (
          <img
            src={profileImageUrl}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <img src="/logo-2.png" alt="Default" className="w-16 h-16 rounded-full object-cover" />
        )}
        <input type="file" accept="image/*" onChange={handleProfileImageChange} />
      </div>

      {/* Kişisel Bilgiler */}
      <h2 className="text-lg font-semibold">Kişisel Bilgiler</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {["full_name", "phone_number", "birthdate"].map((key) => (
          <input
            key={key}
            name={key}
            type={key === "birthdate" ? "date" : "text"}
            placeholder={key.replace("_", " ")}
            value={(formData as any)[key]}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        ))}
      </div>

      {/* Mesleki Bilgiler */}
      <h2 className="text-lg font-semibold mt-6">Mesleki Bilgiler</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {["graduation_year", "university", "hospital", "specialty", "license_number"].map((key) => (
          <input
            key={key}
            name={key}
            placeholder={key.replace("_", " ")}
            value={(formData as any)[key]}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        ))}
      </div>

      {/* CV */}
      <div>
        <label className="font-semibold">CV (PDF)</label>
        <input type="file" accept="application/pdf" onChange={handleCvChange} className="w-full mt-2" />
        {cvUrl && (
          <p className="text-sm mt-1">
            <a href={cvUrl} target="_blank" className="text-blue-700 underline">
              Mevcut CV'yi Görüntüle
            </a>
          </p>
        )}
      </div>

      {/* Yeni Sertifikalar */}
      <div>
        <label className="font-semibold">Yeni Sertifikalar (PDF)</label>
        <input type="file" accept="application/pdf" multiple onChange={handleCertFileChange} className="w-full mt-2" />
      </div>

      {/* Sertifika Listesi */}
      {certifications.length > 0 && (
        <div>
          <label className="font-semibold block mb-2">Yüklenen Sertifikalar</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {certifications.map((url, index) => (
              <div
                key={index}
                className="flex items-center justify-between border rounded p-2 shadow-sm bg-gray-50"
              >
                <a href={url} target="_blank" className="text-blue-600 truncate max-w-[80%] text-sm">
                  Sertifika {index + 1}
                </a>
                <button
                  type="button"
                  onClick={() => handleCertDelete(url)}
                  className="text-red-500 text-xs hover:underline"
                >
                  Sil
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Kaydet Butonu */}
      <button
        type="submit"
        disabled={saving}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 w-full rounded font-semibold transition"
      >
        {saving ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
      </button>
    </form>
  );
}
