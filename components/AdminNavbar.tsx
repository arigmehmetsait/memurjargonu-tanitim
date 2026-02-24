"use client";

import Link from "next/link";
import { Container, Nav, Navbar } from "react-bootstrap";

export function AdminNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="md" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} href="/admin">Admin</Navbar.Brand>
        <Navbar.Toggle aria-controls="admin-nav" />
        <Navbar.Collapse id="admin-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/admin/blog">Blog</Nav.Link>
            <Nav.Link as={Link} href="/admin/content">Sayfa İçeriği</Nav.Link>
          </Nav>
          <form method="post" action="/api/admin/logout">
            <button type="submit" className="btn btn-outline-light btn-sm">
              Çıkış
            </button>
          </form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
