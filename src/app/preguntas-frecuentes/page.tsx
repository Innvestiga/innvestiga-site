import PageHero from "@/components/page/PageHero";
import PilotCta from "@/components/page/PilotCta";
import LastUpdated from "@/components/page/LastUpdated";
import HomeFaq from "@/components/home/HomeFaq";
import JsonLd from "@/components/seo/JsonLd";
import { FAQS } from "@/data/faq";
import { CONTENT_UPDATED } from "@/data/countryPages";
import { faqPageSchema } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/preguntas-frecuentes",
  title: "Preguntas Frecuentes sobre Auditorías CX y Mystery Shopper | Innvestiga",
  description:
    "Respuestas sobre auditorías con cliente oculto: qué son, cuánto tardan, qué países cubren y cómo funciona la prueba piloto.",
});

export default function PreguntasFrecuentesPage() {
  return (
    <>
      <JsonLd data={faqPageSchema(FAQS)} />
      <PageHero
        crumbs={[{ name: "Preguntas frecuentes", path: "/preguntas-frecuentes" }]}
        label="Preguntas frecuentes"
        title="Preguntas frecuentes sobre auditorías de experiencia del cliente."
      />
      <HomeFaq
        items={FAQS}
        title="Auditorías con cliente oculto"
        showAllLink={false}
        footer={<LastUpdated date={CONTENT_UPDATED} />}
      />
      <PilotCta />
    </>
  );
}
