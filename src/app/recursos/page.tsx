import Link from "next/link";
import PageHero from "@/components/page/PageHero";
import Section from "@/components/page/Section";
import PilotCta from "@/components/page/PilotCta";
import { RESOURCES, RESOURCES_HUB, resourceHref } from "@/data/resources";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: RESOURCES_HUB,
  title: "Centro de Recursos y Guías CX | Innvestiga",
  description:
    "Guías sobre cliente oculto (mystery shopper): qué es, cómo se complementa con el NPS, su uso en Recursos Humanos, el journey de compra y cómo elegir proveedor.",
});

// Landing page of the content hub, linked from the Servicios mega menu.
export default function RecursosPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Recursos", path: RESOURCES_HUB }]}
        label="Recursos y guías CX"
        title="Centro de Recursos y Guías CX"
        intro={<p>Estrategias de cliente incógnito, métricas de NPS y auditoría retail.</p>}
      />

      <Section title="Guías" tone="alt">
        <ul className="grid gap-5 md:grid-cols-2 max-w-5xl">
          {RESOURCES.map((r) => (
            <li key={r.slug}>
              <Link
                href={resourceHref(r)}
                className="group block h-full rounded-2xl bg-surface border border-border p-6 md:p-8 hover:border-primary/40 transition-colors"
              >
                <h3 style={{ textTransform: "none" }} className="font-heading text-lg font-bold text-ink group-hover:text-primary leading-snug">
                  {r.h1}
                </h3>
                <p className="mt-3 text-[14.5px] text-body leading-relaxed">{r.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <PilotCta />
    </>
  );
}
