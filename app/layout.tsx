import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dr. Gulf Panel",
  description: "User management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Navbar />
        <div className="md:bg-[#F4F2EE] flex-1 w-full">
          <main className="max-w-6xl mx-auto">
            {children}
            <Toaster position="top-right" />
          </main>
        </div>
      </body>
    </html>
  );
}
