import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants/navigation";
import { getPosts } from "@/lib/services/posts";

const STATIC_PAGES: MetadataRoute.Sitemap = [
  { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
  { url: `${SITE_URL}/neden-biz`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/ozellikler`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/paketler`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  { url: `${SITE_URL}/sikca-sorulan-sorular`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${SITE_URL}/iletisim`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${SITE_URL}/gizlilik-politikasi`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
  { url: `${SITE_URL}/cerez-politikasi`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
  { url: `${SITE_URL}/kullanim-kosullari`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogPosts: MetadataRoute.Sitemap = [];
  try {
    const posts = await getPosts();
    blogPosts = posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    // Firestore bağlantısı yoksa sadece statik sayfalar
  }

  return [...STATIC_PAGES, ...blogPosts];
}
