"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";
import { FeatureCard } from "./FeatureCard";

const springTransition = {
  type: "spring" as const,
  stiffness: 260,
  damping: 22,
};

interface Feature {
  title: string;
  description: string;
  icon?: string;
}

interface FeaturesSectionProps {
  title: string;
  features: Feature[];
}

export function FeaturesSection({ title, features }: FeaturesSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="py-5 py-lg-6 overflow-hidden">
      <Container>
        <motion.h2
          className="text-center h4 fw-bold mb-4 mb-lg-5"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={springTransition}
        >
          {title}
        </motion.h2>
        <Row xs={1} md={2} lg={4} className="g-4">
          {features.map((feature, i) => (
            <Col key={feature.title}>
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                index={i}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
