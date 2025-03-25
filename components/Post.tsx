"use client";

import React from "react";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { IPostDocument } from "@/models/post.model";
import PostContent from "./PostContent";
import SocialOptions from "./SocialOptions";
import ReactTimeago from "react-timeago";
import { deletePostAction } from "@/lib/serveractions";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

const Post = ({ post }: { post: IPostDocument }) => {
  const { user } = useUser();

  // Sadece info@drgulf.net mail adresine sahip kullanıcı post silebilsin
  const isDrGulf = user?.emailAddresses?.[0]?.emailAddress === "info@drgulf.net";

  return (
    <div className="bg-white my-2 mx-2 md:mx-0 rounded-lg border border-gray-300 overflow-hidden">
      {/* ÜST BİLGİ */}
      <div className="flex gap-2 p-4">
        {/* Sabit logo */}
        <Image
          src="/logo.png"
          alt="DrGulf Logo"
          width={40}
          height={40}
          className="rounded-full"
        />

        <div className="flex items-center justify-between w-full">
          <div>
            <h1 className="text-sm font-bold flex items-center gap-2">
              DrGulf
              {isDrGulf && (
                <Badge variant="secondary" className="ml-1">
                  You
                </Badge>
              )}
            </h1>
            <p className="text-xs text-gray-500">Healthcare Network</p>
            <p className="text-xs text-gray-500">
              <ReactTimeago date={new Date(post.createdAt)} />
            </p>
          </div>
        </div>

        {/* Sadece DrGulf kullanıcısına silme yetkisi */}
        {isDrGulf && (
          <Button
            onClick={async () => {
              try {
                await deletePostAction(post._id.toString());
              } catch (err) {
                console.error("Failed to delete post", err);
              }
            }}
            size="icon"
            className="rounded-full"
            variant="outline"
          >
            <Trash2 />
          </Button>
        )}
      </div>

      {/* POST GÖVDESİ */}
      <PostContent post={post} />

      {/* BEĞENİ, YORUM vs. */}
      <SocialOptions post={post} />
    </div>
  );
};

export default Post;
