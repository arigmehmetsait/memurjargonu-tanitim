import { Container } from "react-bootstrap";

export const metadata = {
  title: "Kullanım Koşulları",
  description: "Memur Jargonu kullanım koşulları.",
};

export default function KullanimKosullariPage() {
  return (
    <section className="py-5">
      <Container>
        <h1 className="display-5 fw-bold mb-4">Kullanım Koşulları</h1>
        <div className="prose">
          <p className="lead text-muted">
            Bu sayfa içeriği admin panelinden güncellenebilir.
          </p>
          <p>
            Memur Jargonu hizmetlerini kullanarak bu koşulları kabul etmiş sayılırsınız. Detaylı
            kullanım koşulları yakında eklenecektir.
          </p>
        </div>
      </Container>
    </section>
  );
}
