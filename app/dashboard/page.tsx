import Feed from "@/components/Feed";
import Education from "@/components/Education";
import News from "@/components/News";
import Sidebar from "@/components/Sidebar";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  // Supabase client'ı oluştur
  const supabase = createServerComponentClient({ cookies });

  // Session'ı al
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Eğer giriş yapılmamışsa login sayfasına yönlendir
  if (!session) {
    redirect("/sign-in");
  }

  // Kullanıcı bilgisi
  const user = session.user;

  return (
    <div className="pt-20">
      <div className="max-w-6xl mx-auto flex justify-between gap-8">
        {/* Sidebar */}
        <Sidebar user={user} />
        {/* Feed */}
        <Feed user={user} />
        {/* News */}
        <News />
        {/* Education */}
        <Education />
      </div>
    </div>
  );
}
