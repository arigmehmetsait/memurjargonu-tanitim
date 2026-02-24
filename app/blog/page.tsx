import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { getPosts } from "@/lib/services/posts";
import { formatDate } from "@/lib/utils";
import { getVideoThumbnailUrl, getVideoEmbedSrc } from "@/lib/utils/video-embed";

export const metadata = {
  title: "Blog",
  description: "Memur Jargonu blog yazıları ve güncellemeler.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  let posts: Awaited<ReturnType<typeof getPosts>> = [];
  try {
    posts = await getPosts();
  } catch {
    posts = [];
  }

  return (
    <section className="py-5">
      <Container>
        <h1 className="display-5 fw-bold text-center mb-4">Blog</h1>
        <p className="lead text-center text-muted mb-5">
          Güncel yazılar ve duyurular.
        </p>

        {posts.length === 0 ? (
          <p className="text-center text-muted">Henüz yazı bulunmuyor.</p>
        ) : (
          <Row xs={1} md={2} lg={3} className="g-4">
            {posts.map((post) => {
              const thumbSrc = post.coverImage
                ? (getVideoThumbnailUrl(post.coverImage) ??
                    (!getVideoEmbedSrc(post.coverImage) ? post.coverImage : null))
                : post.videoUrl
                  ? getVideoThumbnailUrl(post.videoUrl)
                  : null;
              return (
              <Col key={post.id}>
                <div className="card h-100 border-0 shadow-sm overflow-hidden">
                  {thumbSrc && (
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-decoration-none d-block overflow-hidden"
                      style={{ aspectRatio: "16/9" }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={thumbSrc}
                        alt={post.title}
                        className="card-img-top w-100 h-100"
                        style={{ objectFit: "cover", objectPosition: "center" }}
                      />
                    </Link>
                  )}
                  <div className="card-body d-flex flex-column">
                    <small className="text-muted d-block mb-2">
                      {formatDate(post.publishedAt)}
                    </small>
                    <h5 className="card-title">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-decoration-none text-dark"
                      >
                        {post.title}
                      </Link>
                    </h5>
                    <p className="card-text text-muted small flex-grow-1">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="btn btn-outline-primary mt-2 align-self-start d-inline-flex align-items-center gap-1 fw-semibold"
                      style={{ borderRadius: "999px", padding: "0.375rem 1.25rem", fontSize: "0.98rem" }}
                    >
                      Devamını oku
                      <svg width="1em" height="1em" fill="currentColor" className="ms-1" viewBox="0 0 16 16">
                        <path d="M4.5 8a.5.5 0 0 1 .5-.5h5.793l-2.147-2.146a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.793 8.5H5a.5.5 0 0 1-.5-.5z"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              </Col>
            );
            })}
          </Row>
        )}
      </Container>
    </section>
  );
}
