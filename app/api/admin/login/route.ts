import { NextRequest, NextResponse } from "next/server";
import {
  verifyCredentials,
  createSessionCookie,
  setSessionCookie,
} from "@/lib/auth-admin";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const username = formData.get("username")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";

    if (!username || !password) {
      return NextResponse.redirect(
        new URL("/admin?error=missing", request.url)
      );
    }

    if (!verifyCredentials(username, password)) {
      return NextResponse.redirect(
        new URL("/admin?error=invalid", request.url)
      );
    }

    const token = await createSessionCookie();
    await setSessionCookie(token);

    return NextResponse.redirect(new URL("/admin", request.url));
  } catch (e) {
    console.error("Login error:", e);
    return NextResponse.redirect(
      new URL("/admin?error=server", request.url)
    );
  }
}
