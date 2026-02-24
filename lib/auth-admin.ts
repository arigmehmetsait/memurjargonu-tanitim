import { cookies } from "next/headers";
import { createHmac, createHash, timingSafeEqual } from "crypto";

const COOKIE_NAME = "admin_session";
const COOKIE_MAX_AGE = 60 * 60 * 24; // 24 saat

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET ?? process.env.ADMIN_PASSWORD;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET veya ADMIN_PASSWORD gerekli");
  return secret;
}

function hash(s: string): Buffer {
  return createHash("sha256").update(s, "utf8").digest();
}

export function verifyCredentials(username: string, password: string): boolean {
  const expectedUser = process.env.ADMIN_USERNAME;
  const expectedPass = process.env.ADMIN_PASSWORD;
  if (!expectedUser || !expectedPass) return false;
  const a = hash(username);
  const b = hash(expectedUser);
  const c = hash(password);
  const d = hash(expectedPass);
  return a.length === b.length && timingSafeEqual(a, b) && c.length === d.length && timingSafeEqual(c, d);
}

function signPayload(payload: string): string {
  const secret = getSecret();
  const hmac = createHmac("sha256", secret);
  hmac.update(payload);
  return payload + "." + hmac.digest("hex");
}

function verifyToken(token: string): boolean {
  try {
    const [payload, sig] = token.split(".");
    if (!payload || !sig) return false;
    const expected = signPayload(payload);
    return timingSafeEqual(Buffer.from(token), Buffer.from(expected));
  } catch {
    return false;
  }
}

export async function createSessionCookie(): Promise<string> {
  const payload = JSON.stringify({
    u: process.env.ADMIN_USERNAME,
    t: Date.now(),
  });
  return signPayload(Buffer.from(payload).toString("base64"));
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifyToken(token);
}

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
