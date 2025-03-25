"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";
import ProfileForm from "@/components/ProfileForm";

export default function ProfilePage() {
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user?.id) {
        setUserId(data.session.user.id);
      } else {
        router.push("/sign-in");
      }
    };

    fetchUser();
  }, [router]);

  if (!userId) return <p className="text-center mt-20">Yükleniyor...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Profile</h1>
      <ProfileForm userId={userId} />
    </div>
  );
}
