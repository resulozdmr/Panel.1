import Feed from "@/components/Feed";
import Education from "@/components/Education";
import News from "@/components/News";
import Sidebar from "@/components/Sidebar";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });

  // Session'ı al ama zorunlu değil
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Kullanıcı varsa onu al, yoksa anonim kullanıcı geç
  const user = session?.user ?? { email: "anonymous@drgulf.net", id: "guest" };

  return (
    <div className="pt-20">
      <div className="max-w-6xl mx-auto flex justify-between gap-8">
        <Sidebar user={user} />
        <Feed user={user} />
        <News />
        <Education />
      </div>
    </div>
  );
}
