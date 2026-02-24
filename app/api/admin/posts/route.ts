import { NextRequest, NextResponse } from "next/server";
import { getFirebaseFirestore } from "@/lib/firebase-admin";
import { isAdminAuthenticated } from "@/lib/auth-admin";

const POSTS_COLLECTION = "posts";

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const title = formData.get("title")?.toString();
  const slug = formData.get("slug")?.toString();
  const excerpt = formData.get("excerpt")?.toString() ?? "";
  const body = formData.get("body")?.toString();
  const coverImage = formData.get("coverImage")?.toString() ?? "";
  const videoUrl = formData.get("videoUrl")?.toString() ?? "";
  const publishedAt = formData.get("publishedAt")?.toString();

  if (!title || !slug || !body) {
    return NextResponse.json(
      { error: "Başlık, slug ve gövde gerekli" },
      { status: 400 }
    );
  }

  try {
    const db = getFirebaseFirestore();
    const now = new Date();
    const pubAt = publishedAt ? new Date(publishedAt) : now;

    const ref = await db.collection(POSTS_COLLECTION).add({
      title,
      slug,
      excerpt,
      body,
      ...(coverImage && { coverImage }),
      ...(videoUrl && { videoUrl }),
      publishedAt: pubAt,
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json({ ok: true, id: ref.id }, { status: 201 });
  } catch (e) {
    console.error("Post create error:", e);
    return NextResponse.json(
      { error: "Yazı oluşturulamadı" },
      { status: 500 }
    );
  }
}
