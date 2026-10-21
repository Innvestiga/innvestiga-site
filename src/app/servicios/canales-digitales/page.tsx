import PageHero from "@/components/page/PageHero";
import Section, { Checklist } from "@/components/page/Section";
import CountryLinks from "@/components/page/CountryLinks";
import PilotCta from "@/components/page/PilotCta";
import ServiceSummary from "@/components/page/ServiceSummary";
import JsonLd from "@/components/seo/JsonLd";
import Button from "@/components/ui/Button";
import { services } from "@/data/services";
import { serviceSchema } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

const PATH = "/servicios/canales-digitales";
const DESCRIPTION =
  "Evaluamos la atención de tu chat, chatbot, redes sociales y call center con los mismos criterios que tus sucursales. Resultados en 3 días.";

export const metadata = pageMetadata({
  path: PATH,
  title: "Auditoría de chat, redes y call center | Innvestiga",
  description: DESCRIPTION,
});

const service = services.find((s) => s.slug === "canales-digitales")!;

// Section E keeps the four points of the previous page.
const POINTS = service.features.slice(0, 4);

export default function CanalesDigitalesPage() {
  return (
    <>
      <JsonLd data={serviceSchema({ name: "Auditoría de chat, redes sociales y call center", path: PATH, description: DESCRIPTION })} />
      <PageHero
        crumbs={[
          { name: "Servicios", path: "/servicios" },
          { name: "Canales digitales", path: PATH },
        ]}
        label="Canales digitales y telefónicos"
        title="Auditoría de atención en chat, redes sociales y call center."
        intro={
          <>
            <p>{DESCRIPTION}</p>
            <p>{service.fullDescription}</p>
          </>
        }
      >
        <Button href="/contacto" variant="gold">
          Solicitar prueba piloto
        </Button>
      </PageHero>

      <Section title="En resumen">
        <ServiceSummary
          evaluates="Tiempos de respuesta, claridad y resolución en chat, WhatsApp y redes."
          purpose="Garantiza una experiencia omnicanal homogénea."
        />
      </Section>

      <Section title="Qué evaluamos" tone="alt">
        <Checklist items={POINTS} />
      </Section>

      <Section title="Cómo funciona">
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {service.process.map((p) => (
            <li key={p.step}>
              <span className="font-heading text-4xl font-bold text-ink/10">0{p.step}</span>
              <h3 className="mt-2 font-heading text-xl font-bold uppercase text-ink">{p.title}</h3>
              <p className="mt-2 text-[14.5px] text-body leading-relaxed">{p.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Auditamos en 8 mercados" tone="alt">
        <CountryLinks />
      </Section>

      <PilotCta />
    </>
  );
}
