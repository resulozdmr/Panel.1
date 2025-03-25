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
    <div className="flex items-center justify-between gap-4">
      {/* Post Input Alanı */}
      <div className="flex-1 bg-white p-4 border border-gray-300 rounded-lg shadow-sm">
        <div className="flex items-center gap-3">
          <ProfilePhoto src={user?.imageUrl} />
          <Input
            type="text"
            placeholder="Start a post"
            className="w-full rounded-full hover:bg-gray-100 h-12 cursor-pointer"
            onClick={inputHandler}
          />
          <PostDialog setOpen={setOpen} open={open} src={user?.imageUrl} />
        </div>
      </div>

      {/* Mobilde Görünen İkonlar */}
      <div className="md:hidden">
        <div className="bg-white p-2 border border-gray-300 rounded-md shadow-sm flex flex-col items-center gap-2">
          {/* Education Link */}
          <Link href="/education">
            <Image
              src="/FileText.png"
              alt="Education Logo"
              width={35}
              height={25}
              className="cursor-pointer"
            />
          </Link>

          {/* Zoom Link */}
          <Link
            href="#"
            onClick={() => window.open("zoommtg://zoom.us/start", "_blank")}
          >
            <Image
              src="/zoom.png"
              alt="Zoom Logo"
              width={50}
              height={40}
              className="cursor-pointer"
            />
          </Link>

          {/* Calendar Link */}
          <Link href="/calendar">
            <Image
              src="/flaticon_calendar.png"
              alt="Calendar Logo"
              width={35}
              height={25}
              className="cursor-pointer"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostInput;
