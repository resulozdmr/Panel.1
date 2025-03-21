"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import Image from "next/image";

const SignUpPage = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

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
    // Sertifikalar için artık birden fazla dosya eklenebilsin:
    certifications: [] as File[],
    hospital: "",
    specialty: "",
    licenseNumber: "",
    cvFile: null as File | null,
  });

  const [verificationCode, setVerificationCode] = useState<string>("");
  const [step, setStep] = useState<"register" | "verify">("register");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60);
  const [canResendCode, setCanResendCode] = useState<boolean>(false);

  if (!isLoaded) return <div className="text-center">Loading...</div>;

  /** 📌 Input değişikliklerini yakala */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /** 📌 Dosya yükleme işlemi (Sertifikalar & CV) */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (!files) return;
    
    if (name === "certifications") {
      // Sertifikalar için seçilen tüm dosyaları array olarak al:
      setFormData((prev) => ({ ...prev, certifications: Array.from(files) }));
    } else {
      // Diğer dosya alanları için ilk dosyayı al:
      if (files[0]) {
        setFormData((prev) => ({ ...prev, [name]: files[0] }));
      }
    }
  };

  /** 📌 Kayıt İşlemi */
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      await signUp.create({
        emailAddress: formData.email.toLowerCase(),
        password: formData.password,
        firstName: formData.firstName.charAt(0).toUpperCase() + formData.firstName.slice(1),
        lastName: formData.lastName.charAt(0).toUpperCase() + formData.lastName.slice(1),
      });

      await signUp.update({
        unsafeMetadata: {
          birthdate: formData.birthdate,
          graduationYear: formData.graduationYear,
          phoneNumber: formData.countryCode + formData.phoneNumber,
          university: formData.university,
          hospital: formData.hospital,
          specialty: formData.specialty,
          licenseNumber: formData.licenseNumber,
        } as Record<string, unknown>,
      });

      await signUp.prepareEmailAddressVerification();
      setStep("verify");
      startResendTimer();
    } catch (error: any) {
      console.error("Signup error:", error);
      setErrorMessage(error.errors?.[0]?.message || "An error occurred during signup.");
    } finally {
      setLoading(false);
    }
  };

  /** 📌 60 saniyelik geri sayım başlatma */
  const startResendTimer = () => {
    setCanResendCode(false);
    setTimer(60);

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResendCode(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 shadow-xl rounded-lg w-full max-w-lg">
        <div className="flex justify-center mb-6">
          <Image src="/logo.png" alt="Dr. Gulf Logo" width={150} height={150} />
        </div>

        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-2 rounded-lg mb-4">{errorMessage}</div>
        )}

        {step === "register" ? (
          <form onSubmit={handleSignUp}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">First Name</label>
              <input
                type="text"
                name="firstName"
                className="border border-gray-300 rounded-lg p-2 w-full"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="border border-gray-300 rounded-lg p-2 w-full"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Email</label>
              <input
                type="email"
                name="email"
                className="border border-gray-300 rounded-lg p-2 w-full"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Password</label>
              <input
                type="password"
                name="password"
                className="border border-gray-300 rounded-lg p-2 w-full"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Doğum Tarihi */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Birthdate</label>
              <input
                type="date"
                name="birthdate"
                className="border border-gray-300 rounded-lg p-2 w-full"
                value={formData.birthdate}
                onChange={handleChange}
                required
              />
            </div>

            {/* Mezuniyet Yılı */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Graduation Year</label>
              <select
                name="graduationYear"
                className="border border-gray-300 rounded-lg p-2 w-full"
                value={formData.graduationYear}
                onChange={handleChange}
                required
              >
                {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Telefon Numarası */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Phone Number</label>
              <div className="flex">
                <select
                  name="countryCode"
                  className="border border-gray-300 rounded-lg p-2"
                  value={formData.countryCode}
                  onChange={handleChange}
                  required
                >
                  <option value="+90">🇹🇷 +90</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                </select>
                <input
                  type="tel"
                  name="phoneNumber"
                  className="border border-gray-300 rounded-lg p-2 w-full"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Sertifikalar (Birden fazla dosya seçimine izin veriliyor) */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Certifications (Upload)</label>
              <input
                type="file"
                name="certifications"
                multiple
                onChange={handleFileChange}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>

            {/* CV Dosyası */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Upload CV</label>
              <input
                type="file"
                name="cvFile"
                onChange={handleFileChange}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white rounded-lg p-2 mt-4 w-full"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        ) : null}

        {/* Smart CAPTCHA widget'ının başlatılabilmesi için gerekli DOM elemanı */}
        <div id="clerk-captcha" className="mt-4" />
      </div>
    </div>
  );
};

export default SignUpPage;
