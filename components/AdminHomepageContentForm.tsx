"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Form, Button, Card, Accordion, Spinner } from "react-bootstrap";
import {
  DEFAULT_HERO,
  DEFAULT_STATS,
  DEFAULT_FEATURES,
  DEFAULT_WHY_US,
  DEFAULT_PACKAGES,
  DEFAULT_TESTIMONIALS,
} from "@/lib/constants/default-content";
import type { HomepageContent, HomepageImages } from "@/types";
import { Plus, Trash2, ImagePlus, X } from "lucide-react";

const IMAGE_FIELDS: { key: keyof HomepageImages; label: string }[] = [
  { key: "heroBannerLeft", label: "Hero sol banner" },
  { key: "heroBannerRight", label: "Hero sağ banner" },
  { key: "heroBannerBackground", label: "Hero arka plan görseli" },
  { key: "promoBannerLeft", label: "Promo sol" },
  { key: "promoBannerCenter", label: "Promo orta" },
  { key: "promoBannerRight", label: "Promo sağ" },
  { key: "mobileAppBanner", label: "Mobil uygulama banner" },
];

const FEATURE_ICONS = ["play-circle", "clipboard-check", "users", "briefcase", "book-open", "message-circle", "trending-up", "star"];

function mergeWithDefaults(): HomepageContent {
  return {
    hero: { ...DEFAULT_HERO },
    stats: {
      title: "Rakamlarla Memur Jargonu",
      subtitle: "Her gün daha fazla içerik ve kullanıcı",
      items: [...DEFAULT_STATS],
    },
    features: { title: "Özellikler", items: [...DEFAULT_FEATURES] },
    whyUs: { ...DEFAULT_WHY_US },
    packages: {
      title: "Abonelik Paketleri",
      subtitle: "İhtiyacınıza uygun paketi seçin, sınavlara en iyi şekilde hazırlanın.",
      items: [...DEFAULT_PACKAGES],
    },
    testimonials: {
      title: "Kullanıcılarımız Hakkımızda Neler Söylüyor?",
      items: [...DEFAULT_TESTIMONIALS],
    },
  };
}

