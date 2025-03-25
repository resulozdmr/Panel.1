import Feed from "@/components/Feed";
import Education from "@/components/Education";
import News from "@/components/News";
import Sidebar from "@/components/Sidebar";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { ZoomIn, GraduationCap } from "lucide-react"; // Örnek ikonlar

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Test için oturum kontrolünü geçici olarak devre dışı bırakabilirsiniz
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
    <div className="pt-20 min-h-screen overflow-y-auto bg-[#F4F2EE]">
      <div className="max-w-6xl mx-auto px-4 pb-10 flex flex-col lg:flex-row lg:gap-8">
        
        {/* Sol Sidebar */}
        <div className="lg:w-1/4 mb-4 lg:mb-0">
          <Sidebar user={user} />
        </div>

        {/* Orta alan - Feed */}
        <div className="w-full lg:w-2/4 mb-4 lg:mb-0">
          <Feed user={user} />
        </div>

        {/* Sağ alan (Zoom + Education ikonları, News, Education) */}
        <div className="w-full lg:w-1/4">
          {/* Tek bir beyaz konteyner içinde dikey akış */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col gap-6">
            {/* Zoom + Education ikonları (örnek) */}
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
    </div>
  );
}
