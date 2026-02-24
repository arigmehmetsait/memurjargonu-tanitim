import Link from "next/link";
import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";
import { Instagram, Youtube, Facebook } from "lucide-react";
import {
  SITE_NAME,
  SITE_DESCRIPTION,
  NAV_LINKS,
  FOOTER_LEGAL_LINKS,
  SOCIAL_LINKS,
  LOGO_PATH,
} from "@/lib/constants/navigation";

const SOCIAL_ICONS = { instagram: Instagram, youtube: Youtube, facebook: Facebook } as const;

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-4 py-md-5 mt-4">
      <Container>
        <Row className="g-3 g-md-4 text-center">
          <Col xs={12} md={4} className="order-1">
            <Link href="/" className="d-inline-block mb-2" title="Ana Sayfa">
              <Image
                src={LOGO_PATH}
                alt={SITE_NAME}
                width={100}
                height={40}
                className="footer-logo"
                style={{ objectFit: "contain" }}
              />
            </Link>
            <p className="mb-3 mx-auto" style={{ fontSize: "0.9375rem", maxWidth: "20rem" }}>
              {SITE_DESCRIPTION}
            </p>
            <div className="d-flex gap-3 justify-content-center">
              {SOCIAL_LINKS.map(({ href, label, icon }) => {
                const Icon = SOCIAL_ICONS[icon];
                return (
                  <Link
                    key={icon}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-white text-decoration-none opacity-hover"
                    aria-label={label}
                    title={label}
                  >
                    <Icon size={22} />
                  </Link>
                );
              })}
            </div>
          </Col>
          <Col xs={12} md={4} className="order-2">
            <ul className="list-unstyled mb-0 footer-nav-columns text-center text-md-start" style={{ fontSize: "0.9375rem" }}>
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href} className="mb-2">
                  <Link href={href} className="text-white text-decoration-none opacity-hover" title={label}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
          <Col xs={12} md={3} className="order-3">
            <ul className="list-unstyled mb-0 text-center text-md-start" style={{ fontSize: "0.9375rem" }}>
              {FOOTER_LEGAL_LINKS.map(({ href, label }) => (
                <li key={href} className="mb-2">
                  <Link href={href} className="text-white text-decoration-none opacity-hover" title={label}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
        <hr className="my-3 my-md-4" style={{ borderColor: "rgba(255,255,255,0.3)" }} />
        <p className="text-center mb-0" style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.9)" }}>
          © {currentYear} {SITE_NAME}. Tüm hakları saklıdır.
        </p>
      </Container>
    </footer>
  );
}
