import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth-admin";
import { AdminHomepageContentForm } from "@/components/AdminHomepageContentForm";

export default async function AdminContentPage() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) redirect("/admin");

  return (
    <>
      <h1 className="h4 fw-bold mb-4">Ana Sayfa İçeriği</h1>
      <p className="text-muted mb-4">
        Ana sayfa bölümlerini buradan düzenleyebilirsiniz. Değişiklikler anında yansır. Veritabanında
        kayıt yoksa varsayılan değerler kullanılır.
      </p>
      <AdminHomepageContentForm />
    </>
  );
}
