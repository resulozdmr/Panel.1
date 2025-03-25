"use client"; 
// Bu direktif tüm dosyayı client component yapar. 
// Sunucu tarafı logic'i minimal tutmak isterseniz, 
// Supabase session'ı getirmek için server component mantığını 
// ayırmanız gerekebilir. Ama bu örnekte her şeyi tek dosyada tutuyoruz.

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import Education from "@/components/Education";
// import Calendar from "@/components/Calendar";

import Image from "next/image";
import Link from "next/link";
import { LogOut } from "lucide-react";

export default function DashboardPage() {
  // Supabase client (client component olduğu için bu şekilde kullanıyoruz)
  const supabase = createClientComponentClient();
  const router = useRouter();

  // Kullanıcı oturum bilgisini state'e alalım
  const [user, setUser] = useState<any>(null);

  // Bileşen ilk yüklendiğinde session bilgisini çek
  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        // Oturum yoksa anasayfaya veya login'e yönlendirebilirsiniz
        router.push("/");
      } else {
        // User verisini state'e at
        setUser({
          id: session.user.id,
          email: session.user.email,
          user_metadata: {
            firstName: session.user.user_metadata?.firstName || "Guest",
            lastName: session.user.user_metadata?.lastName || "User",
            username: session.user.user_metadata?.username || "guestuser",
          },
        });
      }
    };

    getSession();
  }, [supabase, router]);

  // Logout fonksiyonu
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push("/");
    } else {
      console.error("Error signing out:", error);
    }
  };

  // user henüz yüklenmediyse
  if (!user) {
    return <div className="pt-20 text-center">Loading...</div>;
  }

  return (
    <div className="pt-20 min-h-screen bg-[#F4F2EE] relative">
      {/* Masaüstü için 3 kolonlu yapı (lg >= 1024px) */}
      <div className="max-w-7xl mx-auto px-4 pb-10 flex flex-col lg:flex-row gap-8">
        {/* SOL SIDEBAR (lg'de) */}
        <div className="hidden lg:block lg:w-1/5">
          <Sidebar user={user} />
        </div>

        {/* ORTA ALAN - FEED */}
        <div className="w-full lg:w-2/5">
          <Feed user={user} />
        </div>

        {/* SAĞ ALAN (lg'de) */}
        <div className="hidden lg:block lg:w-1/4 ml-auto">
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col gap-6">
            <Education />
            {/* <Calendar /> */}
          </div>
        </div>
      </div>

      {/* MOBİLDE: Sağ tarafta tam yükseklikte panel (block lg:hidden) */}
      <div className="block lg:hidden fixed top-0 right-0 h-screen w-[80px] bg-white shadow-lg">
        {/* İçerik dikey yerleşim: Üstte ikonlar, altta logout */}
        <div className="flex flex-col h-full justify-between items-center py-8">
          {/* Üst kısımdaki ikonlar */}
          <div className="flex flex-col items-center gap-6">
            <Link href="/zoom">
              <Image
                src="/zoom.png"
                alt="Zoom Logo"
                width={40}
                height={40}
                className="cursor-pointer"
              />
            </Link>
            <Link href="/education">
              <Image
                src="/FileText.png"
                alt="Education Logo"
                width={40}
                height={40}
                className="cursor-pointer"
              />
            </Link>
            <Link href="/calendar">
              <Image
                src="/calendar.png"
                alt="Calendar Logo"
                width={40}
                height={40}
                className="cursor-pointer"
              />
            </Link>
          </div>

          {/* En alttaki Logout butonu */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white px-3 py-2 rounded"
          >
            <LogOut size={16} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
