import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth-admin";
import { getHomepageContent, setHomepageContent } from "@/lib/services/homepage-content";
import type { HomepageContent } from "@/types";

/** Admin: Ana sayfa içeriğini getirir */
export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const content = await getHomepageContent();
    return NextResponse.json(content);
  } catch (e) {
    console.error("Homepage content fetch error:", e);
    return NextResponse.json(
      { error: "İçerik alınamadı" },
      { status: 500 }
    );
  }
}

/** Admin: Ana sayfa içeriğini günceller */
export async function PUT(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: HomepageContent;
  try {
    body = (await request.json()) as HomepageContent;
  } catch {
    return NextResponse.json(
      { error: "Geçersiz JSON" },
      { status: 400 }
    );
  }

  const msg = validateHomepageContent(body);
  if (msg) {
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  try {
    await setHomepageContent(body);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Homepage content save error:", e);
    return NextResponse.json(
      { error: "İçerik kaydedilemedi" },
      { status: 500 }
    );
  }
}

function validateHomepageContent(c: HomepageContent): string | null {
  if (!c?.hero?.title?.trim()) return "Hero başlığı gerekli";
  if (!c?.stats?.items?.length) return "En az bir istatistik gerekli";
  if (!c?.features?.items?.length) return "En az bir özellik gerekli";
  if (!c?.whyUs?.items?.length) return "En az bir 'Neden biz' maddesi gerekli";
  if (!c?.packages?.items?.length) return "En az bir paket gerekli";
  if (!c?.testimonials?.items?.length) return "En az bir yorum gerekli";
  return null;
}
