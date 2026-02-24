import { getFirebaseFirestore } from "@/lib/firebase-admin";
import type { HomepageContent } from "@/types";

const COLLECTION = "homepageContent";
const DOC_ID = "main";

function parseContent(d: Record<string, unknown> | undefined): HomepageContent | null {
  if (!d) return null;

  const hero = d.hero as Record<string, string> | undefined;
  const stats = d.stats as Record<string, unknown> | undefined;
  const features = d.features as Record<string, unknown> | undefined;
  const whyUs = d.whyUs as Record<string, unknown> | undefined;
  const packages = d.packages as Record<string, unknown> | undefined;
  const testimonials = d.testimonials as Record<string, unknown> | undefined;

  if (
    !hero?.title ||
    !stats?.items ||
    !Array.isArray(stats.items) ||
    !features?.items ||
    !Array.isArray(features.items) ||
    !whyUs?.items ||
    !Array.isArray(whyUs.items) ||
    !packages?.items ||
    !Array.isArray(packages.items) ||
    !testimonials?.items ||
    !Array.isArray(testimonials.items)
  ) {
    return null;
  }

  const images = d.images as Record<string, string> | undefined;
  const result: HomepageContent = {
    hero: { title: hero.title, subtitle: hero.subtitle ?? "" },
    stats: {
      title: (stats.title as string) ?? "",
      subtitle: (stats.subtitle as string) ?? "",
      items: stats.items as HomepageContent["stats"]["items"],
    },
    features: {
      title: (features.title as string) ?? "",
      items: features.items as HomepageContent["features"]["items"],
    },
    whyUs: {
      title: (whyUs.title as string) ?? "",
      subtitle: (whyUs.subtitle as string) ?? "",
      items: whyUs.items as HomepageContent["whyUs"]["items"],
    },
    packages: {
      title: (packages.title as string) ?? "",
      subtitle: (packages.subtitle as string) ?? "",
      items: packages.items as HomepageContent["packages"]["items"],
    },
    testimonials: {
      title: (testimonials.title as string) ?? "",
      items: testimonials.items as HomepageContent["testimonials"]["items"],
    },
  };
  if (images && typeof images === "object") {
    result.images = {
      heroBannerLeft: images.heroBannerLeft,
      heroBannerRight: images.heroBannerRight,
      heroBannerBackground: images.heroBannerBackground,
      promoBannerLeft: images.promoBannerLeft,
      promoBannerCenter: images.promoBannerCenter,
      promoBannerRight: images.promoBannerRight,
      mobileAppBanner: images.mobileAppBanner,
    };
  }
  return result;
}

/** Firestore'dan ana sayfa içeriğini getirir. Yoksa veya geçersizse null döner. */
export async function getHomepageContent(): Promise<HomepageContent | null> {
  try {
    const db = getFirebaseFirestore();
    const doc = await db.collection(COLLECTION).doc(DOC_ID).get();
    const data = doc.exists ? doc.data() : undefined;
    return parseContent(data as Record<string, unknown> | undefined);
  } catch {
    return null;
  }
}

/** Ana sayfa içeriğini Firestore'a yazar. */
export async function setHomepageContent(content: HomepageContent): Promise<void> {
  const db = getFirebaseFirestore();
  await db.collection(COLLECTION).doc(DOC_ID).set(
    {
      ...content,
      updatedAt: new Date(),
    },
    { merge: true }
  );
}
