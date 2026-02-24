"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Form, Button } from "react-bootstrap";
import { slugify } from "@/lib/utils";
import { getVideoThumbnailUrl, getVideoEmbedSrc } from "@/lib/utils/video-embed";
import { ImagePlus, X } from "lucide-react";

interface AdminPostFormProps {
  post?: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    body: string;
    coverImage?: string;
    videoUrl?: string;
    publishedAt: string;
  };
}

export function AdminPostForm({ post }: AdminPostFormProps) {
  const [slugManual, setSlugManual] = useState(false);
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [body, setBody] = useState(post?.body ?? "");
  const [coverImage, setCoverImage] = useState(post?.coverImage ?? "");
  const [videoUrl, setVideoUrl] = useState(post?.videoUrl ?? "");
  const [publishedAt, setPublishedAt] = useState(
    post?.publishedAt ? post.publishedAt.slice(0, 16) : new Date().toISOString().slice(0, 16)
  );
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setTitle(v);
    if (!slugManual) setSlug(slugify(v));
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: fd,
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Yükleme başarısız");
      setCoverImage(data.url);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Yükleme başarısız");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const action = post ? `/api/admin/posts/${post.id}` : "/api/admin/posts";
  const method = post ? "PUT" : "POST";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("_method", method);
    const url = new URL(action, window.location.origin).toString();
    fetch(url, {
          method: "POST",
          body: data,
          credentials: "include",
          headers: { "X-HTTP-Method-Override": method },
        })
      .then((r) => {
        if (r.ok) window.location.href = "/admin/blog";
        else setSaving(false);
      })
      .catch(() => setSaving(false));
  };

  return (
    <Form
      action={action}
      method="POST"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="_method" value={method} />
      <Form.Group className="mb-3">
        <Form.Label>Başlık</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleTitleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Slug</Form.Label>
        <Form.Control
          type="text"
          name="slug"
          value={slug}
          onChange={(e) => {
            setSlug(e.target.value);
            setSlugManual(true);
          }}
          onBlur={() => setSlugManual(true)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Kapak Görseli</Form.Label>
        <div className="d-flex flex-wrap gap-3 align-items-start">
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleImageSelect}
              className="d-none"
              id="cover-image-input"
            />
            <Button
              type="button"
              variant="outline-primary"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              <ImagePlus size={18} className="me-1" />
              {uploading ? "Yükleniyor..." : "Resim Seç"}
            </Button>
          </div>
          <Form.Control
            type="text"
            name="coverImage"
            placeholder="veya URL yapıştırın..."
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            className="flex-grow-1"
            style={{ maxWidth: "20rem" }}
          />
        </div>
        {uploadError && (
          <Form.Text className="text-danger d-block mt-1">{uploadError}</Form.Text>
        )}
        {coverImage && (
          <div className="mt-3 position-relative d-inline-block" style={{ maxWidth: 200 }}>
            {getVideoThumbnailUrl(coverImage) ? (
              <img
                src={getVideoThumbnailUrl(coverImage)!}
                alt="Önizleme"
                className="rounded border"
                style={{ width: 200, height: 120, objectFit: "cover" }}
              />
            ) : getVideoEmbedSrc(coverImage) ? (
              <div className="rounded border overflow-hidden" style={{ width: 200, height: 120 }}>
                <iframe
                  src={getVideoEmbedSrc(coverImage)!}
                  title="Video önizleme"
                  className="w-100 h-100"
                  style={{ pointerEvents: "none" }}
                />
              </div>
            ) : (
              <Image
                src={coverImage}
                alt="Önizleme"
                width={200}
                height={120}
                className="rounded border"
                style={{ maxHeight: 120, objectFit: "cover" }}
                unoptimized
              />
            )}
            <button
              type="button"
              className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 rounded-circle p-1"
              onClick={() => setCoverImage("")}
              aria-label="Görseli kaldır"
            >
              <X size={14} />
            </button>
          </div>
        )}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Video URL (YouTube, Vimeo vb.)</Form.Label>
        <Form.Control
          type="url"
          name="videoUrl"
          placeholder="https://www.youtube.com/watch?v=..."
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
        {videoUrl && (getVideoThumbnailUrl(videoUrl) || getVideoEmbedSrc(videoUrl)) && (
          <div className="mt-2">
            <Form.Text className="d-block mb-1 text-muted">Video önizleme</Form.Text>
            {getVideoThumbnailUrl(videoUrl) ? (
              <img
                src={getVideoThumbnailUrl(videoUrl)!}
                alt="Video önizleme"
                className="rounded border"
                style={{ width: 200, height: 120, objectFit: "cover" }}
              />
            ) : (
              <div className="rounded border overflow-hidden" style={{ width: 200, height: 120 }}>
                <iframe
                  src={getVideoEmbedSrc(videoUrl)!}
                  title="Video önizleme"
                  className="w-100 h-100"
                  style={{ pointerEvents: "none" }}
                />
              </div>
            )}
          </div>
        )}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Özet</Form.Label>
        <Form.Control
          as="textarea"
          name="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Gövde</Form.Label>
        <Form.Control
          as="textarea"
          name="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={10}
          required
        />
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label>Yayın Tarihi</Form.Label>
        <Form.Control
          type="datetime-local"
          name="publishedAt"
          value={publishedAt}
          onChange={(e) => setPublishedAt(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={saving}>
        {saving ? "Kaydediliyor..." : post ? "Güncelle" : "Oluştur"}
      </Button>
    </Form>
  );
}
