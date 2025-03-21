import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import User from '../../../models/user.model';

// GET endpoint - Kullanıcıları listeleme
export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const users = await User.find();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Error fetching users" }, { status: 500 });
  }
}
