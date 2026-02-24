"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar, Nav, Container } from "react-bootstrap";
import {
  NAV_LINKS,
  LOGO_PATH,
  SITE_NAME,
} from "@/lib/constants/navigation";
import { AppStoreBadges } from "./AppStoreBadges";

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className={`sticky-top site-header ${scrolled ? "scrolled" : ""}`}
    >
      <Navbar expand="lg" bg="transparent" collapseOnSelect className="py-3 py-lg-2">
        <Container>
          <Navbar.Brand as={Link} href="/" className="d-flex align-items-center gap-2" title="Ana Sayfa">
            <Image
              src={LOGO_PATH}
              alt={SITE_NAME}
              width={100}
              height={40}
              priority
              className="d-inline-block align-top"
              style={{ objectFit: "contain" }}
            />
             
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="main-navbar"
            className="border-0"
            style={{ padding: "0.5rem" }}
            aria-label="Menüyü aç"
          />
          <Navbar.Collapse id="main-navbar" className="flex-grow-1">
            <div className="d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center w-100 gap-3 gap-lg-0">
              <div className="flex-grow-1 d-flex justify-content-center order-2 order-lg-1">
                <Nav className="align-items-lg-center gap-1">
                  {NAV_LINKS.map(({ href, label, primary }) => (
                    <Nav.Link
                      key={href}
                      as={Link}
                      href={href}
                      title={label}
                      className={`px-3 py-2 rounded header-nav-link ${
                        primary ? "header-nav-link-primary" : "header-nav-link-secondary"
                      }`}
                    >
                      {label}
                    </Nav.Link>
                  ))}
                </Nav>
              </div>
              <div className="header-cta-wrapper d-flex justify-content-center justify-content-lg-end order-1 order-lg-2 flex-shrink-0">
                <AppStoreBadges
                  size="sm"
                  theme="light"
                  animated={false}
                  stacked
                  className="justify-content-center align-items-lg-end"
                />
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
