import { Container, Row, Col } from "react-bootstrap";
import { FeatureCard } from "@/components/FeatureCard";
import { StatsSection } from "@/components/StatsSection";
import { FEATURE_PAGE_SECTIONS, DEFAULT_STATS } from "@/lib/constants/default-content";

export const metadata = {
  title: "Özellikler",
  description:
    "Memur Jargonu uygulamasının özellikleri: eğitim videoları, denemeler, uygulama içi etkinlikler, memur ilanları.",
};

export default function OzelliklerPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="py-5 py-lg-6 text-center text-white position-relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1e40af 0%, #2563eb 40%, #3b82f6 100%)",
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 70%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
            pointerEvents: "none",
          }}
        />
        <Container className="position-relative">
          <h1 className="display-5 fw-bold mb-3">Özellikler</h1>
          <p className="lead mb-0 opacity-90" style={{ maxWidth: "32rem", margin: "0 auto" }}>
            KPSS ve AGS hazırlığınızı güçlendiren araçlar. Eğitim videoları, denemeler, memur ilanları ve daha fazlası tek uygulamada.
          </p>
        </Container>
      </section>

      {/* İstatistikler */}
      <StatsSection
        title="Rakamlarla Memur Jargonu"
        subtitle="Her gün büyüyen içerik ve topluluk"
        stats={DEFAULT_STATS}
      />

      {/* Özellik bölümleri */}
      <section className="py-5 py-lg-6">
        <Container>
          {FEATURE_PAGE_SECTIONS.map((section, sectionIndex) => (
            <div
              key={section.title}
              className={sectionIndex > 0 ? "mt-5 pt-5 border-top" : ""}
            >
              <h2 className="h4 fw-bold text-center mb-4" style={{ color: "var(--thamar-black-500)" }}>
                {section.title}
              </h2>
              <Row xs={1} md={2} lg={3} className="g-4">
                {section.items.map((feature, i) => (
                  <Col key={feature.title}>
                    <FeatureCard
                      title={feature.title}
                      description={feature.description}
                      icon={feature.icon}
                      index={sectionIndex * 10 + i}
                    />
                  </Col>
                ))}
              </Row>
            </div>
          ))}
        </Container>
      </section>
 
    </>
  );
}
