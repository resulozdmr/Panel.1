import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareClient({ req, res });
  await supabase.auth.getSession(); // bu session'ı alıp res.locals içinde tutar

  return res;
}

export const config = {
  matcher: ["/((?!_next|.*\\..*|favicon.ico).*)"], // tüm sayfaları korur
};
