"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { AppStoreBadges } from "./AppStoreBadges";
import { HERO_BANNER_LEFT, HERO_BANNER_RIGHT } from "@/lib/constants/navigation";

const springTransition = {
  type: "spring" as const,
  stiffness: 260,
  damping: 22,
};

const staggerDelay = 0.08;

interface HeroProps {
  title: string;
  subtitle: string;
  showAppButtons?: boolean;
  /** Krow stilinde sınav etiketleri (KPSS, AGS vb.) */
  examBadges?: ReadonlyArray<{ label: string; href?: string }>;
  /** Admin'den yüklenen banner görselleri – yoksa varsayılan kullanılır */
  bannerLeft?: string;
  bannerRight?: string;
  /** Hero arka plan görseli – isteğe bağlı */
  backgroundImage?: string;
}

export function Hero({ title, subtitle, showAppButtons = true, examBadges, bannerLeft, bannerRight, backgroundImage }: HeroProps) {
  const leftSrc = bannerLeft || HERO_BANNER_LEFT;
  const rightSrc = bannerRight || HERO_BANNER_RIGHT;
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion ? { duration: 0 } : springTransition;

  const sectionStyle: React.CSSProperties = backgroundImage
    ? {
        position: "relative",
        backgroundImage: `linear-gradient(180deg, rgba(249,249,251,0.5) 0%, rgba(255,255,255,0.6) 100%), url("${backgroundImage}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {
        background: "linear-gradient(180deg, var(--kiri-mist-100) 0%, var(--background) 100%)",
      };

  return (
    <section className="py-5 py-lg-6 overflow-hidden" style={sectionStyle}>
      <Container>
        <Row className="align-items-center min-vh-50 py-5 py-lg-6">
          <Col lg={3} xl={3} className="d-none d-lg-flex justify-content-end mb-4 mb-lg-0">
            <motion.div
              initial={reduceMotion ? undefined : { opacity: 0, x: -24 }}
              animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              transition={{ ...transition, delay: staggerDelay }}
              className="hero-banner"
            >
              <Image
                src={leftSrc}
                alt="Memur Jargonu uygulaması - KPSS hazırlık"
                width={280}
                height={400}
                className="img-fluid"
                style={{ objectFit: "contain", maxHeight: "420px" }}
                priority
                unoptimized={leftSrc.startsWith("http")}
              />
            </motion.div>
          </Col>
          <Col lg={6} xl={6} className="text-center">
            <motion.h1
              className="display-4 display-lg-3 fw-bold mb-4 text-dark"
              style={{ lineHeight: 1.2, color: "var(--thamar-black-500)" }}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition}
            >
              {title}
            </motion.h1>
            <motion.p
              className="lead text-muted mb-4 mb-lg-5 fs-5 fw-normal"
              style={{ maxWidth: "36rem", margin: "0 auto 1.5rem" }}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transition, delay: reduceMotion ? 0 : staggerDelay }}
            >
              {subtitle}
            </motion.p>
            {examBadges && examBadges.length > 0 && (
              <motion.div
                className="d-flex flex-wrap justify-content-center gap-2 mb-4"
                initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transition, delay: reduceMotion ? 0 : staggerDelay * 1.5 }}
              >
                {examBadges.map((badge, i) => {
                  const content = (
                    <span
                      className="badge px-3 py-2 fw-medium"
                      style={{
                        background: "rgba(37, 99, 235, 0.1)",
                        color: "var(--azul-500)",
                        fontSize: "0.85rem",
                      }}
                    >
                      {badge.label}
                    </span>
                  );
                  return badge.href ? (
                    <Link key={i} href={badge.href} className="text-decoration-none" title={badge.label}>
                      {content}
                    </Link>
                  ) : (
                    <span key={i}>{content}</span>
                  );
                })}
              </motion.div>
            )}
            {showAppButtons && (
              <motion.div
                className="mt-4"
                initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transition, delay: reduceMotion ? 0 : staggerDelay * 2 }}
              >
                <AppStoreBadges size="lg" animated={!reduceMotion} />
              </motion.div>
            )}
          </Col>
          <Col lg={3} xl={3} className="d-none d-lg-flex justify-content-start mb-4 mb-lg-0">
            <motion.div
              initial={reduceMotion ? undefined : { opacity: 0, x: 24 }}
              animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              transition={{ ...transition, delay: staggerDelay }}
              className="hero-banner"
            >
              <Image
                src={rightSrc}
                alt="Memur Jargonu uygulaması - Forum ve topluluk"
                width={280}
                height={400}
                className="img-fluid"
                style={{ objectFit: "contain", maxHeight: "420px" }}
                priority
                unoptimized={rightSrc.startsWith("http")}
              />
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
