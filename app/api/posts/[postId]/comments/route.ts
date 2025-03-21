import connectDB from "@/lib/db";
import { Post } from "@/models/post.model";
import { NextRequest, NextResponse } from "next/server";

// Tüm yorumları çekmek için GET endpoint
export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    // Veritabanına bağlan
    await connectDB();

    // Belirtilen postu bul
    const post = await Post.findById(params.postId);
    if (!post) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    // Post bulunduysa, yorumları populate et (tarihe göre azalan sıralama)
    const comments = await post.populate({
      path: "comments",
      options: { sort: { createdAt: -1 } },
    });

    // Yorumları JSON formatında döndür
    return NextResponse.json(comments);
  } catch (error) {
    console.error("GET endpoint hatası:", error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
}
