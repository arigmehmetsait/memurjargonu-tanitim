import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth-admin";
import { AdminPostForm } from "../AdminPostForm";

export default async function AdminBlogNewPage() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) redirect("/admin");

  return (
    <>
      <h1 className="h4 fw-bold mb-4">Yeni Yazı</h1>
      <AdminPostForm />
    </>
  );
}
