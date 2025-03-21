import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import User from '../../../models/user.model';

// POST endpoint - Kullanıcı başvurusu kaydetme
export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const body = await req.json();
    const { fullName, department, graduationYear, phone, cvUrl, certificateUrl } = body;

    // Yeni kullanıcı kaydı oluştur
    const newUser = new User({
      fullName,
      department,
      graduationYear,
      phone,
      cvUrl,
      certificateUrl,
    });

    // Veritabanına kaydet
    await newUser.save();

    return NextResponse.json({ message: 'User application submitted successfully!' }, { status: 201 });
  } catch (error) {
    console.error("Error submitting application:", error);
    return NextResponse.json({ error: 'Error submitting application' }, { status: 400 });
  }
}
