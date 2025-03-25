import Feed from "@/components/Feed";
import Education from "@/components/Education";
import Sidebar from "@/components/Sidebar";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { ZoomIn, GraduationCap, CalendarDays } from "lucide-react";

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
    <div className="pt-20 min-h-screen bg-[#F4F2EE]">
      {/* Ana container: Masaüstü görünümde 3 kolonlu yapı */}
      <div className="max-w-6xl mx-auto px-4 pb-10 flex flex-col lg:flex-row gap-8">
        
        {/* Sol Sidebar (yalnızca lg ve üzeri ekranlarda) */}
        <div className="hidden lg:block lg:w-1/4">
          <Sidebar user={user} />
        </div>

        {/* Orta alan - Feed (her ekranda görünür) */}
        <div className="w-full lg:w-2/4">
          <Feed user={user} />
        </div>

        {/* Sağ Sidebar (yalnızca lg ve üzeri ekranlarda) */}
        <div className="hidden lg:block lg:w-1/4">
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col gap-6">
            {/* Örnek butonlar */}
            <div className="flex items-center justify-between">
              <button className="flex items-center space-x-2 text-sm text-blue-500">
                <ZoomIn size={16} />
                <span>Zoom</span>
              </button>
              <button className="flex items-center space-x-2 text-sm text-blue-500">
                <GraduationCap size={16} />
                <span>Education</span>
              </button>
            </div>
            
            {/* Education bileşeni */}
            <Education />
          </div>
        </div>
      </div>

      {/* 
        Mobil ekranlar için sağda sabit (fixed) bir dikey menü:
        lg:hidden -> lg (1024px) üzeri ekranlarda gizle demektir.
      */}
      <div className="fixed right-0 top-1/4 transform -translate-y-1/2 lg:hidden flex flex-col gap-4 bg-white p-4 border border-gray-200 rounded-l-lg shadow-md">
        <button className="flex items-center space-x-2 text-blue-500">
          <ZoomIn size={20} />
          <span className="text-sm">Zoom</span>
        </button>
        <button className="flex items-center space-x-2 text-blue-500">
          <GraduationCap size={20} />
          <span className="text-sm">Education</span>
        </button>
        <button className="flex items-center space-x-2 text-blue-500">
          <CalendarDays size={20} />
          <span className="text-sm">Calendar</span>
        </button>
      </div>
    </div>
  );
}
