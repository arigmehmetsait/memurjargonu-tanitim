/**
 * Varsayılan sayfa içeriği – DB boşken fallback
 * Krow tasarım dilinden ilham alınmıştır.
 */

export const DEFAULT_HERO = {
  title: "KPSS ve AGS Hazırlığınız İçin Yanınızdayız",
  subtitle:
    "Eğitim videoları, denemeler, memur ilanları ve uygulama içi etkinliklerle sınavlara en iyi şekilde hazırlanın.",
 
};

export const DEFAULT_STATS = [
  { value: "50+", label: "Eğitim Videosu" },
  { value: "200+", label: "Deneme Sınavı" },
  { value: "10.000+", label: "Aktif Kullanıcı" },
  { value: "1000+", label: "Memur İlanı" },
];

export const DEFAULT_TESTIMONIALS = [
  {
    quote:
      "Uygulama sayesinde KPSS hazırlığım çok daha verimli geçiyor. Videolar ve denemeler gerçekten işe yarıyor.",
    author: "Ayşe K.",
    role: "KPSS Adayı",
  },
  {
    quote:
      "Memur ilanlarını tek yerden takip etmek harika. Zaman kaybı olmadan güncel ilanlara ulaşıyorum.",
    author: "Mehmet T.",
    role: "AGS Öğrencisi",
  },
  {
    quote:
      "Canlı etkinlikler ve çalışma grupları motivasyonumu artırıyor. Tek başına çalışmak yerine toplulukla ilerlemek çok daha iyi.",
    author: "Zeynep Ö.",
    role: "KPSS Adayı",
  },
];

export const DEFAULT_FEATURES = [
  {
    title: "Eğitim Videoları",
    description: "KPSS ve AGS konularını kapsayan zengin video kütüphanesi.",
    icon: "play-circle",
  },
  {
    title: "Denemeler",
    description: "Gerçek sınav formatında denemelerle kendinizi test edin.",
    icon: "clipboard-check",
  },
  {
    title: "Uygulama İçi Etkinlikler",
    description: "Canlı etkinlikler ve interaktif çalışma grupları.",
    icon: "users",
  },
  {
    title: "Memur İlanları",
    description: "Güncel memur ilanlarını uygulama üzerinden takip edin.",
    icon: "briefcase",
  },
];

/** Özellikler sayfası için genişletilmiş içerik */
export const FEATURE_PAGE_SECTIONS = [
  {
    title: "Öğrenme & Pratik",
    items: [
      {
        title: "Eğitim Videoları",
        description:
          "KPSS ve AGS konularını kapsayan uzman eğitmen videoları. Konu anlatımları, çözümlü sorular ve ipuçlarıyla sınav hazırlığınızı güçlendirin.",
        icon: "play-circle",
      },
      {
        title: "Deneme Sınavları",
        description:
          "Gerçek sınav formatında, zamanlı denemelerle kendinizi test edin. Detaylı performans analizi ve konu bazlı değerlendirme ile eksiklerinizi belirleyin.",
        icon: "clipboard-check",
      },
      {
        title: "Çıkmış Sorular",
        description:
          "Geçmiş yılların ÖSYM sorularına erişin. Soru çözümleri ve açıklamalarla konuları pekiştirin.",
        icon: "book-open",
      },
    ],
  },
  {
    title: "Topluluk & Etkinlik",
    items: [
      {
        title: "Canlı Etkinlikler",
        description:
          "Uzman hocalarla canlı dersler, soru-cevap oturumları ve motivasyon seminerleri. Etkileşimli öğrenme deneyimi yaşayın.",
        icon: "users",
      },
      {
        title: "Çalışma Grupları",
        description:
          "Benzer hedeflere sahip adaylarla gruplar oluşturun, birlikte çalışın ve motivasyonunuzu yüksek tutun.",
        icon: "message-circle",
      },
    ],
  },
  {
    title: "Kariyer & Takip",
    items: [
      {
        title: "Memur İlanları",
        description:
          "Güncel memur alım ilanlarını tek yerden takip edin. Kurum, pozisyon ve bölge filtreleriyle size uygun ilanları bulun.",
        icon: "briefcase",
      },
      {
        title: "İlerleme Takibi",
        description:
          "Çalışma sürelerinizi, deneme sonuçlarınızı ve konu ilerlemenizi takip edin. Hedeflerinize ne kadar yaklaştığınızı görün.",
        icon: "trending-up",
      },
    ],
  },
];

/** Ana sayfa paketler bölümü */
export const DEFAULT_PACKAGES = [
  {
    name: "Ücretsiz",
    price: "₺0",
    description: "Uygulamayı keşfetmek için ideal başlangıç.",
    features: [
      "Sınırlı eğitim videoları",
      "Örnek deneme sınavları",
      "Temel özelliklere erişim",
    ],
    ctaText: "Hemen Başla",
  },
  {
    name: "Premium",
    paid: true,
    description: "Tüm premium özelliklere tam erişim.",
    features: [
      "Tüm eğitim videoları",
      "Sınırsız deneme sınavı",
      "Memur ilanları takibi",
      "Canlı etkinliklere katılım",
      "Öncelikli destek",
    ],
    highlighted: true,
    ctaText: "Fiyatları Gör",
  },
];

/** Krow "Neden Krow" stilinde kart tabanlı neden-biz bölümü */
export const DEFAULT_WHY_US = {
  title: "Neden Memur Jargonu?",
  subtitle: "Zorlu sınavlara ekonomik çözüm",
  items: [
    {
      title: "Uzman Eğitmenler",
      description:
        "KPSS ve AGS alanında deneyimli hocalarımız, videolar ve içeriklerle sınav hazırlığınızda yanınızda.",
    },
    {
      title: "Zengin İçerik",
      description:
        "Eğitim videoları, denemeler ve interaktif etkinliklerle sınava en yakın deneyimi yaşayın.",
    },
    {
      title: "Uygun Fiyatlar",
      description:
        "Bütçe dostu paketlerle sınava hazırlanmanın maddi yükünü hafifletiyoruz.",
    },
    {
      title: "Her Yerde Erişim",
      description: "İster evde, ister yolda; Memur Jargonu her zaman yanınızda.",
    },
    {
      title: "Memur İlanları",
      description:
        "Güncel memur ilanlarını uygulama üzerinden takip edin, fırsatları kaçırmayın.",
    },
    {
      title: "Canlı Etkinlikler",
      description:
        "Uygulama içi etkinlikler ve çalışma gruplarıyla motivasyonunuzu yüksek tutun.",
    },
  ],
};
