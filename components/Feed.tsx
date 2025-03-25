import React from "react";
import PostInput from "./PostInput";
import Posts from "./Posts";
import { getAllPosts } from "@/lib/serveractions";

interface FeedProps {
  user: {
    [key: string]: any;
  };
}

const Feed = async ({ user }: FeedProps) => {
  // Sunucu tarafı veri çekme örneği
  const userData = JSON.parse(JSON.stringify(user));
  const posts = await getAllPosts();

  return (
    <div className="flex-1 max-w-2xl w-full mx-auto px-4 space-y-4">
      {/* Post girişi alanı */}
      <div className="bg-white p-4 border border-gray-200 rounded-none">
        <PostInput user={userData} />
      </div>

      {/* Postların listesi */}
      <div>
        <Posts posts={posts!} />
      </div>
    </div>
  );
};

export default Feed;
