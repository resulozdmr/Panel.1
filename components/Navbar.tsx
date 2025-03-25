"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import NavItems from "./NavItems";
import supabase from "@/lib/supabaseClient";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Dış tıklamaları dinleyerek dropdown'u kapatma
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/sign-in");
  };

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

          {/* Sağ Kısım - Profil İkonu */}
          {userEmail && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="focus:outline-none"
              >
                <Image
                  src="/logo-2.png"
                  alt="Profile Icon"
                  width={36}
                  height={36}
                  className="cursor-pointer rounded-full"
                />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
                  <Link
                    href="/profile-settings"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Profile Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-100"
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
