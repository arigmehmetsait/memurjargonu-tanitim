"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";
import { PROMO_BANNER_LEFT, PROMO_BANNER_CENTER, PROMO_BANNER_RIGHT } from "@/lib/constants/navigation";

interface PromoBannersProps {
  /** Admin'den yüklenen görseller – yoksa varsayılan kullanılır */
  bannerLeft?: string;
  bannerCenter?: string;
  bannerRight?: string;
}

export function PromoBanners({ bannerLeft, bannerCenter, bannerRight }: PromoBannersProps = {}) {
  const leftSrc = bannerLeft || PROMO_BANNER_LEFT;
  const centerSrc = bannerCenter || PROMO_BANNER_CENTER;
  const rightSrc = bannerRight || PROMO_BANNER_RIGHT;

  const springTransition = {
    type: "spring" as const,
    stiffness: 200,
    damping: 24,
  };

  const reduceMotion = useReducedMotion();

  return (
    <section
      className="py-4 py-lg-5 overflow-hidden position-relative promo-banners-section"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(37, 99, 235, 0.06) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 20% 80%, rgba(59, 130, 246, 0.05) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 80% 20%, rgba(37, 99, 235, 0.05) 0%, transparent 50%)",
      }}
    >
      <Container fluid className="px-2 px-md-3 position-relative">
        <Row className="g-2 g-lg-3 align-items-center justify-content-center">
          <Col xs={12} md={4} lg={4} className="text-center">
            <motion.div
              initial={reduceMotion ? undefined : { opacity: 0, y: 32, scale: 0.96 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ ...springTransition, delay: 0.1 }}
              whileHover={reduceMotion ? undefined : { y: -8, transition: { duration: 0.2 } }}
              className="promo-banner-item"
            >
              <Image
                src={leftSrc}
                alt="Ücretsiz KPSS sorularını çöz - Çıkmış sorulara ulaş"
                width={480}
                height={400}
                className="img-fluid w-100"
                style={{ objectFit: "contain", maxHeight: "520px" }}
                priority
                unoptimized={leftSrc.startsWith("http")}
              />
            </motion.div>
          </Col>
          <Col xs={12} md={4} lg={4} className="text-center">
            <motion.div
              initial={reduceMotion ? undefined : { opacity: 0, y: 32, scale: 0.96 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ ...springTransition, delay: 0.2 }}
              whileHover={reduceMotion ? undefined : { y: -8, transition: { duration: 0.2 } }}
              className="promo-banner-item"
            >
              <Image
                src={centerSrc}
                alt="KPSS soruları ve çıkmış soruları çöz - Ücretsiz kaynaklara ulaş"
                width={480}
                height={400}
                className="img-fluid w-100"
                style={{ objectFit: "contain", maxHeight: "520px" }}
                priority
                unoptimized={centerSrc.startsWith("http")}
              />
            </motion.div>
          </Col>
          <Col xs={12} md={4} lg={4} className="text-center">
            <motion.div
              initial={reduceMotion ? undefined : { opacity: 0, y: 32, scale: 0.96 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ ...springTransition, delay: 0.3 }}
              whileHover={reduceMotion ? undefined : { y: -8, transition: { duration: 0.2 } }}
              className="promo-banner-item"
            >
              <Image
                src={rightSrc}
                alt="KPSS hazırlığındaki en kapsamlı mobil uygulama"
                width={480}
                height={400}
                className="img-fluid w-100"
                style={{ objectFit: "contain", maxHeight: "520px" }}
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
