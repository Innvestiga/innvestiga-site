import { notFound } from "next/navigation";
import PageHero from "@/components/page/PageHero";
import Section, { Checklist } from "@/components/page/Section";
import ScenarioCards from "@/components/page/ScenarioCards";
import CountryLinks from "@/components/page/CountryLinks";
import PilotCta from "@/components/page/PilotCta";
import ServiceSummary from "@/components/page/ServiceSummary";
import JsonLd from "@/components/seo/JsonLd";
import Button from "@/components/ui/Button";
import { SCENARIOS, findScenario, scenarioHref } from "@/data/scenarios";
import { serviceSchema } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return SCENARIOS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/servicios/auditorias/[slug]">) {
  const scenario = findScenario((await params).slug);
  if (!scenario) return {};
  return pageMetadata({ path: scenarioHref(scenario), title: scenario.title, description: scenario.description });
}

// One template for the six scenario pages of section E.
export default async function ScenarioPage({ params }: PageProps<"/servicios/auditorias/[slug]">) {
  const scenario = findScenario((await params).slug);
  if (!scenario) notFound();
  const path = scenarioHref(scenario);

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: `Auditoría con cliente oculto: ${scenario.label.toLowerCase()}`,
          path,
          description: scenario.description,
        })}
      />
      <PageHero
        crumbs={[
          { name: "Servicios", path: "/servicios" },
          { name: "Auditorías", path: "/servicios/auditorias" },
          { name: scenario.label, path },
        ]}
        label="Auditoría con cliente oculto"
        title={scenario.h1}
        intro={<p>{scenario.intro}</p>}
      >
        <Button href="/contacto" variant="gold">
          Solicitar prueba piloto
        </Button>
      </PageHero>

      <Section title="En resumen">
        <ServiceSummary evaluates={scenario.evaluates} purpose={scenario.purpose} />
      </Section>

      <Section title="Qué situación evaluamos" tone="alt">
        <div className="max-w-3xl space-y-4 text-[16px] text-body leading-relaxed">
          <p className="font-heading text-xl md:text-2xl font-bold text-ink">{scenario.question}</p>
          <p>
            Los criterios se definen contigo, el auditor está capacitado y cada evaluación se respalda con evidencia. Recibes
            los resultados en máximo 3 días después de cada visita.
          </p>
        </div>
      </Section>

      <Section title="Qué verificamos">
        <Checklist items={scenario.checks} />
      </Section>

      <Section title="Qué decisión te ayuda a tomar" tone="alt">
        <p className="max-w-3xl font-heading text-xl md:text-2xl font-bold text-ink leading-snug">{scenario.decision}</p>
      </Section>

      <Section title="Auditamos en 8 mercados">
        <CountryLinks />
      </Section>

      <Section title="Otras situaciones que auditamos" tone="alt">
        <ScenarioCards exclude={scenario.slug} />
      </Section>

      <PilotCta />
    </>
  );
}
