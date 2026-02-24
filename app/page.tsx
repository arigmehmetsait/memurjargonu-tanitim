import { Hero } from "@/components/Hero";
import { PromoBanners } from "@/components/PromoBanners";
import { FeaturesSection } from "@/components/FeaturesSection";
import { AppBannerSection } from "@/components/AppBannerSection";
import { WhyUsSection } from "@/components/WhyUsSection";
import { StatsSection } from "@/components/StatsSection";
import { PackagesSection } from "@/components/PackagesSection";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import {
  DEFAULT_HERO,
  DEFAULT_FEATURES,
  DEFAULT_WHY_US,
  DEFAULT_STATS,
  DEFAULT_PACKAGES,
  DEFAULT_TESTIMONIALS,
} from "@/lib/constants/default-content";
import { getHomepageContent } from "@/lib/services/homepage-content";

export default async function Home() {
  const content = await getHomepageContent();

  const hero = content?.hero ?? DEFAULT_HERO;
  const stats = content?.stats ?? {
    title: "Rakamlarla Memur Jargonu",
    subtitle: "Her gün daha fazla içerik ve kullanıcı",
    items: DEFAULT_STATS,
  };
  const features = content?.features ?? { title: "Özellikler", items: DEFAULT_FEATURES };
  const whyUs = content?.whyUs ?? DEFAULT_WHY_US;
  const packages = content?.packages ?? {
    title: "Abonelik Paketleri",
    subtitle: "İhtiyacınıza uygun paketi seçin, sınavlara en iyi şekilde hazırlanın.",
    items: DEFAULT_PACKAGES,
  };
  const testimonials = content?.testimonials ?? {
    title: "Kullanıcılarımız Hakkımızda Neler Söylüyor?",
    items: DEFAULT_TESTIMONIALS,
  };

  const images = content?.images;

  return (
    <>
      <Hero
        title={hero.title}
        subtitle={hero.subtitle}
        showAppButtons
        bannerLeft={images?.heroBannerLeft}
        bannerRight={images?.heroBannerRight}
        backgroundImage={images?.heroBannerBackground}
      />

      <StatsSection title={stats.title} subtitle={stats.subtitle} stats={stats.items} />

      <PromoBanners
        bannerLeft={images?.promoBannerLeft}
        bannerCenter={images?.promoBannerCenter}
        bannerRight={images?.promoBannerRight}
      />

      <FeaturesSection title={features.title} features={features.items} />

      <AppBannerSection bannerImage={images?.mobileAppBanner} />

      <WhyUsSection title={whyUs.title} subtitle={whyUs.subtitle} items={whyUs.items} />

      <PackagesSection
        title={packages.title}
        subtitle={packages.subtitle}
        packages={packages.items}
      />

      <TestimonialsCarousel title={testimonials.title} testimonials={testimonials.items} />
    </>
  );
}
