"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";
import { Card } from "react-bootstrap";

const springTransition = {
  type: "spring" as const,
  stiffness: 260,
  damping: 22,
};

export interface WhyUsItem {
  title: string;
  description: string;
}

interface WhyUsSectionProps {
  title: string;
  subtitle?: string;
  items: (string | WhyUsItem)[];
}

function isWhyUsItem(item: string | WhyUsItem): item is WhyUsItem {
  return typeof item === "object" && "title" in item && "description" in item;
}

export function WhyUsSection({ title, subtitle, items }: WhyUsSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="py-5 py-lg-6 overflow-hidden">
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
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={springTransition}
          >
            {subtitle}
          </motion.p>
        )}
        <Row xs={1} md={2} lg={3} className="g-4">
          {items.map((item, i) => {
            const cardTitle = isWhyUsItem(item) ? item.title : String(item);
            const cardDesc = isWhyUsItem(item) ? item.description : undefined;

            return (
              <Col key={i}>
                <motion.div
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    ...springTransition,
                    delay: reduceMotion ? 0 : i * 0.06,
                  }}
                  whileHover={reduceMotion ? undefined : { y: -4, transition: { duration: 0.2 } }}
                >
                  <Card
                    className="h-100 border-0 shadow-sm feature-card"
                    style={{
                      transition: "box-shadow 0.25s ease",
                      background: "white",
                    }}
                  >
                    <Card.Body className="p-4">
                      <Card.Title className="h5 mb-3">{cardTitle}</Card.Title>
                      {cardDesc ? (
                        <Card.Text className="text-muted small mb-0">{cardDesc}</Card.Text>
                      ) : null}
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
}
