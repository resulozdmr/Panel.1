"use client";
import React, { useState } from "react";
import ProfilePhoto from "./shared/ProfilePhoto";
import { Input } from "./ui/input";
import { PostDialog } from "./PostDialog";
import Link from "next/link";
import Image from "next/image";

const PostInput = ({ user }: { user: any }) => {
  const [open, setOpen] = useState<boolean>(false);

  const inputHandler = () => {
    setOpen(true);
  };

  return (
    <div className="flex justify-between gap-[8%]">
      {/* Post Input */}
      <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-sm flex-1 max-w-[60%]">
        <div className="flex items-center gap-3">
          <ProfilePhoto src={user?.imageUrl} />
          <Input
            type="text"
            placeholder="Start a post"
            className="rounded-full hover:bg-gray-100 h-12 cursor-pointer"
            onClick={inputHandler}
          />
          <PostDialog setOpen={setOpen} open={open} src={user?.imageUrl} />
        </div>
      </div>

      {/* Education, Zoom, and Calendar Links - Only visible on mobile */}
      <div className="flex flex-col gap-4 sm:flex md:hidden pr-4">
        {/* Education Link */}
        <Link href="/education" className="flex flex-col items-center cursor-pointer pr-[2px]">
          <Image
            src="/FileText.png"
            alt="Education Logo"
            width={35}
            height={25}
            className="rounded-md"
          />
        </Link>

        {/* Zoom Link */}
        <Link
          href="#"
          className="flex flex-col items-center cursor-pointer pr-[2px]"
          onClick={() => window.open("zoommtg://zoom.us/start", "_blank")}
        >
          <Image
            src="/zoom.png"
            alt="Zoom Logo"
            width={50}
            height={40}
            className="rounded-md"
          />
        </Link>

        {/* Calendar Link */}
        <Link
          href="/calendar"
          className="flex flex-col items-center cursor-pointer pr-[2px]"
        >
          <Image
            src="/calendar.png"
            alt="Calendar Logo"
            width={35}
            height={25}
            className="rounded-md"
          />
        </Link>
      </div>
    </div>
  );
};

export default PostInput;