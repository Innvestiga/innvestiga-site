import { notFound } from "next/navigation";
import PageHero from "@/components/page/PageHero";
import Section, { Prose } from "@/components/page/Section";
import ScenarioCards from "@/components/page/ScenarioCards";
import CountryLinks from "@/components/page/CountryLinks";
import PilotCta from "@/components/page/PilotCta";
import LastUpdated from "@/components/page/LastUpdated";
import RegionTable from "@/components/page/RegionTable";
import HomeFaq from "@/components/home/HomeFaq";
import ContactForm from "@/components/contacto/ContactForm";
import JsonLd from "@/components/seo/JsonLd";
import EmailOff from "@/components/seo/EmailOff";
import Button from "@/components/ui/Button";
import { COVERAGE, coverageHref, type CoverageCountry } from "@/data/coverage";
import { CONTENT_UPDATED, countryPage } from "@/data/countryPages";
import { CONTACT, OFFICES, whatsappHref } from "@/lib/constants";
import { localBusinessSchemas, serviceSchema, zoneAreas } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return COVERAGE.map((c) => ({ slug: c.slug }));
}

const findCountry = (slug: string) => COVERAGE.find((c) => c.slug === slug);

// Chiapas is a state, so its pages name the country too.
const placeName = (c: CoverageCountry) => (c.slug === "chiapas-mexico" ? "Chiapas, México" : c.name);

// Keep <title> at 65 characters or fewer (SEO audit limit); long country
// names such as "República Dominicana" fall back to the shorter form.
const TITLE_MAX = 65;
function countryTitle(c: CoverageCountry) {
  const full = `Mystery Shopper y Cliente Oculto en ${placeName(c)} | Innvestiga`;
  return full.length <= TITLE_MAX ? full : `Cliente Oculto en ${placeName(c)} | Innvestiga`;
}

export async function generateMetadata({ params }: PageProps<"/cobertura/[slug]">) {
  const country = findCountry((await params).slug);
  const page = country && countryPage(country.slug);
  if (!country || !page) return {};
  return pageMetadata({
    path: coverageHref(country),
    title: countryTitle(country),
    description: page.description,
  });
}

export default async function CountryPage({ params }: PageProps<"/cobertura/[slug]">) {
  const country = findCountry((await params).slug);
  const page = country && countryPage(country.slug);
  if (!country || !page) notFound();

  const path = coverageHref(country);
  const office = OFFICES.find((o) => o.country === country.name);
  const wa = whatsappHref();
  const intro = <p>{page.intro}</p>;

  // Every country gets the same layout: the pilot form above the fold.
  const formAside = (
    <div id="prueba-piloto" className="rounded-2xl bg-surface border border-border p-6 md:p-8 shadow-[0_12px_32px_rgba(15,23,42,0.08)]">
      <h2 className="font-heading text-xl font-bold uppercase tracking-tight text-ink mb-4">
        Solicita tu prueba piloto en {country.name}
      </h2>
      <ContactForm defaultCountry={country.fullName} />
    </div>
  );

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: `Auditoría con cliente oculto en ${placeName(country)}`,
            path,
            description: page.description,
            area: country.slug,
            zones: page.zones,
          }),
          ...localBusinessSchemas(zoneAreas(country, page.zones)).filter((_, i) => OFFICES[i].country === country.name),
        ]}
      />
      <PageHero
        crumbs={[
          { name: "Cobertura", path: "/cobertura" },
          { name: country.name, path },
        ]}
        label={`Cliente oculto en ${placeName(country)}`}
        title={`Auditorías de experiencia del cliente en ${placeName(country)}.`}
        intro={intro}
        aside={formAside}
      />

      <Section title={`Cobertura en ${placeName(country)}`} tone="alt">
        <Prose paragraphs={page.coverage} />
        <div className="mt-10 space-y-8 max-w-3xl">
          {page.zoneSections.map((z) => (
            <div key={z.id} id={z.id} className="scroll-mt-28">
              <h3 className="font-heading text-lg md:text-xl font-bold uppercase tracking-tight text-ink">{z.title}</h3>
              <p className="mt-2 text-[16px] text-body leading-relaxed">{z.text}</p>
            </div>
          ))}
        </div>
        {page.coverageClosing && (
          <div className="mt-10">
            <Prose paragraphs={page.coverageClosing} />
          </div>
        )}
      </Section>

      <Section title={`Ciudades principales donde auditamos en ${placeName(country)}`}>
        <RegionTable page={page} place={placeName(country)} />
        <p className="mt-4 max-w-3xl text-[14px] text-muted leading-relaxed">
          Además de estas ciudades, podemos evaluar cualquiera de los {country.count.toLocaleString("en-US")}{" "}
          {country.slug === "chiapas-mexico" ? "municipios del estado" : `${country.unit} del país`}.
        </p>
      </Section>

      <Section title="Situaciones que auditamos" tone="alt">
        <ScenarioCards />
      </Section>

      <Section title={`Cómo trabajamos en ${placeName(country)}`}>
        <Prose paragraphs={page.howWeWork} />
      </Section>

      {office && (
        <Section title={`Atención comercial en ${country.name}`} tone="alt">
          <div className="max-w-3xl rounded-2xl bg-surface border border-border p-6 md:p-8">
            <p className="font-heading text-lg font-bold uppercase text-ink">Oficina en {office.city}</p>
            <address className="mt-2 not-italic text-[15px] text-body leading-relaxed">
              {office.address}
              <br />
              <a href={CONTACT.phoneHref} className="text-primary hover:underline">
                {CONTACT.phone}
              </a>
              <br />
              <EmailOff>
                <a href={`mailto:${CONTACT.email}`} className="text-primary hover:underline">
                  {CONTACT.email}
                </a>
              </EmailOff>
            </address>
            {wa && (
              <div className="mt-6">
                <Button href={wa} variant="gold" external>
                  Escríbenos por WhatsApp
                </Button>
              </div>
            )}
          </div>
        </Section>
      )}

      <HomeFaq
        items={page.faqs}
        title={`Preguntas frecuentes sobre auditorías en ${placeName(country)}`}
        footer={<LastUpdated date={CONTENT_UPDATED} />}
      />

      <Section title="Otros países donde auditamos" tone="alt">
        <CountryLinks exclude={country.slug} />
      </Section>

      <PilotCta />
    </>
  );
}
