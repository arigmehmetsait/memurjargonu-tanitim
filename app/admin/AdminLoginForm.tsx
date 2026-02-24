"use client";

import { Form, Button, Alert } from "react-bootstrap";

const errorMessages: Record<string, string> = {
  missing: "Kullanıcı adı ve şifre gerekli.",
  invalid: "Kullanıcı adı veya şifre hatalı.",
  server: "Bir hata oluştu. Lütfen tekrar deneyin.",
};

export function AdminLoginForm({ error }: { error?: string }) {
  return (
    <>
      {error && (
        <Alert
          variant="danger"
          className="mb-4 py-2 px-3 rounded-3 border-0"
          style={{ background: "rgba(220, 53, 69, 0.1)", color: "#b02a37" }}
        >
          <small className="fw-medium">{errorMessages[error] ?? "Giriş yapılamadı."}</small>
        </Alert>
      )}
      <Form method="post" action="/api/admin/login">
        <Form.Group className="mb-3">
          <Form.Label className="small fw-medium text-muted">Kullanıcı adı</Form.Label>
          <Form.Control
            type="text"
            name="username"
            autoComplete="username"
            required
            placeholder="Kullanıcı adınızı girin"
            className="py-2 rounded-3 border"
            style={{ borderColor: "var(--kiri-mist-200)" }}
          />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label className="small fw-medium text-muted">Şifre</Form.Label>
          <Form.Control
            type="password"
            name="password"
            autoComplete="current-password"
            required
            placeholder="Şifrenizi girin"
            className="py-2 rounded-3 border"
            style={{ borderColor: "var(--kiri-mist-200)" }}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="w-100 py-2 rounded-3 fw-semibold"
          style={{
            background: "var(--azul-500)",
            border: "none",
            fontSize: "0.95rem",
          }}
        >
          Giriş Yap
        </Button>
      </Form>
    </>
  );
}
