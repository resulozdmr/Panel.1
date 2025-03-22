
import Feed from "@/components/Feed";
import Education from "@/components/News";
import News from "@/components/News";
import Sidebar from "@/components/Sidebar";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  // Kullanıcıyı Clerk'ten çek
  const user = await currentUser();

  // Eğer kullanıcı giriş yapmamışsa, giriş sayfasına yönlendir
  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="pt-20">
      <div className="max-w-6xl mx-auto flex justify-between gap-8">
        {/* Sidebar */}
        <Sidebar user={user} />
        {/* Feed */}
        <Feed user={user} />
        {/* News */}
        <News />
                {/* News */}
                <Education />
      </div>
    </div>
  );
}
