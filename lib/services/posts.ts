import { type Timestamp } from "firebase-admin/firestore";
import { getFirebaseFirestore } from "@/lib/firebase-admin";
import type { BlogPost } from "@/types";

const POSTS_COLLECTION = "posts";

function toDate(val: unknown): Date {
  if (val instanceof Date) return val;
  if (val && typeof val === "object" && "toDate" in val) {
    return (val as Timestamp).toDate();
  }
  return new Date(String(val));
}

export async function getPosts(): Promise<BlogPost[]> {
  const db = getFirebaseFirestore();
  const snapshot = await db
    .collection(POSTS_COLLECTION)
    .orderBy("publishedAt", "desc")
    .get();

  return snapshot.docs.map((doc) => {
    const d = doc.data();
    return {
      id: doc.id,
      title: d.title ?? "",
      slug: d.slug ?? "",
      excerpt: d.excerpt ?? "",
      body: d.body ?? "",
      coverImage: d.coverImage ?? undefined,
      videoUrl: d.videoUrl ?? undefined,
      publishedAt: toDate(d.publishedAt),
      createdAt: toDate(d.createdAt),
      updatedAt: toDate(d.updatedAt),
    };
  });
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const db = getFirebaseFirestore();
  const snapshot = await db
    .collection(POSTS_COLLECTION)
    .where("slug", "==", slug)
    .limit(1)
    .get();

  const doc = snapshot.docs[0];
  if (!doc) return null;

  const d = doc.data();
  return {
    id: doc.id,
    title: d.title ?? "",
    slug: d.slug ?? "",
    excerpt: d.excerpt ?? "",
    body: d.body ?? "",
    coverImage: d.coverImage ?? undefined,
    videoUrl: d.videoUrl ?? undefined,
    publishedAt: toDate(d.publishedAt),
    createdAt: toDate(d.createdAt),
    updatedAt: toDate(d.updatedAt),
  };
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  const db = getFirebaseFirestore();
  const doc = await db.collection(POSTS_COLLECTION).doc(id).get();
  if (!doc.exists) return null;

  const d = doc.data()!;
  return {
    id: doc.id,
    title: d.title ?? "",
    slug: d.slug ?? "",
    excerpt: d.excerpt ?? "",
    body: d.body ?? "",
    coverImage: d.coverImage ?? undefined,
    videoUrl: d.videoUrl ?? undefined,
    publishedAt: toDate(d.publishedAt),
    createdAt: toDate(d.createdAt),
    updatedAt: toDate(d.updatedAt),
  };
}
