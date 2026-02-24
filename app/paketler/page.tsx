import { Container, Row, Col, Button } from "react-bootstrap";
import { STORE_PLANS_URL } from "@/lib/constants/navigation";
import { PackagesSection } from "@/components/PackagesSection";
import { DEFAULT_PACKAGES } from "@/lib/constants/default-content";

export const metadata = {
  title: "Paketler",
  description:
    "Memur Jargonu abonelik paketlerini inceleyin. Detaylar için mağazamızı ziyaret edin.",
  alternates: { canonical: "/paketler" },
};

export default function PaketlerPage() {
  return (
    <>
      <section className="py-4">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <h1 className="display-5 fw-bold">Paketler</h1>
              <p className="lead text-muted">
                Memur Jargonu abonelik paketleri, eğitim videoları, denemeler ve tüm özelliklere
                erişim sağlar. İhtiyacınıza uygun paketi seçin.
              </p>
              <Button
                variant="primary"
                size="lg"
                href={STORE_PLANS_URL}
                target="_blank"
                rel="noopener noreferrer nofollow"
                as="a"
                className="px-5"
              >
                Mağazaya Git
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      <PackagesSection
        title=" "
        subtitle=" "
        packages={DEFAULT_PACKAGES}
      />
    </>
  );
}
