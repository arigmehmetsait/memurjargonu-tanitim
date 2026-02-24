import {
  Container,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
} from "react-bootstrap";
import { DEFAULT_FAQ } from "@/lib/constants/faq";

export const metadata = {
  title: "Sıkça Sorulan Sorular",
  description: "Memur Jargonu hakkında sıkça sorulan sorular ve cevaplar.",
  alternates: { canonical: "/sikca-sorulan-sorular" },
};

export default function SSSPage() {
  return (
    <section className="py-5">
      <Container>
        <h1 className="display-5 fw-bold text-center mb-4">
          Sıkça Sorulan Sorular
        </h1>
        <p className="lead text-center text-muted mb-5">
          Merak ettiklerinizin cevapları burada.
        </p>
        <Accordion defaultActiveKey="0" className="mb-5">
          {DEFAULT_FAQ.map((item, i) => (
            <AccordionItem key={i} eventKey={String(i)}>
              <AccordionHeader>{item.question}</AccordionHeader>
              <AccordionBody>{item.answer}</AccordionBody>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}
