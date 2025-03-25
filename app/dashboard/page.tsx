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
      {/* Masaüstü için 3 kolonlu yapı */}
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
        <div className="hidden lg:block lg:w-1/4 ml-auto">
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col gap-6">
            {/* Masaüstünde sağ bölümde artık ikon menüsü kaldırıldı */}
            <Education />

            {/* Calendar Bileşeni (varsa) */}
            <div className="border border-gray-300 rounded p-4 text-center">
              <h2 className="font-bold mb-2">Takvim Bileşeni</h2>
              <p className="text-sm text-gray-500">Burada takvim görünecek...</p>
            </div>
          </div>
        </div>
      </div>

      {/* MOBİLDE: Sağdaki sabit ikon menüsü */}
      <div className="fixed right-4 top-1/3 transform -translate-y-1/2 bg-white p-3 shadow-lg rounded-l-lg block lg:hidden flex flex-col items-center gap-4">
        {/* Zoom */}
        <Link href="/zoom">
          <Image
            src="/zoom.png"
            alt="Zoom Logo"
            width={40}
            height={40}
            className="cursor-pointer"
          />
        </Link>
        {/* Education */}
        <Link href="/education">
          <Image
            src="/FileText.png"
            alt="Education Logo"
            width={40}
            height={40}
            className="cursor-pointer"
          />
        </Link>
        {/* Calendar */}
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
    </div>
  );
}
