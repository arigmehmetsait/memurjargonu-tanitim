import { NextResponse } from "next/server";
import { getHomepageContent } from "@/lib/services/homepage-content";

/** Public: Ana sayfa içeriğini döner (cache için revalidate kullanılabilir) */
export async function GET() {
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
