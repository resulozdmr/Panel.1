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

  /** Input değişikliklerini yakala */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /** Dosya yükleme işlemi */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (!files) return;
    if (name === "certifications") {
      setFormData((prev) => ({
        ...prev,
        certifications: Array.from(files),
      }));
    } else {
      if (files[0]) {
        setFormData((prev) => ({ ...prev, [name]: files[0] }));
      }
    }
  };

  /** 60 saniyelik geri sayım başlat */
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

  /** Kayıt işlemi */
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      await signUp.create({
        emailAddress: formData.email.toLowerCase(),
        password: formData.password,
        firstName:
          formData.firstName.charAt(0).toUpperCase() +
          formData.firstName.slice(1),
        lastName:
          formData.lastName.charAt(0).toUpperCase() +
          formData.lastName.slice(1),
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
        },
      });

      // Email doğrulama adımını başlat
      await signUp.prepareEmailAddressVerification();
      setStep("verify");
      startResendTimer();
    } catch (error: any) {
      console.error("Signup error:", error);
      setErrorMessage(
        error.errors?.[0]?.message || "An error occurred during signup."
      );
    } finally {
      setLoading(false);
    }
  };

  /** Email doğrulama işlemi */
  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (completeSignUp.status === "complete") {
        // Kullanıcı başarıyla doğrulandı, aktif oturumu başlat:
        await setActive({ session: completeSignUp.createdSessionId });
        // İsteğe bağlı: Kullanıcıyı yönlendirebilir veya başarı mesajı gösterebilirsiniz.
      }
    } catch (error: any) {
      console.error("Verification error:", error);
      setErrorMessage(
        error.errors?.[0]?.message || "Verification failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 shadow-xl rounded-lg w-full max-w-lg">
        <div className="flex justify-center mb-6">
          <Image src="/logo.png" alt="Dr. Gulf Logo" width={150} height={150} />
        </div>

        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-2 rounded-lg mb-4">
            {errorMessage}
          </div>
        )}

        {step === "register" && (
          <form onSubmit={handleSignUp}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">
                First Name
              </label>
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
              <label className="block text-gray-700 font-semibold">
                Last Name
              </label>
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
              <label className="block text-gray-700 font-semibold">
                Email
              </label>
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
              <label className="block text-gray-700 font-semibold">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="border border-gray-300 rounded-lg p-2 w-full"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Birthdate */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">
                Birthdate
              </label>
              <input
                type="date"
                name="birthdate"
                className="border border-gray-300 rounded-lg p-2 w-full"
                value={formData.birthdate}
                onChange={handleChange}
                required
              />
            </div>

            {/* Graduation Year */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">
                Graduation Year
              </label>
              <select
                name="graduationYear"
                className="border border-gray-300 rounded-lg p-2 w-full"
                value={formData.graduationYear}
                onChange={handleChange}
                required
              >
                {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map(
                  (year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">
                Phone Number
              </label>
              <div className="flex">
                <select
                  name="countryCode"
                  className="border border-gray-300 rounded-lg p-2"
                  value={formData.countryCode}
                  onChange={handleChange}
                  required
                >
                    <option value="+90">🇹🇷 Turkey (+90)</option>
                    <option value="+1">🇺🇸 USA (+1)</option>
                    <option value="+44">🇬🇧 UK (+44)</option>
                    <option value="+33">🇫🇷 France (+33)</option>
                    <option value="+49">🇩🇪 Germany (+49)</option>
                    <option value="+39">🇮🇹 Italy (+39)</option>
                    <option value="+34">🇪🇸 Spain (+34)</option>
                    <option value="+81">🇯🇵 Japan (+81)</option>
                    <option value="+86">🇨🇳 China (+86)</option>
                    <option value="+91">🇮🇳 India (+91)</option>
                    <option value="+1">🇨🇦 Canada (+1)</option>
                    <option value="+61">🇦🇺 Australia (+61)</option>
                    <option value="+55">🇧🇷 Brazil (+55)</option>
                    <option value="+7">🇷🇺 Russia (+7)</option>
                    <option value="+82">🇰🇷 South Korea (+82)</option>
                    <option value="+52">🇲🇽 Mexico (+52)</option>
                    <option value="+971">🇦🇪 UAE (+971)</option>
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

            {/* Certifications */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">
                Certifications (Upload)
              </label>
              <input
                type="file"
                name="certifications"
                multiple
                onChange={handleFileChange}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>

            {/* CV File */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">
                Upload CV
              </label>
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
        )}

        {step === "verify" && (
          <form onSubmit={handleVerify}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">
                Verification Code
              </label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-lg p-2 mt-4 w-full"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify Email"}
            </button>
            <div className="mt-4">
              {canResendCode ? (
                <button
                  type="button"
                  className="text-blue-600 underline"
                  onClick={async () => {
                    try {
                      await signUp.prepareEmailAddressVerification();
                      startResendTimer();
                    } catch (error: any) {
                      setErrorMessage(
                        error.errors?.[0]?.message || "Error resending code."
                      );
                    }
                  }}
                >
                  Resend Code
                </button>
              ) : (
                <span className="text-gray-500">Resend in {timer} sec</span>
              )}
            </div>
          </form>
        )}

        {/* CAPTCHA widget için yer */}
        <div id="clerk-captcha" className="mt-4" />
      </div>
    </div>
  );
};

export default SignUpPage;
