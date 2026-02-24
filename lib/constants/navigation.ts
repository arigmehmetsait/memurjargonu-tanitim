/**
 * Site navigasyonu ve sabitler – tek kaynak (single source of truth)
 */

export const SITE_NAME = "Memur Jargonu";
export const SITE_DESCRIPTION =
  "Memur Jargonu ile KPSS ve AGS sınavlarına hazırlanın. Eğitim videoları, deneme sınavları, memur ilanları ve uzman içeriklerle sınav başarınızı artırın.";

/** Sitenin ana URL'i – canonical ve metadataBase için */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://memurjargonu.com";

export const STORE_URL = "https://magaza.memurjargonu.com";
/** Mağaza paketler sayfası */
export const STORE_PLANS_URL = "https://magaza.memurjargonu.com/plans";

/** App Store ve Google Play mağaza linkleri – uygulama yayınlandığında güncellenmeli */
export const APP_STORE_URL = "https://apps.apple.com/tr/app/memur-jargonu";
export const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.memurjargonu.kpsssorucozum";

/** Header logosu yanında görünen kısa slogan */

export const NAV_LINKS = [
  { href: "/", label: "Ana Sayfa", primary: true },
  { href: "/neden-biz", label: "Neden Biz", primary: true },
  { href: "/ozellikler", label: "Özellikler", primary: true },
  { href: "/paketler", label: "Paketler", primary: true },
  { href: "/blog", label: "Blog", primary: false },
  { href: "/sikca-sorulan-sorular", label: "SSS", primary: false },
  { href: "/iletisim", label: "İletişim", primary: false },
] as const;

export const FOOTER_LEGAL_LINKS = [
  { href: "/gizlilik-politikasi", label: "Gizlilik Politikası" },
  { href: "/cerez-politikasi", label: "Çerez Politikası" },
  { href: "/kullanim-kosullari", label: "Kullanım Koşulları" },
] as const;

/** Sosyal medya hesapları */
export const SOCIAL_LINKS = [
  { href: "https://www.instagram.com/memurjargonu/", label: "Instagram", icon: "instagram" },
  { href: "https://www.youtube.com/c/MemurJargonu", label: "YouTube", icon: "youtube" },
  { href: "https://www.facebook.com/memurjargon/", label: "Facebook", icon: "facebook" },
] as const;

export const LOGO_PATH = "/logo-favicon.png";

/** Ana sayfa hero banner görselleri – sol ve sağ */
export const HERO_BANNER_LEFT = "/trans-tasarim1.PNG";
export const HERO_BANNER_RIGHT = "/trans-tasarim2.PNG";

/** Rakamlar ile Özellikler arası promo banner'lar */
export const PROMO_BANNER_LEFT = "/taraim1.png";
export const PROMO_BANNER_CENTER = "/tasarim3.PNG";
export const PROMO_BANNER_RIGHT = "/tasarim2.PNG";

/** Özellikler ile Neden Biz arası mobil uygulama banner'ı */
export const MOBILE_APP_BANNER = "/ChatGPT Image 19 Şub 2026 15_57_39.png";
