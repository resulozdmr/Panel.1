import Feed from "@/components/Feed";
import Education from "@/components/Education";
import Sidebar from "@/components/Sidebar";
// Eğer bir Calendar bileşeniniz varsa import edin.
// import Calendar from "@/components/Calendar";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import Image from "next/image";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Kullanıcı bilgisi (test amaçlı)
  const user = {
    id: session?.user?.id || "guest",
    email: session?.user?.email || "guest@drgulf.net",
    user_metadata: {
      firstName: session?.user?.user_metadata?.firstName || "Guest",
      lastName: session?.user?.user_metadata?.lastName || "User",
      username: session?.user?.user_metadata?.username || "guestuser",
    },
  };

  return (
    <div className="pt-20 min-h-screen bg-[#F4F2EE]">
      {/* 3 kolon yapısı (lg: masaüstü) */}
      <div className="max-w-7xl mx-auto px-4 pb-10 flex flex-col lg:flex-row gap-8">
        
        {/* SOL SIDEBAR (lg: block, mobil: hidden) */}
        <div className="hidden lg:block lg:w-1/5">
          <Sidebar user={user} />
        </div>

        {/* ORTA ALAN - FEED (her boyutta görünür) */}
        <div className="w-full lg:w-2/5">
          <Feed user={user} />
        </div>

        {/* SAĞ ALAN (lg: block, mobil: hidden) */}
        <div className="hidden lg:block lg:w-2/5">
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col gap-6">
            {/* Dikey ikon menüsü */}
            <div className="flex flex-col items-start gap-4">
              {/* Zoom */}
              <Link
                href="/zoom"
                className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md"
              >
                <Image
                  src="/zoom.png"
                  alt="Zoom Logo"
                  width={24}
                  height={24}
                  className="cursor-pointer"
                />
                <span className="text-sm font-semibold">Zoom</span>
              </Link>

              {/* Education */}
              <Link
                href="/education"
                className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md"
              >
                <Image
                  src="/FileText.png"
                  alt="Education Logo"
                  width={24}
                  height={24}
                  className="cursor-pointer"
                />
                <span className="text-sm font-semibold">Education</span>
              </Link>

              {/* Calendar */}
              <Link
                href="/calendar"
                className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md"
              >
                <Image
                  src="/calendar.png"
                  alt="Calendar Logo"
                  width={24}
                  height={24}
                  className="cursor-pointer"
                />
                <span className="text-sm font-semibold">Calendar</span>
              </Link>
            </div>

            {/* Education Bileşeni */}
            <Education />

            {/* Calendar Bileşeni - Örnek */}
            {/* Kendi takvim bileşeniniz varsa burada kullanabilirsiniz */}
            <div className="border border-gray-300 rounded p-4 text-center">
              <h2 className="font-bold mb-2">Takvim Bileşeni</h2>
              <p className="text-sm text-gray-500">
                Burada takvim görünecek...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
