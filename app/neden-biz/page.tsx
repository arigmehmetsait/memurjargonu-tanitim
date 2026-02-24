import { Container, Row, Col } from "react-bootstrap";
import { DEFAULT_WHY_US, DEFAULT_FEATURES } from "@/lib/constants/default-content";

export const metadata = {
  title: "Neden Biz",
  description:
    "Memur Jargonu'nu neden tercih etmelisiniz? KPSS ve AGS hazırlığında fark yaratan özelliklerimizi keşfedin.",
};

export default function NedenBizPage() {
  return (
    <>
      <section className="py-5 bg-light">
        <Container>
          <h1 className="display-5 fw-bold text-center mb-4">Neden Memur Jargonu?</h1>
          <p className="lead text-center text-muted mb-5">
            KPSS ve AGS sınavlarına hazırlanırken en iyi yardımcınız olmak için buradayız.
          </p>
          <Row className="justify-content-center">
            <Col md={8}>
              <ul className="list-unstyled">
                {DEFAULT_WHY_US.items.map((item, i) => {
                  const isObj = typeof item === "object" && item !== null && "title" in item;
                  const title = isObj ? (item as { title: string; description?: string }).title : String(item);
                  const desc = isObj ? (item as { title: string; description?: string }).description : undefined;
                  return (
                    <li key={i} className="d-flex align-items-start mb-4">
                      <span className="text-primary fs-4 me-3">✓</span>
                      <div>
                        <span className="fs-5">{title}</span>
                        {desc && <p className="text-muted mb-0 mt-1 small">{desc}</p>}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <h2 className="text-center h4 fw-bold mb-5">Özelliklerimiz</h2>
          <Row xs={1} md={2} className="g-4">
            {DEFAULT_FEATURES.map((f) => (
              <Col key={f.title}>
                <div className="p-4 border rounded">
                  <h3 className="h5">{f.title}</h3>
                  <p className="text-muted mb-0">{f.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}
