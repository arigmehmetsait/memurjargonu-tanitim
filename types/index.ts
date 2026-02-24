/**
 * Ortak tip tanımları
 */

export interface NavLink {
  href: string;
  label: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  /** Kapak görseli URL */
  coverImage?: string;
  /** Video URL (YouTube, Vimeo vb. embed destekli) */
  videoUrl?: string;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface PageSection {
  id: string;
  pageSlug: string;
  sectionKey: string;
  content: string;
  updatedAt: Date;
}

export interface FaqItem {
  question: string;
  answer: string;
}

/** Ana sayfa dinamik içerik tipi */
export interface StatItem {
  value: string;
  label: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon?: string;
}

export interface WhyUsItem {
  title: string;
  description: string;
}

export interface PackageItem {
  name: string;
  price?: string;
  period?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  paid?: boolean;
  ctaText: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
}

/** Ana sayfa görsel URL’leri – boşsa navigation sabitleri kullanılır */
export interface HomepageImages {
  heroBannerLeft?: string;
  heroBannerRight?: string;
  /** Hero arka plan görseli – isteğe bağlı */
  heroBannerBackground?: string;
  promoBannerLeft?: string;
  promoBannerCenter?: string;
  promoBannerRight?: string;
  mobileAppBanner?: string;
}

export interface HomepageContent {
  hero: { title: string; subtitle: string };
  stats: { title: string; subtitle: string; items: StatItem[] };
  features: { title: string; items: FeatureItem[] };
  whyUs: { title: string; subtitle: string; items: WhyUsItem[] };
  packages: { title: string; subtitle: string; items: PackageItem[] };
  testimonials: { title: string; items: TestimonialItem[] };
  /** Ana sayfa görselleri – admin’den yüklenenler. Eski resimler manuel silinir. */
  images?: HomepageImages;
}
