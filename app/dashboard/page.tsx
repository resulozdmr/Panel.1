import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import Education from "@/components/Education";
// Eğer bir Calendar bileşeniniz varsa import edin
// import Calendar from "@/components/Calendar";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// Mobilde göstereceğimiz ikonlar için
import Image from "next/image";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Örnek kullanıcı verisi
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
    <div className="pt-20 min-h-screen bg-[#F4F2EE] relative">
      {/* 3 kolon (lg: masaüstü) */}
      <div className="max-w-7xl mx-auto px-4 pb-10 flex flex-col lg:flex-row gap-8">
        
        {/* SOL SIDEBAR (sadece lg'de görünür) */}
        <div className="hidden lg:block lg:w-1/5">
          <Sidebar user={user} />
        </div>

        {/* ORTA ALAN - FEED (her boyutta) */}
        <div className="w-full lg:w-2/5">
          <Feed user={user} />
        </div>

        {/* SAĞ ALAN - Education + Calendar (sadece lg'de) */}
        <div className="hidden lg:block lg:w-2/5">
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col gap-6">
            {/* 
              Burada masaüstü için Zoom/Education/Calendar ikonlarını kaldırıyoruz. 
              Sadece Education + (varsa) Calendar gösterelim.
            */}

            {/* Education Bileşeni */}
            <Education />

            {/* Calendar Bileşeni (varsa) */}
            <div className="border border-gray-300 rounded p-4 text-center">
              <h2 className="font-bold mb-2">Takvim Bileşeni</h2>
              <p className="text-sm text-gray-500">Burada takvim görünecek...</p>
            </div>
          </div>
        </div>
      </div>

      {/* 
        MOBİLDE SAĞDA SABİT İKON MENÜSÜ:
        block lg:hidden -> mobilde görünsün, masaüstünde gizlensin
      */}
      <div className="fixed right-0 top-1/3 transform -translate-y-1/2 bg-white p-2 shadow-md rounded-l-lg block lg:hidden flex flex-col items-center gap-4">
        {/* Zoom */}
        <Link href="/zoom">
          <Image
            src="/zoom.png"
            alt="Zoom Logo"
            width={30}
            height={30}
            className="cursor-pointer"
          />
        </Link>
        {/* Education */}
        <Link href="/education">
          <Image
            src="/FileText.png"
            alt="Education Logo"
            width={30}
            height={30}
            className="cursor-pointer"
          />
        </Link>
        {/* Calendar */}
        <Link href="/calendar">
          <Image
            src="/calendar.png"
            alt="Calendar Logo"
            width={30}
            height={30}
            className="cursor-pointer"
          />
        </Link>
      </div>
    </div>
  );
}
