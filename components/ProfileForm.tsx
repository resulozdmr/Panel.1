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
    const { error } = await supabase.storage.from("documents").upload(path, file, { upsert: true });
    if (error) throw error;
    const { data } = supabase.storage.from("documents").getPublicUrl(path);
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
        const path = `${userId}/avatar_${Date.now()}.${profileImage.name.split('.').pop()}`;
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
        setMessage("Hata oluştu.");
      } else {
        setCertifications(updatedCerts);
        setCvUrl(newCvUrl || null);
        setProfileImageUrl(newProfileImageUrl || null);
        setMessage("Bilgiler başarıyla güncellendi.");
      }
    } catch (err) {
      setMessage("Dosya yüklenirken hata oluştu.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {formData.full_name && (
        <h1 className="text-xl font-bold text-center">Welcome, {formData.full_name}</h1>
      )}

      {message && <p className="text-green-600 text-sm text-center">{message}</p>}

      {/* Profil Resmi */}
      <div className="flex items-center gap-4">
        {profileImageUrl ? (
          <img src={profileImageUrl} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
        ) : (
          <img src="/logo-2.png" alt="Default" className="w-16 h-16 rounded-full object-cover" />
        )}
        <input type="file" accept="image/*" onChange={handleProfileImageChange} />
      </div>

      {/* Kişisel Bilgiler */}
      <h2 className="text-lg font-semibold">Personal Info</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(formData).filter(([key]) => ["full_name", "birthdate", "phone_number"].includes(key)).map(([key, value]) => (
          <input
            key={key}
            name={key}
            type={key === "birthdate" ? "date" : "text"}
            placeholder={key.replace("_", " ")}
            value={value}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          />
        ))}
      </div>

      {/* Mesleki Bilgiler */}
      <h2 className="text-lg font-semibold mt-6">Professional Info</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(formData).filter(([key]) => !["full_name", "birthdate", "phone_number"].includes(key)).map(([key, value]) => (
          <input
            key={key}
            name={key}
            placeholder={key.replace("_", " ")}
            value={value}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          />
        ))}
      </div>

      {/* CV */}
      <div>
        <label className="font-semibold">Upload CV (PDF)</label>
        <input type="file" accept="application/pdf" onChange={handleCvChange} className="w-full mt-2" />
        {cvUrl && (
          <p className="text-sm mt-1">
            Current CV: {" "}
            <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              View
            </a>
          </p>
        )}
      </div>

      {/* Yeni Sertifika Yükle */}
      <div>
        <label className="font-semibold">Upload New Certificates (PDF)</label>
        <input type="file" accept="application/pdf" multiple onChange={handleCertFileChange} className="w-full mt-2" />
      </div>

      {/* Mevcut Sertifikalar */}
      <div>
        <label className="font-semibold">Uploaded Certificates:</label>
        <ul className="list-disc pl-5 text-sm text-blue-700 space-y-1">
          {certifications.map((url, index) => (
            <li key={index} className="flex justify-between items-center">
              <div className="flex items-center gap-2 max-w-[80%]">
                <img src="/pdf-icon.png" alt="PDF" className="w-4 h-4" />
                <a href={url} target="_blank" rel="noopener noreferrer" className="truncate">
                  Certificate {index + 1}
                </a>
              </div>
              <button
                type="button"
                onClick={() => handleCertDelete(url)}
                className="text-red-500 text-xs hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Kaydet */}
      <button
        type="submit"
        disabled={saving}
        className="bg-blue-600 hover:bg-blue-700 text-white p-2 w-full rounded-lg font-semibold"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}