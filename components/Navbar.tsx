"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import NavItems from "./NavItems";
import supabase from "@/lib/supabaseClient";
import Link from "next/link";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) {
        setUserEmail(data.session.user.email ?? null);
      } else {
        router.push("/sign-in");
      }
    };
    getSession();
  }, [router]);

  // Navbar gizli sayfalar için
  if (
    pathname === "/sign-in" ||
    pathname === "/sign-up" ||
    pathname === "/verify-email"
  ) {
    return null;
  }

  return (
    <div className="fixed w-full bg-white z-50 shadow-sm">
      <div className="flex items-center max-w-6xl justify-between h-16 mx-auto px-3">
        {/* Sol Kısım - Logo (tıklandığında /dashboard) */}
        <div className="flex items-center gap-2">
          <Link href="/dashboard">
            <Image
              src={"/logo.png"}
              alt="Logo"
              width={100}
              height={75}
              className="cursor-pointer"
            />
          </Link>
        </div>

        <div className="flex items-center gap-5">
          {/* Masaüstünde NavItems gösteriliyor */}
          <div className="md:block hidden">
            <NavItems />
          </div>

          {/* Sağ Kısım - Artık kullanıcı profil dropdown'u yerine de logomuzu gösteriyoruz */}
          {userEmail && (
            <div className="flex items-center">
              <Link href="/dashboard">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={36}
                  height={36}
                  className="cursor-pointer"
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
