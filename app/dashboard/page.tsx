import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import Education from "@/components/Education";

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
            {/* Sağ bölümde Education */}
            <Education />

            {/* Calendar Bileşeni (varsa) */}

          </div>
        </div>
      </div>
    </div>
  );
}
