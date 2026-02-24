"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";
import { Check, Sparkles } from "lucide-react";
import { STORE_PLANS_URL } from "@/lib/constants/navigation";

const springTransition = {
  type: "spring" as const,
  stiffness: 260,
  damping: 22,
};

export interface PackageItem {
  name: string;
  /** Sadece ücretsiz paketlerde gösterilir; ücretlilerde mağazaya yönlendirilir */
  price?: string;
  period?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  /** Ücretli paketlerde true – fiyat göstermez, "Fiyatları gör" vb. gösterir */
  paid?: boolean;
  ctaText: string;
}

interface PackagesSectionProps {
  title: string;
  subtitle?: string;
  packages: PackageItem[];
}

export function PackagesSection({ title, subtitle, packages }: PackagesSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="py-5 py-lg-6 overflow-hidden"
      style={{ background: "linear-gradient(180deg, var(--kiri-mist-100) 0%, #fff 100%)" }}
    >
      <Container>
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={springTransition}
        >
          <h2
            className="fw-bold mb-2"
            style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", color: "var(--thamar-black-500)" }}
          >
            {title}
          </h2>
          {subtitle && <p className="text-muted mb-0">{subtitle}</p>}
        </motion.div>

        <Row className="g-4 justify-content-center">
          {packages.map((pkg, i) => (
            <Col key={pkg.name} xs={12} md={6} lg={6}>
              <motion.div
                className="h-100"
                initial={{ opacity: 0, y: reduceMotion ? 0 : 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  ...springTransition,
                  delay: reduceMotion ? 0 : i * 0.1,
                }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -8,
                        transition: { duration: 0.25 },
                      }
                }
              >
                <div
                  className={`h-100 rounded-4 p-4 d-flex flex-column position-relative overflow-hidden ${
                    pkg.highlighted ? "package-card-highlighted" : "package-card"
                  }`}
                  style={{
                    background: pkg.highlighted
                      ? "linear-gradient(135deg, var(--azul-500) 0%, #1d4ed8 100%)"
                      : "white",
                    boxShadow: pkg.highlighted
                      ? "0 20px 40px rgba(37, 99, 235, 0.25)"
                      : "0 4px 20px rgba(0,0,0,0.08)",
                    border: pkg.highlighted ? "none" : "1px solid var(--kiri-mist-200)",
                    transition: "box-shadow 0.3s ease",
                  }}
                >
                  {pkg.highlighted && (
                    <div
                      className="position-absolute top-0 end-0 m-2"
                      style={{ color: "rgba(255,255,255,0.9)" }}
                    >
                      <Sparkles size={20} />
                    </div>
                  )}
                  <div className="mb-3">
                    {pkg.highlighted && (
                      <span
                        className="badge mb-2 px-2 py-1"
                        style={{
                          background: "rgba(255,255,255,0.25)",
                          color: "white",
                          fontWeight: 600,
                          fontSize: "0.7rem",
                        }}
                      >
                        EN ÇOK TERCİH
                      </span>
                    )}
                    <h3
                      className="h4 fw-bold mb-1"
                      style={{
                        color: pkg.highlighted ? "white" : "var(--thamar-black-500)",
                      }}
                    >
                      {pkg.name}
                    </h3>
                    {pkg.paid ? (
                      <p
                        className="mb-0 small"
                        style={{
                          color: pkg.highlighted ? "rgba(255,255,255,0.9)" : "var(--azul-500)",
                          fontWeight: 500,
                        }}
                      >
                        Fiyatları mağazada inceleyin
                      </p>
                    ) : (
                      <div className="d-flex align-items-baseline gap-1">
                        <span
                          className="fs-3 fw-bold"
                          style={{
                            color: pkg.highlighted ? "white" : "var(--azul-500)",
                          }}
                        >
                          {pkg.price}
                        </span>
                        {pkg.period && (
                          <span
                            className="small"
                            style={{
                              color: pkg.highlighted ? "rgba(255,255,255,0.9)" : "var(--kiri-mist-500)",
                            }}
                          >
                            /{pkg.period}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <p
                    className="small mb-4"
                    style={{
                      color: pkg.highlighted ? "rgba(255,255,255,0.9)" : "var(--kiri-mist-500)",
                      minHeight: "2.5rem",
                    }}
                  >
                    {pkg.description}
                  </p>
                  <ul className="list-unstyled mb-4 flex-grow-1">
                    {pkg.features.map((f, j) => (
                      <li
                        key={j}
                        className="d-flex align-items-center gap-2 mb-2 small"
                        style={{
                          color: pkg.highlighted ? "rgba(255,255,255,0.95)" : "var(--foreground)",
                        }}
                      >
                        <Check
                          size={16}
                          className="flex-shrink-0"
                          style={{ color: pkg.highlighted ? "white" : "var(--azul-500)" }}
                          strokeWidth={2.5}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={STORE_PLANS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn btn-lg w-100 rounded-3 fw-semibold text-decoration-none ${
                      pkg.highlighted ? "btn-light" : "btn-primary"
                    }`}
                    style={{
                      border: pkg.highlighted ? "none" : undefined,
                      background: pkg.highlighted ? "white" : "var(--azul-500)",
                      color: pkg.highlighted ? "var(--azul-500)" : "white",
                    }}
                  >
                    {pkg.ctaText}
                  </Link>
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
