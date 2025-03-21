import connectDB from "@/lib/db";
import { Post } from "@/models/post.model";
import { NextRequest, NextResponse } from "next/server";

// fetch all comments
export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    // Veritabanına bağlan
    await connectDB();

    // İlgili postu bul
    const post = await Post.findById(params.postId);
    if (!post) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    // Post bulunduysa yorumları populate et
    const comments = await post.populate({
      path: "comments",
      options: { sort: { createdAt: -1 } },
    });

    // Yorumları JSON olarak döndür
    return NextResponse.json(comments);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
}
