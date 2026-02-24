import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "react-bootstrap";
import { getPostBySlug } from "@/lib/services/posts";
import { formatDate } from "@/lib/utils";
import { getVideoEmbedSrc } from "@/lib/utils/video-embed";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Yazı Bulunamadı" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const videoEmbedSrc = post.videoUrl ? getVideoEmbedSrc(post.videoUrl) : null;
  const coverAsVideo = post.coverImage ? getVideoEmbedSrc(post.coverImage) : null;

  return (
    <article className="py-5">
      <Container>
        <Link href="/blog" className="text-decoration-none small text-muted d-inline-block mb-4">
          ← Bloga dön
        </Link>
        <header className="mb-4">
          <time className="text-muted small d-block mb-2">
            {formatDate(post.publishedAt)}
          </time>
          <h1 className="display-5 fw-bold">{post.title}</h1>
        </header>
        {coverAsVideo ? (
          <div className="ratio ratio-16x9 mb-4">
            <iframe
              src={coverAsVideo}
              title={post.title}
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="rounded"
            />
          </div>
        ) : post.coverImage ? (
          <div className="mb-4 rounded overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-100"
              style={{ maxHeight: 600, objectFit: "contain", objectPosition: "center" }}
            />
          </div>
        ) : null}
        {videoEmbedSrc && (
          <div className="ratio ratio-16x9 mb-4">
            <iframe
              src={videoEmbedSrc}
              title="Video"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="rounded"
            />
          </div>
        )}
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: post.body.replace(/\n/g, "<br />") }}
        />
        <Link href="/blog" className="btn btn-outline-primary mt-4">
          Tüm yazılar
        </Link>
      </Container>
    </article>
  );
}
