import Link from "next/link";
import { redirect } from "next/navigation";
import { Table } from "react-bootstrap";
import { isAdminAuthenticated } from "@/lib/auth-admin";
import { getPosts } from "@/lib/services/posts";
import { formatDate } from "@/lib/utils";
import { DeletePostButton } from "@/components/DeletePostButton";

export default async function AdminBlogPage() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) redirect("/admin");

  let posts: Awaited<ReturnType<typeof getPosts>> = [];
  try {
    posts = await getPosts();
  } catch (e) {
    console.error("Posts fetch error:", e);
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h4 fw-bold mb-0">Blog Yazıları</h1>
        <Link href="/admin/blog/new" className="btn btn-primary">
          Yeni Yazı
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-muted">Henüz yazı yok.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Başlık</th>
              <th>Slug</th>
              <th>Tarih</th>
              <th>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td><code>{post.slug}</code></td>
                <td>{formatDate(post.publishedAt)}</td>
                <td>
                  <div className="d-flex gap-2 flex-wrap">
                    <Link href={`/admin/blog/${post.id}/edit`} className="btn btn-sm btn-outline-primary">
                      Düzenle
                    </Link>
                    <DeletePostButton postId={post.id} postTitle={post.title} size="sm" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}
