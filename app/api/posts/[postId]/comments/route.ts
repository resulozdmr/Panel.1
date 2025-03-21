import connectDB from "@/lib/db";
import { Post } from "@/models/post.model";
import { NextResponse } from "next/server";

// Yorum işlevselliği kaldırılmış: Sadece postu döndürür
export async function GET(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    await connectDB();
    const post = await Post.findById(params.postId);
    if (!post) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    console.error("GET endpoint hatası:", error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
}
