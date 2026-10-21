import PageHero from "@/components/page/PageHero";
import Section, { Checklist } from "@/components/page/Section";
import ScenarioCards from "@/components/page/ScenarioCards";
import CountryLinks from "@/components/page/CountryLinks";
import PilotCta from "@/components/page/PilotCta";
import ProcessSection from "@/components/home/ProcessSection";
import HomeFaq from "@/components/home/HomeFaq";
import JsonLd from "@/components/seo/JsonLd";
import Button from "@/components/ui/Button";
import { FAQS } from "@/data/faq";
import { serviceSchema } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

const PATH = "/servicios/auditorias";
const DESCRIPTION =
  "Visitas presenciales con cliente oculto para medir atención, protocolos y cumplimiento en cada punto de venta. Evidencia real y resultados en 3 días.";

export const metadata = pageMetadata({
  path: PATH,
  title: "Auditorías con Cliente Oculto (Mystery Shopper) | Innvestiga",
  description: DESCRIPTION,
});

// "Qué evaluamos" keeps the four points of the previous page (section E).
const EVALUATES = [
  "Evaluación presencial con cliente misterioso",
  "Medición de protocolos de atención",
  "Análisis de cumplimiento comercial",
  "Reportes detallados con evidencia fotográfica",
];

const RECEIVES = [
  "Evidencia en video, fotos y audio",
  "Comparativos entre sucursales y países",
  "Recomendaciones",
];

// What it is, how long it takes, and how results stay objective.
const PAGE_FAQS = [FAQS[0], FAQS[1], FAQS[6]];

export default function AuditoriasPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({ name: "Auditoría con cliente oculto (mystery shopper)", path: PATH, description: DESCRIPTION })}
      />
      <PageHero
        crumbs={[
          { name: "Servicios", path: "/servicios" },
          { name: "Auditorías con cliente oculto", path: PATH },
        ]}
        label="Cliente oculto · Mystery shopper"
        title="Auditorías con cliente oculto en tus puntos de venta."
        intro={
          <p>
            Una auditoría con cliente oculto (mystery shopper) es una visita presencial de un auditor capacitado que actúa
            como un cliente real y califica la atención contra los estándares de tu marca. Innvestiga la realiza en 8
            mercados, puede evaluar cualquiera de sus 1,282 municipios y entrega resultados en máximo 3 días.
          </p>
        }
      >
        <Button href="/contacto" variant="gold">
          Solicitar prueba piloto
        </Button>
      </PageHero>

      <Section title="Situaciones en las que una auditoría ayuda a una empresa de retail" tone="alt">
        <ScenarioCards />
      </Section>

      <Section title="Qué evaluamos">
        <Checklist items={EVALUATES} />
      </Section>

      <ProcessSection label="Cómo funciona" />

      <Section title="Qué recibes" tone="alt">
        <Checklist items={RECEIVES} columns={1} />
      </Section>

      <Section title="Auditamos en 8 mercados">
        <CountryLinks />
      </Section>

      <HomeFaq items={PAGE_FAQS} />

      <PilotCta />
    </>
  );
}
