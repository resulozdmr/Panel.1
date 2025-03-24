"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkProfile = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        router.push("/sign-in");
        return;
      }

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("user_id", session.user.id)
        .single();

      // Eğer kullanıcı henüz profilini tamamlamadıysa yönlendir
      if (error || !data || !data.cv_url || !data.specialty) {
        router.push("/complete-profile");
        return;
      }

      setChecking(false);
    };

    checkProfile();
  }, [router]);

  if (checking) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-sm">Kontrol ediliyor...</p>
      </div>
    );
  }

  return <>{children}</>;
}
