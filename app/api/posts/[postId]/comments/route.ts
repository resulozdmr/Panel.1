import connectDB from "@/lib/db";
import { Post } from "@/models/post.model";
import { NextRequest, NextResponse } from "next/server";

// Yorum işlevselliği kaldırılmış: Sadece postu döndürür
export async function GET(
  request: NextRequest, // Request yerine NextRequest kullanıyoruz
  { params }: { params: { postId: string } }
) {
  try {
    await connectDB();
    const post = await Post.findById(params.postId);
    if (!post) {
      return NextResponse.json({ error: "Post bulunamadı." }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    console.error("GET endpoint hatası:", error);
    return NextResponse.json({ error: "Bir hata oluştu." }, { status: 500 });
  }
}
