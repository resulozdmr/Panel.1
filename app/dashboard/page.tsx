'use client';

import { useEffect, useState, Suspense } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import Feed from "@/components/Feed";
import Education from "@/components/Education";
import Sidebar from "@/components/Sidebar";
import { ZoomIn, GraduationCap, Calendar } from "lucide-react";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const supabase = createBrowserSupabaseClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const metadata = session?.user?.user_metadata ?? {};
      setUser({
        id: session?.user?.id || "guest",
        email: session?.user?.email || "guest@drgulf.net",
        user_metadata: {
          firstName: metadata.firstName || "Guest",
          lastName: metadata.lastName || "User",
          username: metadata.username || "guestuser",
        },
      });
    };

    getUser();
  }, []);

  if (!user) return <div className="p-10">Loading...</div>;

  return (
    <div className="pt-20 min-h-screen overflow-y-auto bg-[#F4F2EE] relative">
      <div className="max-w-6xl mx-auto px-4 pb-10 flex flex-col lg:flex-row lg:gap-8">
        <div className="hidden lg:block lg:w-1/4 mb-4 lg:mb-0">
          <Sidebar user={user} />
        </div>

        {/* Feed bileşeni Suspense ile sarıldı */}
        <Suspense fallback={<div className="p-10">Loading Feed...</div>}>
          <div className="w-full lg:w-2/4 mb-4 lg:mb-0">
            <Feed user={user} />
          </div>
        </Suspense>

        <div className="hidden lg:block lg:w-1/4">
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col gap-6">
            <div className="flex flex-col items-center gap-4">
              <button
                className="flex items-center space-x-2 text-sm text-blue-500"
                onClick={() => window.open("zoommtg://zoom.us/start", "_blank")}
              >
                <ZoomIn size={16} />
                <span>Zoom</span>
              </button>
              <button className="flex items-center space-x-2 text-sm text-blue-500">
                <GraduationCap size={16} />
                <span>Education</span>
              </button>
              <button className="flex items-center text-sm text-blue-500">
                <Calendar size={16} />
              </button>
            </div>
            <Education />
          </div>
        </div>
      </div>

      {/* Mobil sabit dikey menü */}
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
