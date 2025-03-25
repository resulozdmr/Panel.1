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
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

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

  // Dışarı tıklanınca dropdown'ı kapat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        {/* Logo */}
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
          <div className="md:block hidden">
            <NavItems />
          </div>

          {/* Kullanıcı Bilgisi + Açılır Menü */}
          {userEmail && (
            <div
              className="relative flex flex-col items-center text-xs text-black font-semibold cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
              ref={dropdownRef}
            >
                <Image
                  src="/logo-2.png"
                  alt="Profile"
                  width={36}
                  height={36}
                  className="rounded-full"
                />

              
              <span className="mt-1">Profile</span>

              {showDropdown && (
                <div className="absolute top-12 right-0 bg-white shadow-md rounded-md p-2 text-sm w-40 z-50">
                  <Link href="/profile">
                    <div className="py-2 px-3 hover:bg-gray-100 rounded">Profile Settings</div>
                  </Link>
                  <button
                    onClick={async () => {
                      await supabase.auth.signOut();
                      router.push("/sign-in");
                    }}
                    className="py-2 px-3 text-red-500 hover:bg-gray-100 w-full text-left rounded"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
