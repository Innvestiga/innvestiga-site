import PageHero from "@/components/page/PageHero";
import Section, { Checklist } from "@/components/page/Section";
import Button from "@/components/ui/Button";
import { services } from "@/data/services";
import { pageMetadata } from "@/lib/seo";

const PATH = "/servicios/consumer-insights";

export const metadata = pageMetadata({
  path: PATH,
  title: "Inteligencia de Mercado y Estudios a la Medida | Innvestiga",
  description:
    "Además de las auditorías, realizamos inteligencia de mercado, estudios cuantitativos y cualitativos a la medida y mediciones de satisfacción del cliente.",
});

const service = services.find((s) => s.slug === "consumer-insights")!;

// Demoted page (section E): same URL and content, lower prominence.
export default function ConsumerInsightsPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Servicios", path: "/servicios" },
          { name: "Otros estudios", path: PATH },
        ]}
        label="Otros estudios"
        title="Otros estudios que realizamos."
        intro={
          <>
            <p>
              Además de las auditorías, realizamos inteligencia de mercado, estudios cuantitativos y cualitativos a la
              medida y mediciones de satisfacción del cliente.
            </p>
            <p>{service.fullDescription}</p>
          </>
        }
      />

      <Section title="Qué incluye" tone="alt">
        <Checklist items={service.features} />
      </Section>

      <Section title="Cómo trabajamos">
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {service.process.map((p) => (
            <li key={p.step}>
              <span className="font-heading text-4xl font-bold text-ink/10">0{p.step}</span>
              <h3 className="mt-2 font-heading text-xl font-bold uppercase text-ink">{p.title}</h3>
              <p className="mt-2 text-[14.5px] text-body leading-relaxed">{p.description}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12">
          <Button href="/contacto" variant="outline">
            Contáctanos
          </Button>
        </div>
      </Section>
    </>
  );
}
