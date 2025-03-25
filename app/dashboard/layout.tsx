// app/dashboard/layout.tsx

import { ReactNode } from "react";
import FloatingMenu from "@/components/FloatingMenu";
export const metadata = {
  title: "Dr.Gulf Dashboard",
  description: "Doctor network dashboard",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-[#F4F2EE]">
      {/* Diğer layout bileşenleri eklemek istersen buraya (örn. Topbar) */}

      {/* Sayfa içeriği */}
      <main className="pt-20">
        {children}
      </main>

      {/* Sağdan kayan mobil menü */}
      <FloatingMenu />
    </div>
  );
}
