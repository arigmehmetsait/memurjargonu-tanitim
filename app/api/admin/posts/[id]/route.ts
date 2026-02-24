import { NextRequest, NextResponse } from "next/server";
import { getFirebaseFirestore } from "@/lib/firebase-admin";
import { isAdminAuthenticated } from "@/lib/auth-admin";

const POSTS_COLLECTION = "posts";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const method = request.headers.get("X-HTTP-Method-Override");

  const db = getFirebaseFirestore();
  const docRef = db.collection(POSTS_COLLECTION).doc(id);

  if (method === "PUT") {
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
      const doc = await docRef.get();
      if (!doc.exists) {
        return NextResponse.json({ error: "Yazı bulunamadı" }, { status: 404 });
      }

      const updateData: Record<string, unknown> = {
        title,
        slug,
        excerpt,
        body,
        coverImage: coverImage || "",
        videoUrl: videoUrl || "",
        updatedAt: new Date(),
      };
      if (publishedAt) {
        updateData.publishedAt = new Date(publishedAt);
      }

      await docRef.update(updateData);
      return NextResponse.redirect(new URL("/admin/blog", request.url), 303);
    } catch (e) {
      console.error("Post update error:", e);
      return NextResponse.json(
        { error: "Yazı güncellenemedi" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ error: "Geçersiz metod" }, { status: 400 });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    const db = getFirebaseFirestore();
    const docRef = db.collection(POSTS_COLLECTION).doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return NextResponse.json({ error: "Yazı bulunamadı" }, { status: 404 });
    }
    await docRef.delete();
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Post delete error:", e);
    return NextResponse.json(
      { error: "Yazı silinemedi" },
      { status: 500 }
    );
  }
}
