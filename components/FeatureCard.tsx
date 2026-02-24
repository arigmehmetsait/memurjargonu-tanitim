"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Card } from "react-bootstrap";
import {
  PlayCircle,
  ClipboardCheck,
  Users,
  Briefcase,
  BookOpen,
  MessageCircle,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

const springTransition = {
  type: "spring" as const,
  stiffness: 260,
  damping: 22,
};

const iconMap: Record<string, LucideIcon> = {
  "play-circle": PlayCircle,
  "clipboard-check": ClipboardCheck,
  users: Users,
  briefcase: Briefcase,
  "book-open": BookOpen,
  "message-circle": MessageCircle,
  "trending-up": TrendingUp,
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: string;
  index?: number;
}

export function FeatureCard({ title, description, icon, index = 0 }: FeatureCardProps) {
  const reduceMotion = useReducedMotion();
  const IconComponent = icon ? iconMap[icon] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        ...springTransition,
        delay: reduceMotion ? 0 : index * 0.08,
      }}
      whileHover={reduceMotion ? undefined : { y: -4, transition: { duration: 0.2 } }}
    >
      <Card
        className="h-100 border-0 shadow-sm feature-card"
        style={{
          transition: "box-shadow 0.25s ease",
        }}
      >
        <Card.Body className="p-4">
          {IconComponent && (
            <div
              className="mb-3 d-inline-flex align-items-center justify-content-center rounded-3 p-2"
              style={{
                background: "linear-gradient(135deg, rgba(37,99,235,0.12) 0%, rgba(37,99,235,0.04) 100%)",
                color: "var(--azul-500)",
              }}
            >
              <IconComponent size={28} strokeWidth={2} />
            </div>
          )}
          <Card.Title className="h5 mb-2">{title}</Card.Title>
          <Card.Text className="text-muted small mb-0">{description}</Card.Text>
        </Card.Body>
      </Card>
    </motion.div>
  );
}
