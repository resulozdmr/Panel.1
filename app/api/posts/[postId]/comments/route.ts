import connectDB from "@/lib/db";
import { Post } from "@/models/post.model";
import { NextRequest, NextResponse } from "next/server";

// İlgili postu döndüren GET endpoint (yorumlar kaldırıldı)
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

    // Yorumlar kaldırıldı, sadece postu JSON olarak döndür
    return NextResponse.json(post);
  } catch (error) {
    console.error("GET endpoint hatası:", error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
}
