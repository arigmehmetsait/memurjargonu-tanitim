"use client";

import { motion } from "framer-motion";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/constants/navigation";

const springTransition = {
  type: "spring" as const,
  stiffness: 260,
  damping: 20,
};

interface AppStoreBadgesProps {
  className?: string;
  animated?: boolean;
  size?: "sm" | "md" | "lg";
  /** "light" = siyah badge (açık arka plan), "dark" = beyaz badge (koyu arka plan) */
  theme?: "light" | "dark";
  /** Badge'leri üst üste (dikey) diz */
  stacked?: boolean;
}

const sizePx = { sm: 40, md: 48, lg: 56 };
/** Google Play rozeti görsel olarak daha küçük görünüyor; bu çarpanla dengeleyebiliriz */
const PLAY_BADGE_HEIGHT_SCALE = 1.12;

/** App Store ve Google Play resmi badge URL'leri */
const APP_STORE_BADGES = {
  light: "https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg",
  dark: "https://developer.apple.com/assets/elements/badges/download-on-the-app-store-white.svg",
};
const PLAY_STORE_BADGES = {
  light: "https://play.google.com/intl/tr/badges/static/images/badges/tr_badge_web_generic.png",
  dark: "https://play.google.com/intl/tr/badges/static/images/badges/tr_badge_web_generic_white.png",
};

export function AppStoreBadges({
  className = "",
  animated = true,
  size = "md",
  theme = "light",
  stacked = false,
}: AppStoreBadgesProps) {
  const h = sizePx[size];
  const playH = Math.round(h * PLAY_BADGE_HEIGHT_SCALE);

  const container = (
    <div
      className={`d-flex ${stacked ? "flex-column gap-2" : "flex-wrap gap-3"} align-items-center justify-content-center ${className}`}
      role="group"
      aria-label="Uygulamayı indir"
    >
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-decoration-none d-inline-block opacity-hover"
        style={{ height: h }}
        aria-label="App Store'dan İndir"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={APP_STORE_BADGES[theme]}
          alt="App Store'dan İndir"
          height={h}
          className="h-100 w-auto d-block"
          loading="eager"
        />
      </a>
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-decoration-none d-inline-block opacity-hover"
        style={{ height: playH }}
        aria-label="Google Play'den Al"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PLAY_STORE_BADGES[theme]}
          alt="Google Play'den Al"
          height={playH}
          className="h-100 w-auto d-block"
        />
      </a>
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springTransition}
      >
        {container}
      </motion.div>
    );
  }

  return container;
}
