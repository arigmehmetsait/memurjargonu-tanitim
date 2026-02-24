"use client";

import { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Instagram, Youtube, Facebook } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants/navigation";

const SOCIAL_ICONS = { instagram: Instagram, youtube: Youtube, facebook: Facebook } as const;

export default function IletisimPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <h1 className="display-5 fw-bold text-center mb-4">İletişim</h1>
            <p className="lead text-center text-muted mb-4">
              Sorularınız için bize ulaşın.
            </p>
            <div className="d-flex justify-content-center gap-4 mb-5">
              {SOCIAL_LINKS.map(({ href, label, icon }) => {
                const Icon = SOCIAL_ICONS[icon];
                return (
                  <a
                    key={icon}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-decoration-none d-flex align-items-center gap-2"
                    aria-label={label}
                    title={label}
                  >
                    <Icon size={28} />
                    <span>{label}</span>
                  </a>
                );
              })}
            </div>

            {submitted ? (
              <Alert variant="success">
                Mesajınız alındı. En kısa sürede size dönüş yapacağız.
              </Alert>
            ) : (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Ad Soyad</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Adınız Soyadınız"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>E-posta</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="ornek@email.com"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Mesaj</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="message"
                    rows={5}
                    placeholder="Mesajınızı yazın..."
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" size="lg">
                  Gönder
                </Button>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
}
