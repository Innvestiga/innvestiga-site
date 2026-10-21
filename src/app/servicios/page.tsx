import Link from "next/link";
import PageHero from "@/components/page/PageHero";
import Section from "@/components/page/Section";
import ScenarioCards from "@/components/page/ScenarioCards";
import CountryLinks from "@/components/page/CountryLinks";
import PilotCta from "@/components/page/PilotCta";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/servicios",
  title: "Servicios de Cliente Oculto | Innvestiga",
  description:
    "Auditorías con cliente oculto para retail: proceso de ventas, garantías, reclamos, servicio técnico, devoluciones, precios y canales digitales.",
});

export default function ServiciosPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Servicios", path: "/servicios" }]}
        label="Servicios"
        title="Auditorías de experiencia del cliente para empresas de retail."
        intro={
          <p>
            Una auditoría con cliente oculto (mystery shopper) evalúa el mismo escenario, con los mismos criterios, en
            cada sucursal. Elige la situación que quieres medir: proceso de ventas, garantías, reclamos, reparaciones,
            devoluciones, promociones o canales digitales.
          </p>
        }
      />

      <Section title="Situaciones que una auditoría de cliente oculto te ayuda a resolver" tone="alt">
        <ScenarioCards />
        <div className="mt-10 flex flex-col gap-4">
          <Link
            href="/servicios/canales-digitales"
            className="group inline-flex w-fit items-center gap-3 text-[12px] font-bold tracking-[0.2em] uppercase text-primary hover:text-primary-hover"
          >
            Auditoría de canales digitales <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Section>

      <Section title="Auditamos en 8 mercados" tone="surface">
        <CountryLinks />
      </Section>

      <PilotCta />
    </>
  );
}
