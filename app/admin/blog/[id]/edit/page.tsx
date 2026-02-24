import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { isAdminAuthenticated } from "@/lib/auth-admin";
import { getPostById } from "@/lib/services/posts";
import { AdminPostForm } from "../../AdminPostForm";
import { DeletePostButton } from "@/components/DeletePostButton";

export default async function AdminBlogEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) redirect("/admin");

  const { id } = await params;
  const post = await getPostById(id);
  if (!post) notFound();

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h1 className="h4 fw-bold mb-0">Yazıyı Düzenle</h1>
        <div className="d-flex gap-2">
          <Link href="/admin/blog" className="btn btn-outline-secondary btn-sm">
            ← Listeye dön
          </Link>
          <DeletePostButton postId={post.id} postTitle={post.title} size="sm" />
        </div>
      </div>
      <AdminPostForm
        post={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          body: post.body,
          coverImage: post.coverImage,
          videoUrl: post.videoUrl,
          publishedAt: post.publishedAt.toISOString(),
        }}
      />
    </>
  );
}
