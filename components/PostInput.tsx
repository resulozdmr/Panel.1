"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { PostDialog } from "./PostDialog";
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
          {/* DrGulf Logo - Yuvarlak profil tarzı */}
          <div className="relative w-10 h-10">
            <Image
              src="/logo.png"
              alt="DrGulf Logo"
              fill
              className="rounded-full object-cover"
            />
          </div>

          {/* Start Post Input */}
          <Input
            type="text"
            placeholder="Start a post"
            className="w-full rounded-full hover:bg-gray-100 h-12 cursor-pointer"
            onClick={inputHandler}
          />

          {/* Post Dialog */}
          <PostDialog setOpen={setOpen} open={open} src="/logo.png" />
        </div>
      </div>
    </div>
  );
};

export default PostInput;
