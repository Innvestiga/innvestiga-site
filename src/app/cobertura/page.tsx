import PageHero from "@/components/page/PageHero";
import Section from "@/components/page/Section";
import CountryLinks from "@/components/page/CountryLinks";
import CoverageTable from "@/components/page/CoverageTable";
import PilotCta from "@/components/page/PilotCta";
import HeroMap from "@/components/home/HeroMap";
import { countryList } from "@/data/coverage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/cobertura",
  title: "Cobertura de Auditorías CX en 8 Países y 1,282 Municipios | Innvestiga",
  description: `Auditorías CX con cliente oculto en ${countryList()}: 1,282 municipios.`,
});

export default function CoberturaPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Cobertura", path: "/cobertura" }]}
        label="Mesoamérica y el Caribe"
        title="Auditorías CX en 1,282 municipios de Mesoamérica y el Caribe."
        intro={
          <p>
            Estamos presentes en las principales ciudades de {countryList()}, y podemos realizar auditorías en
            cualquier punto de venta de esta región. Cada uno de los 8 países recibe el mismo método y la misma
            atención, desde nuestras oficinas en Ciudad de Guatemala y San Salvador.
          </p>
        }
        aside={
          <div className="relative aspect-[384/268] w-full max-w-[640px] lg:ml-auto">
            <HeroMap />
          </div>
        }
      />

      <Section title="Dónde podemos evaluar" tone="alt">
        <CoverageTable />
      </Section>

      <Section title="Auditamos en 8 países">
        <CountryLinks />
      </Section>

      <PilotCta />
    </>
  );
}
