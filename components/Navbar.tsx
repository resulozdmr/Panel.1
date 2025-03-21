"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import SearchInput from "./SearchInput";
import NavItems from "./NavItems";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link"; // Next.js navigation component

const Navbar = () => {
  const pathname = usePathname();

  // Hide Navbar on sign-in and sign-up pages
  if (pathname === "/sign-in" || pathname === "/sign-up") {
    return null;
  }

  return (
    <div className="fixed w-full bg-white z-50 shadow-sm">
      <div className="flex items-center max-w-6xl justify-between h-16 mx-auto px-3">
        <div className="flex items-center gap-2">
          {/* Logo */}
          <Link href="/">
            <Image
              src={"/logo.png"}
              alt="Logo"
              width={100}
              height={75}
              className="cursor-pointer"
            />
          </Link>
          <div className="md:block hidden">
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="md:block hidden">
            <NavItems />
          </div>

          <div>
            <SignedIn>
              <div className="flex flex-col items-center">
                <UserButton />
                <span className="text-xs mt-1 text-black font-semibold">Profile</span> {/* ✅ Profile Text in black */}
              </div>
            </SignedIn>

            <SignedOut>
              <Button className="rounded-full" variant={"secondary"}>
                <SignInButton />
              </Button>
            </SignedOut>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;