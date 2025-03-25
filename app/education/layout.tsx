import { ReactNode } from "react";
import FloatingMenu from "@/components/FloatingMenu";

export const metadata = {
  title: "Education | Dr.Gulf",
};

export default function EducationLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-[#F4F2EE]">
      <main className="pt-8">{children}</main>
      <FloatingMenu />
    </div>
  );
}
