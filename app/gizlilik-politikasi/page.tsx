import { Container } from "react-bootstrap";

export const metadata = {
  title: "Gizlilik Politikası",
  description: "Memur Jargonu gizlilik politikası.",
};

export default function GizlilikPage() {
  return (
    <section className="py-5">
      <Container>
        <h1 className="display-5 fw-bold mb-4">Gizlilik Politikası</h1>
        <div className="prose">
          <p className="lead text-muted">
            Bu sayfa içeriği admin panelinden güncellenebilir. Şimdilik örnek metin gösterilmektedir.
          </p>
          <p>
            Memur Jargonu olarak kişisel verilerinizin güvenliği bizim için önemlidir. Topladığımız
            bilgileri yalnızca hizmet kalitenizi artırmak amacıyla kullanırız.
          </p>
          <p>
            Detaylı gizlilik politikamız yakında eklenecektir.
          </p>
        </div>
      </Container>
    </section>
  );
}
