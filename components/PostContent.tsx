import { IPostDocument } from "@/models/post.model";
import Image from "next/image";
import React from "react";

const PostContent = ({ post }: { post: IPostDocument }) => {
  return (
    <div className="my-3">
      {post?.description && (
        <p className="my-3 px-4 text-sm text-gray-800">{post.description}</p>
      )}

      {post?.imageUrl && (
        <div className="px-4">
          <Image
            src={post.imageUrl}
            width={500}
            height={500}
            alt={post.description || "Post image"}
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default PostContent;
