import { Container } from "react-bootstrap";
import { isAdminAuthenticated } from "@/lib/auth-admin";
import { AdminNavbar } from "@/components/AdminNavbar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authenticated = await isAdminAuthenticated();

  return (
    <>
      {authenticated && <AdminNavbar />}
      <Container>{children}</Container>
    </>
  );
}
