import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "./AdminLoginForm";
import { isAdminAuthenticated } from "@/lib/auth-admin";
import Image from "next/image";
import { getPosts } from "@/lib/services/posts";
import { LOGO_PATH } from "@/lib/constants/navigation";
import { FileText, Layout } from "lucide-react";

interface SearchParams {
  error?: string;
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const authenticated = await isAdminAuthenticated();
  const { error } = await searchParams;

  if (!authenticated) {
    return (
      <div
        className="d-flex align-items-center justify-content-center py-5"
        style={{ minHeight: "calc(100vh - 12rem)" }}
      >
        <div
          className="rounded-4 shadow-sm border-0 overflow-hidden bg-white p-4 p-md-5"
          style={{
            width: "100%",
            maxWidth: 420,
            boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 2px 8px rgba(37, 99, 235, 0.06)",
          }}
        >
          <div className="text-center mb-4">
            <Image
              src={LOGO_PATH}
              alt="Memur Jargonu"
              width={56}
              height={56}
              className="rounded-3 mb-3"
            />
            <h1 className="h4 fw-bold mb-1" style={{ color: "var(--thamar-black-500)" }}>
              Admin Girişi
            </h1>
            <p className="text-muted small mb-0">Yönetim paneline erişmek için giriş yapın</p>
          </div>
          <AdminLoginForm error={error} />
        </div>
      </div>
    );
  }

  let postCount = 0;
  try {
    const posts = await getPosts();
    postCount = posts.length;
  } catch {
    // ignore
  }

  return (
    <>
      <h1 className="h4 fw-bold mb-4">Dashboard</h1>
      <p className="text-muted mb-4">Yönetim paneline hoş geldiniz. Hızlı erişim için aşağıdaki kartları kullanın.</p>

      <div className="row g-4">
        <div className="col-md-6 col-lg-4">
          <Link
            href="/admin/blog"
            className="text-decoration-none d-block rounded-3 p-4 h-100 border bg-white shadow-sm admin-dashboard-card"
          >
            <div
              className="rounded-2 d-flex align-items-center justify-content-center mb-3"
              style={{
                width: 48,
                height: 48,
                background: "rgba(37, 99, 235, 0.1)",
                color: "var(--azul-500)",
              }}
            >
              <FileText size={24} />
            </div>
            <h2 className="h5 fw-bold mb-2" style={{ color: "var(--thamar-black-500)" }}>
              Blog
            </h2>
            <p className="text-muted small mb-0">
              {postCount} yazı • Yazı ekle, düzenle veya sil
            </p>
          </Link>
        </div>
        <div className="col-md-6 col-lg-4">
          <Link
            href="/admin/content"
            className="text-decoration-none d-block rounded-3 p-4 h-100 border bg-white shadow-sm admin-dashboard-card"
          >
            <div
              className="rounded-2 d-flex align-items-center justify-content-center mb-3"
              style={{
                width: 48,
                height: 48,
                background: "rgba(37, 99, 235, 0.1)",
                color: "var(--azul-500)",
              }}
            >
              <Layout size={24} />
            </div>
            <h2 className="h5 fw-bold mb-2" style={{ color: "var(--thamar-black-500)" }}>
              Sayfa İçeriği
            </h2>
            <p className="text-muted small mb-0">
              Ana sayfa metinleri ve görselleri düzenle
            </p>
          </Link>
        </div>
      </div>
    </>
  );
}
