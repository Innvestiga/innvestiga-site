import { notFound } from "next/navigation";
import PageHero from "@/components/page/PageHero";
import Section, { Prose } from "@/components/page/Section";
import ScenarioCards from "@/components/page/ScenarioCards";
import CountryLinks from "@/components/page/CountryLinks";
import PilotCta from "@/components/page/PilotCta";
import LastUpdated from "@/components/page/LastUpdated";
import HomeFaq from "@/components/home/HomeFaq";
import ContactForm from "@/components/contacto/ContactForm";
import JsonLd from "@/components/seo/JsonLd";
import Button from "@/components/ui/Button";
import { COVERAGE, coverageHref, type CoverageCountry } from "@/data/coverage";
import { CONTENT_UPDATED, countryPage } from "@/data/countryPages";
import { CONTACT, OFFICES, whatsappHref } from "@/lib/constants";
import { localBusinessSchemas, serviceSchema } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return COVERAGE.map((c) => ({ slug: c.slug }));
}

const findCountry = (slug: string) => COVERAGE.find((c) => c.slug === slug);

// Chiapas is a state, so its pages name the country too.
const placeName = (c: CoverageCountry) => (c.slug === "chiapas-mexico" ? "Chiapas, México" : c.name);

const description = (c: CoverageCountry) =>
  `Auditorías con cliente oculto en cualquiera de los ${c.count} ${c.unit} de ${c.name}. Evidencia real y resultados en 3 días. Solicita tu prueba piloto.`;

const joinList = (items: string[]) =>
  items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} y ${items[items.length - 1]}`;

export async function generateMetadata({ params }: PageProps<"/cobertura/[slug]">) {
  const country = findCountry((await params).slug);
  if (!country) return {};
  return pageMetadata({
    path: coverageHref(country),
    title: `Mystery Shopper y Cliente Oculto en ${placeName(country)} | Innvestiga`,
    description: description(country),
  });
}

export default async function CountryPage({ params }: PageProps<"/cobertura/[slug]">) {
  const country = findCountry((await params).slug);
  const page = country && countryPage(country.slug);
  if (!country || !page) notFound();

  const path = coverageHref(country);
  const office = OFFICES.find((o) => o.country === country.name);
  const wa = whatsappHref();
  const cities = page.cities.length ? `, como ${joinList(page.cities)},` : "";
  const reach =
    country.slug === "chiapas-mexico"
      ? `de los ${country.count} municipios del estado de Chiapas`
      : `de los ${country.count} ${country.unit} de ${country.name}`;

  const intro = (
    <p>
      Innvestiga audita puntos de venta en {country.name} con un equipo local y logística regional. Estamos presentes en
      las principales ciudades{cities} y podemos evaluar cualquiera {reach}. Entregamos resultados en máximo 3 días.
    </p>
  );

  // El Salvador and Guatemala: the pilot form comes first, above the fold.
  const formAside = country.priority ? (
    <div id="prueba-piloto" className="rounded-2xl bg-surface border border-border p-6 md:p-8 shadow-[0_12px_32px_rgba(15,23,42,0.08)]">
      <h2 className="font-heading text-xl font-bold uppercase tracking-tight text-ink mb-4">
        Solicita tu prueba piloto en {country.name}
      </h2>
      <ContactForm defaultCountry={country.fullName} />
    </div>
  ) : undefined;

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: `Auditoría con cliente oculto en ${placeName(country)}`,
            path,
            description: description(country),
            area: country.slug,
          }),
          ...localBusinessSchemas().filter((_, i) => OFFICES[i].country === country.name),
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
      >
        {!country.priority && (
          <>
            <Button href="/contacto" variant="gold">
              Solicitar prueba piloto
            </Button>
            <Button href="/demo" variant="outline">
              Agendar demo
            </Button>
          </>
        )}
      </PageHero>

      <Section title={`Cobertura en ${placeName(country)}`} tone="alt">
        <Prose paragraphs={page.coverage} />
      </Section>

      <Section title="Situaciones que auditamos">
        <ScenarioCards />
      </Section>

      <Section title={`Cómo trabajamos en ${placeName(country)}`} tone="alt">
        <Prose paragraphs={page.howWeWork} />
      </Section>

      {office && (
        <Section title={`Atención comercial en ${country.name}`}>
          <div className="max-w-3xl rounded-2xl bg-surface-alt border border-border p-6 md:p-8">
            <p className="font-heading text-lg font-bold uppercase text-ink">Oficina en {office.city}</p>
            <address className="mt-2 not-italic text-[15px] text-body leading-relaxed">
              {office.address}
              <br />
              <a href={CONTACT.phoneHref} className="text-primary hover:underline">
                {CONTACT.phone}
              </a>
              <br />
              <a href={`mailto:${CONTACT.email}`} className="text-primary hover:underline">
                {CONTACT.email}
              </a>
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
