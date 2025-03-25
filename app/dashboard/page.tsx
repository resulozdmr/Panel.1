import Feed from "@/components/Feed";
import Education from "@/components/Education";
import News from "@/components/News";
import Sidebar from "@/components/Sidebar";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Test için oturum kontrolünü geçici olarak devre dışı bırakabilirsin
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
    <div className="pt-20 h-screen overflow-y-auto bg-[#F4F2EE]">
      <div className="max-w-6xl mx-auto flex justify-between gap-8 px-4 pb-10">
        {/* Sol Sidebar */}
        <Sidebar user={user} />

        {/* Orta alan - Feed */}
        <Feed user={user} />

        {/* Sağ Sidebar */}
        <div className="hidden md:block w-[20%]">
          <Education />
        </div>
      </div>
    </div>
  );
}
