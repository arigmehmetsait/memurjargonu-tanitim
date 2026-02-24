"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Container } from "react-bootstrap";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const springTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
};

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

interface TestimonialsCarouselProps {
  title: string;
  subtitle?: string;
  testimonials: Testimonial[];
}

export function TestimonialsCarousel({ title, subtitle, testimonials }: TestimonialsCarouselProps) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % testimonials.length);
  }, [testimonials.length]);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  if (!testimonials.length) return null;

  const current = testimonials[index];

  return (
    <section
      className="py-5 py-lg-6 overflow-hidden"
      style={{ background: "var(--kiri-mist-100)" }}
    >
      <Container>
        <motion.h2
          className="text-center fw-bold mb-2"
          style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", color: "var(--thamar-black-500)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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

        <motion.div
          className="position-relative mx-auto"
          style={{ maxWidth: "42rem" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div
            className="rounded-4 p-4 p-lg-5 shadow-sm position-relative"
            style={{
              background: "white",
              border: "1px solid var(--kiri-mist-200)",
            }}
          >
            <Quote
              className="text-primary opacity-25 mb-2"
              size={36}
              style={{ color: "var(--azul-500)" }}
              aria-hidden
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: reduceMotion ? 0 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: reduceMotion ? 0 : -20 }}
                transition={springTransition}
              >
                <p className="fs-5 mb-4 text-dark" style={{ lineHeight: 1.6 }}>
                  &ldquo;{current.quote}&rdquo;
                </p>
                <div>
                  <strong className="text-dark">{current.author}</strong>
                  <span className="text-muted ms-2">{current.role}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="d-flex align-items-center justify-content-center gap-3 mt-4">
            <button
              type="button"
              onClick={goPrev}
              className="btn btn-outline-primary rounded-circle p-2"
              aria-label="Önceki yorum"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="d-flex gap-1">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className="btn p-1 rounded"
                  aria-label={`Yorum ${i + 1}`}
                  aria-pressed={i === index}
                  style={{
                    width: 8,
                    height: 8,
                    background: i === index ? "var(--azul-500)" : "var(--kiri-mist-500)",
                    border: "none",
                  }}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={goNext}
              className="btn btn-outline-primary rounded-circle p-2"
              aria-label="Sonraki yorum"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
