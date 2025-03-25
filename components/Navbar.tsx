"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import NavItems from "./NavItems";
import supabase from "@/lib/supabaseClient";
import Link from "next/link";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Navbar gizlensin mi?
  if (pathname === "/sign-in" || pathname === "/sign-up" || pathname === "/verify-email") {
    return null;
  }

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session?.user) {
        setUserEmail(data.session.user.email ?? null);
      } else {
        router.push("/sign-in"); // Giriş yapılmamışsa yönlendir
      }
    };
    getSession();
  }, [router]);

  return (
    <div className="fixed w-full bg-white z-50 shadow-sm">
      <div className="flex items-center max-w-6xl justify-between h-16 mx-auto px-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/">
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
          <div className="md:block hidden">
            <NavItems />
          </div>

          {/* Kullanıcı Bilgisi */}
          {userEmail && (
            <div className="flex flex-col items-center text-xs text-black font-semibold">
              <Image
                src="/avatar-placeholder.png" // İstersen kullanıcıdan al
                alt="Profile"
                width={36}
                height={36}
                className="rounded-full"
              />
              <span className="mt-1">Profile</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
