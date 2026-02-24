import { Container } from "react-bootstrap";

export const metadata = {
  title: "Çerez Politikası",
  description: "Memur Jargonu çerez politikası.",
};

export default function CerezPage() {
  return (
    <section className="py-5">
      <Container>
        <h1 className="display-5 fw-bold mb-4">Çerez Politikası</h1>
        <div className="prose">
          <p className="lead text-muted">
            Bu sayfa içeriği admin panelinden güncellenebilir.
          </p>
          <p>
            Sitemiz, kullanıcı deneyimini iyileştirmek amacıyla çerezler kullanabilir. Çerezler
            hakkında detaylı bilgi yakında eklenecektir.
          </p>
        </div>
      </Container>
    </section>
  );
}
