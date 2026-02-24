"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "react-bootstrap";
import { MOBILE_APP_BANNER } from "@/lib/constants/navigation";

interface AppBannerSectionProps {
  /** Admin'den yüklenen görsel – yoksa varsayılan kullanılır */
  bannerImage?: string;
}

export function AppBannerSection({ bannerImage }: AppBannerSectionProps = {}) {
  const imageSrc = bannerImage || MOBILE_APP_BANNER;

  const springTransition = {
    type: "spring" as const,
    stiffness: 180,
    damping: 22,
  };

  const reduceMotion = useReducedMotion();

  return (
    <section className="py-5 py-lg-6 overflow-hidden position-relative app-banner-section">
      {/* Arka plan – mavimsi radiant gradient */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 50%, rgba(37, 99, 235, 0.08) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 30% 70%, rgba(59, 130, 246, 0.06) 0%, transparent 45%), radial-gradient(ellipse 60% 50% at 70% 30%, rgba(37, 99, 235, 0.06) 0%, transparent 45%)",
          pointerEvents: "none",
        }}
      />
      <Container className="position-relative">
        <motion.div
          className="app-banner-wrapper"
          initial={reduceMotion ? undefined : { opacity: 0, y: 40, scale: 0.97 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ ...springTransition, delay: 0.1 }}
        >
          <motion.div
            className="app-banner-inner"
            whileHover={reduceMotion ? undefined : { scale: 1.01, transition: { duration: 0.3 } }}
          >
            <Image
              src={imageSrc}
              alt="Memur Jargonu mobil uygulaması - KPSS soruları çözün, çıkmış sorulara ücretsiz ulaşın"
              width={1200}
              height={600}
              className="img-fluid w-100"
              style={{
                objectFit: "contain",
                maxHeight: "520px",
                filter: "drop-shadow(0 8px 32px rgba(37, 99, 235, 0.15))",
              }}
              priority
              unoptimized={imageSrc.startsWith("http")}
            />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