export function AdminHomepageContentForm() {
  const [content, setContent] = useState<HomepageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/homepage-content", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        if (data?.hero) setContent(data);
        else setContent(mergeWithDefaults());
      })
      .catch(() => setContent(mergeWithDefaults()))
      .finally(() => setLoading(false));
  }, []);

  const update = <K extends keyof HomepageContent>(key: K, value: HomepageContent[K]) => {
    if (!content) return;
    setContent({ ...content, [key]: value });
  };

  const setImage = (key: keyof HomepageImages, url: string) => {
    if (!content) return;
    const images = { ...content.images, [key]: url || undefined };
    setContent({ ...content, images });
  };

  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);

  const handleImageUpload = async (key: keyof HomepageImages, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingKey(key);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd, credentials: "include" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Yükleme başarısız");
      setImage(key, data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Yükleme başarısız");
    } finally {
      setUploadingKey(null);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/homepage-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Kayıt başarısız");
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kayıt başarısız");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!content) return null;

  return (
    <Form onSubmit={handleSubmit}>
      {error && (
        <div className="alert alert-danger mb-4" role="alert">
          {error}
        </div>
      )}

      <Accordion defaultActiveKey="hero" className="mb-4">
        {/* Hero */}
        <Accordion.Item eventKey="hero">
          <Accordion.Header>Hero (Üst Banner)</Accordion.Header>
          <Accordion.Body>
            <Form.Group className="mb-3">
              <Form.Label>Başlık</Form.Label>
              <Form.Control
                value={content.hero.title}
                onChange={(e) => update("hero", { ...content.hero, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Alt başlık</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={content.hero.subtitle}
                onChange={(e) => update("hero", { ...content.hero, subtitle: e.target.value })}
              />
            </Form.Group>
          </Accordion.Body>
        </Accordion.Item>

        {/* Görseller */}
        <Accordion.Item eventKey="images">
          <Accordion.Header>Görseller (Resim Seç ile yükle, boş bırakırsan varsayılan kullanılır)</Accordion.Header>
          <Accordion.Body>
            {IMAGE_FIELDS.map(({ key, label }) => {
              const url = content.images?.[key] ?? "";
              return (
                <Form.Group key={key} className="mb-4">
                  <Form.Label className="fw-medium">{label}</Form.Label>
                  <div className="d-flex flex-wrap gap-3 align-items-start">
                    <div>
                      <input
                        ref={(el) => { fileInputRefs.current[key] = el; }}
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        className="d-none"
                        onChange={(e) => handleImageUpload(key, e)}
                      />
                      <Button
                        type="button"
                        variant="outline-primary"
                        size="sm"
                        onClick={() => fileInputRefs.current[key]?.click()}
                        disabled={!!uploadingKey}
                      >
                        <ImagePlus size={18} className="me-1" />
                        {uploadingKey === key ? "Yükleniyor..." : "Resim Seç"}
                      </Button>
                    </div>
                    <Form.Control
                      type="text"
                      placeholder="veya URL yapıştırın..."
                      value={url}
                      onChange={(e) => setImage(key, e.target.value)}
                      className="flex-grow-1"
                      style={{ maxWidth: "24rem" }}
                    />
                  </div>
                  {url && (
                    <div className="mt-2 position-relative d-inline-block">
                      <Image
                        src={url}
                        alt={label}
                        width={160}
                        height={100}
                        className="rounded border"
                        style={{ objectFit: "cover", maxHeight: 100 }}
                        unoptimized
                      />
                      <button
                        type="button"
                        className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 rounded-circle p-1"
                        onClick={() => setImage(key, "")}
                        aria-label="Görseli kaldır"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </Form.Group>
              );
            })}
          </Accordion.Body>
        </Accordion.Item>

        {/* Stats */}
        <Accordion.Item eventKey="stats">
          <Accordion.Header>İstatistikler</Accordion.Header>
          <Accordion.Body>
            <Form.Group className="mb-3">
              <Form.Label>Bölüm Başlığı</Form.Label>
              <Form.Control
                value={content.stats.title}
                onChange={(e) => update("stats", { ...content.stats, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Alt Başlık</Form.Label>
              <Form.Control
                value={content.stats.subtitle}
                onChange={(e) => update("stats", { ...content.stats, subtitle: e.target.value })}
              />
            </Form.Group>
            {content.stats.items.map((item, i) => (
              <Card key={i} className="mb-3 p-3">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <strong>İstatistik {i + 1}</strong>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => {
                      const items = content.stats.items.filter((_, j) => j !== i);
                      update("stats", { ...content.stats, items });
                    }}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
                <Form.Group className="mb-2">
                  <Form.Control
                    placeholder="Değer (örn: 50+)"
                    value={item.value}
                    onChange={(e) => {
                      const items = [...content.stats.items];
                      items[i] = { ...item, value: e.target.value };
                      update("stats", { ...content.stats, items });
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    placeholder="Etiket (örn: Eğitim Videosu)"
                    value={item.label}
                    onChange={(e) => {
                      const items = [...content.stats.items];
                      items[i] = { ...item, label: e.target.value };
                      update("stats", { ...content.stats, items });
                    }}
                  />
                </Form.Group>
              </Card>
            ))}
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() =>
                update("stats", {
                  ...content.stats,
                  items: [...content.stats.items, { value: "", label: "" }],
                })
              }
            >
              <Plus size={16} className="me-1" />
              İstatistik Ekle
            </Button>
          </Accordion.Body>
        </Accordion.Item>

        {/* Features */}
        <Accordion.Item eventKey="features">
          <Accordion.Header>Özellikler</Accordion.Header>
          <Accordion.Body>
            <Form.Group className="mb-3">
              <Form.Label>Bölüm Başlığı</Form.Label>
              <Form.Control
                value={content.features.title}
                onChange={(e) => update("features", { ...content.features, title: e.target.value })}
              />
            </Form.Group>
            {content.features.items.map((item, i) => (
              <Card key={i} className="mb-3 p-3">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <strong>Özellik {i + 1}</strong>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => {
                      const items = content.features.items.filter((_, j) => j !== i);
                      update("features", { ...content.features, items });
                    }}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
                <Form.Group className="mb-2">
                  <Form.Label className="small">Başlık</Form.Label>
                  <Form.Control
                    value={item.title}
                    onChange={(e) => {
                      const items = [...content.features.items];
                      items[i] = { ...item, title: e.target.value };
                      update("features", { ...content.features, items });
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label className="small">Açıklama</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={item.description}
                    onChange={(e) => {
                      const items = [...content.features.items];
                      items[i] = { ...item, description: e.target.value };
                      update("features", { ...content.features, items });
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="small">İkon</Form.Label>
                  <Form.Select
                    value={item.icon ?? ""}
                    onChange={(e) => {
                      const items = [...content.features.items];
                      items[i] = { ...item, icon: e.target.value || undefined };
                      update("features", { ...content.features, items });
                    }}
                  >
                    {FEATURE_ICONS.map((ic) => (
                      <option key={ic} value={ic}>
                        {ic}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Card>
            ))}
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() =>
                update("features", {
                  ...content.features,
                  items: [
                    ...content.features.items,
                    { title: "", description: "", icon: "star" },
                  ],
                })
              }
            >
              <Plus size={16} className="me-1" />
              Özellik Ekle
            </Button>
          </Accordion.Body>
        </Accordion.Item>

        {/* Why Us */}
        <Accordion.Item eventKey="whyUs">
          <Accordion.Header>Neden Biz</Accordion.Header>
          <Accordion.Body>
            <Form.Group className="mb-3">
              <Form.Label>Başlık</Form.Label>
              <Form.Control
                value={content.whyUs.title}
                onChange={(e) => update("whyUs", { ...content.whyUs, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Alt Başlık</Form.Label>
              <Form.Control
                value={content.whyUs.subtitle}
                onChange={(e) => update("whyUs", { ...content.whyUs, subtitle: e.target.value })}
              />
            </Form.Group>
            {content.whyUs.items.map((item, i) => (
              <Card key={i} className="mb-3 p-3">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <strong>Madde {i + 1}</strong>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => {
                      const items = content.whyUs.items.filter((_, j) => j !== i);
                      update("whyUs", { ...content.whyUs, items });
                    }}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
                <Form.Group className="mb-2">
                  <Form.Control
                    placeholder="Başlık"
                    value={item.title}
                    onChange={(e) => {
                      const items = [...content.whyUs.items];
                      items[i] = { ...item, title: e.target.value };
                      update("whyUs", { ...content.whyUs, items });
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Açıklama"
                    value={item.description}
                    onChange={(e) => {
                      const items = [...content.whyUs.items];
                      items[i] = { ...item, description: e.target.value };
                      update("whyUs", { ...content.whyUs, items });
                    }}
                  />
                </Form.Group>
              </Card>
            ))}
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() =>
                update("whyUs", {
                  ...content.whyUs,
                  items: [...content.whyUs.items, { title: "", description: "" }],
                })
              }
            >
              <Plus size={16} className="me-1" />
              Madde Ekle
            </Button>
          </Accordion.Body>
        </Accordion.Item>

        {/* Packages */}
        <Accordion.Item eventKey="packages">
          <Accordion.Header>Paketler</Accordion.Header>
          <Accordion.Body>
            <Form.Group className="mb-3">
              <Form.Label>Bölüm Başlığı</Form.Label>
              <Form.Control
                value={content.packages.title}
                onChange={(e) => update("packages", { ...content.packages, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Alt Başlık</Form.Label>
              <Form.Control
                value={content.packages.subtitle}
                onChange={(e) =>
                  update("packages", { ...content.packages, subtitle: e.target.value })
                }
              />
            </Form.Group>
            {content.packages.items.map((pkg, i) => (
              <Card key={i} className="mb-4 p-3">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <strong>Paket: {pkg.name || "(Adsız)"}</strong>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => {
                      const items = content.packages.items.filter((_, j) => j !== i);
                      update("packages", { ...content.packages, items });
                    }}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
                <Form.Group className="mb-2">
                  <Form.Label className="small">Paket adı</Form.Label>
                  <Form.Control
                    value={pkg.name}
                    onChange={(e) => {
                      const items = [...content.packages.items];
                      items[i] = { ...pkg, name: e.target.value };
                      update("packages", { ...content.packages, items });
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label className="small">Fiyat (örn: ₺0)</Form.Label>
                  <Form.Control
                    value={pkg.price ?? ""}
                    onChange={(e) => {
                      const items = [...content.packages.items];
                      items[i] = { ...pkg, price: e.target.value || undefined };
                      update("packages", { ...content.packages, items });
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Check
                    type="checkbox"
                    label="Ücretli (fiyat gösterme)"
                    checked={!!pkg.paid}
                    onChange={(e) => {
                      const items = [...content.packages.items];
                      items[i] = { ...pkg, paid: e.target.checked };
                      update("packages", { ...content.packages, items });
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Check
                    type="checkbox"
                    label="Vurgulu paket (ön plana çıkar)"
                    checked={!!pkg.highlighted}
                    onChange={(e) => {
                      const items = [...content.packages.items];
                      items[i] = { ...pkg, highlighted: e.target.checked };
                      update("packages", { ...content.packages, items });
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label className="small">Açıklama</Form.Label>
                  <Form.Control
                    value={pkg.description}
                    onChange={(e) => {
                      const items = [...content.packages.items];
                      items[i] = { ...pkg, description: e.target.value };
                      update("packages", { ...content.packages, items });
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label className="small">Özellikler (her satır bir madde)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={pkg.features?.join("\n") ?? ""}
                    onChange={(e) => {
                      const items = [...content.packages.items];
                      const features = e.target.value.split("\n").filter(Boolean);
                      items[i] = { ...pkg, features };
                      update("packages", { ...content.packages, items });
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="small">Buton metni</Form.Label>
                  <Form.Control
                    value={pkg.ctaText}
                    onChange={(e) => {
                      const items = [...content.packages.items];
                      items[i] = { ...pkg, ctaText: e.target.value };
                      update("packages", { ...content.packages, items });
                    }}
                  />
                </Form.Group>
              </Card>
            ))}
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() =>
                update("packages", {
                  ...content.packages,
                  items: [
                    ...content.packages.items,
                    {
                      name: "",
                      description: "",
                      features: [],
                      ctaText: "Hemen Başla",
                    },
                  ],
                })
              }
            >
              <Plus size={16} className="me-1" />
              Paket Ekle
            </Button>
          </Accordion.Body>
        </Accordion.Item>

        {/* Testimonials */}
        <Accordion.Item eventKey="testimonials">
          <Accordion.Header>Kullanıcı Yorumları</Accordion.Header>
          <Accordion.Body>
            <Form.Group className="mb-3">
              <Form.Label>Bölüm Başlığı</Form.Label>
              <Form.Control
                value={content.testimonials.title}
                onChange={(e) =>
                  update("testimonials", { ...content.testimonials, title: e.target.value })
                }
              />
            </Form.Group>
            {content.testimonials.items.map((item, i) => (
              <Card key={i} className="mb-3 p-3">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <strong>Yorum {i + 1}</strong>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => {
                      const items = content.testimonials.items.filter((_, j) => j !== i);
                      update("testimonials", { ...content.testimonials, items });
                    }}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
                <Form.Group className="mb-2">
                  <Form.Label className="small">Yorum metni</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={item.quote}
                    onChange={(e) => {
                      const items = [...content.testimonials.items];
                      items[i] = { ...item, quote: e.target.value };
                      update("testimonials", { ...content.testimonials, items });
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Control
                    placeholder="Yazar adı"
                    value={item.author}
                    onChange={(e) => {
                      const items = [...content.testimonials.items];
                      items[i] = { ...item, author: e.target.value };
                      update("testimonials", { ...content.testimonials, items });
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    placeholder="Ünvan (örn: KPSS Adayı)"
                    value={item.role}
                    onChange={(e) => {
                      const items = [...content.testimonials.items];
                      items[i] = { ...item, role: e.target.value };
                      update("testimonials", { ...content.testimonials, items });
                    }}
                  />
                </Form.Group>
              </Card>
            ))}
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() =>
                update("testimonials", {
                  ...content.testimonials,
                  items: [
                    ...content.testimonials.items,
                    { quote: "", author: "", role: "" },
                  ],
                })
              }
            >
              <Plus size={16} className="me-1" />
              Yorum Ekle
            </Button>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Button variant="primary" type="submit" disabled={saving}>
        {saving ? "Kaydediliyor..." : "Tümünü Kaydet"}
      </Button>
    </Form>
  );
}
