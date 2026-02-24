import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { isAdminAuthenticated } from "@/lib/auth-admin";

const UPLOAD_DIR = "public/uploads/blog";
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "Dosya seçilmedi" },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Geçersiz format. JPEG, PNG, WebP veya GIF kabul edilir." },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Dosya 5MB'dan büyük olamaz." },
        { status: 400 }
      );
    }

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const safeExt = ["jpg", "jpeg", "png", "webp", "gif"].includes(ext) ? ext : "jpg";
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${safeExt}`;

    const dir = join(process.cwd(), UPLOAD_DIR);
    if (!existsSync(dir)) {
      await mkdir(dir, { recursive: true });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filepath = join(dir, filename);
    await writeFile(filepath, buffer);

    const url = `/uploads/blog/${filename}`;
    return NextResponse.json({ url });
  } catch (e) {
    console.error("Upload error:", e);
    return NextResponse.json(
      { error: "Yükleme başarısız" },
      { status: 500 }
    );
  }
}
