"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";

const springTransition = {
  type: "spring" as const,
  stiffness: 260,
  damping: 22,
};

export interface StatItem {
  value: string;
  label: string;
}

interface StatsSectionProps {
  title: string;
  subtitle?: string;
  stats: StatItem[];
}

export function StatsSection({ title, subtitle, stats }: StatsSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="py-5 py-lg-6 overflow-hidden"
      style={{ background: "var(--kiri-mist-100)" }}
    >
      <Container>
        <motion.h2
          className="text-center fw-bold mb-2"
          style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", color: "var(--thamar-black-500)" }}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={springTransition}
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            className="text-center text-muted mb-4 mb-lg-5"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ ...springTransition, delay: reduceMotion ? 0 : 0.05 }}
          >
            {subtitle}
          </motion.p>
        )}
        <Row className="g-4 justify-content-center">
          {stats.map((stat, i) => (
            <Col key={stat.label} xs={6} md={4} lg={3}>
              <motion.div
                className="text-center p-4 rounded-4"
                style={{
                  background: "white",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                }}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  ...springTransition,
                  delay: reduceMotion ? 0 : i * 0.08,
                }}
                whileHover={reduceMotion ? undefined : { y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
              >
                <span
                  className="d-block fw-bold mb-1"
                  style={{
                    fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                    color: "var(--azul-500)",
                  }}
                >
                   {stat.value}
                </span>
                <span className="text-muted small">{stat.label}</span>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
