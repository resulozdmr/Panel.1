import Feed from "@/components/Feed";
import Education from "@/components/Education";
import Sidebar from "@/components/Sidebar";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { ZoomIn, GraduationCap, Calendar } from "lucide-react"; // Ek Calendar ikonu

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
    <div className="pt-20 min-h-screen overflow-y-auto bg-[#F4F2EE] relative">
      <div className="max-w-6xl mx-auto px-4 pb-10 flex flex-col lg:flex-row lg:gap-8">
        {/* Sol Sidebar (sadece büyük ekranlarda) */}
        <div className="hidden lg:block lg:w-1/4 mb-4 lg:mb-0">
          <Sidebar user={user} />
        </div>

        {/* Orta alan - Feed */}
        <div className="w-full lg:w-2/4 mb-4 lg:mb-0">
          <Feed user={user} />
        </div>

        {/* Sağ alan (desktop) */}
        <div className="hidden lg:block lg:w-1/4">
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col gap-6">
            {/* Dikey ikon grubumuz */}
            <div className="flex flex-col items-center gap-4">
              {/* Zoom */}
              <button
                className="flex items-center space-x-2 text-sm text-blue-500"
                onClick={() => window.open("zoommtg://zoom.us/start", "_blank")}
              >
                <ZoomIn size={16} />
                <span>Zoom</span>
              </button>
              {/* Education */}
              <button className="flex items-center space-x-2 text-sm text-blue-500">
                <GraduationCap size={16} />
                <span>Education</span>
              </button>
              {/* Calendar (ikon olarak, alt yazı yok) */}
              <button className="flex items-center text-sm text-blue-500">
                <Calendar size={16} />
              </button>
            </div>
            {/* Aşağıya isterseniz Education bileşenini de ekleyebilirsiniz */}
            <Education />
          </div>
        </div>
      </div>

      {/* Mobilde: Sağ kenarda sabit dikey sütun */}
      <div className="lg:hidden">
        <div className="fixed top-16 right-0 h-[calc(100vh-4rem)] w-16 bg-white shadow-md flex flex-col items-center gap-6 py-4">
          <button
            className="text-blue-500"
            onClick={() => window.open("zoommtg://zoom.us/start", "_blank")}
          >
            <ZoomIn size={20} />
          </button>
          <button className="text-blue-500">
            <GraduationCap size={20} />
          </button>
          <button className="text-blue-500">
            <Calendar size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
