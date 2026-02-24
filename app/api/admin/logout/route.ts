import { NextRequest, NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/auth-admin";

export async function POST(request: NextRequest) {
  await clearSessionCookie();
  return NextResponse.redirect(new URL("/admin", request.url));
}
