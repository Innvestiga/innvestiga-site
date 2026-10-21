import PageHero from "@/components/page/PageHero";
import Section from "@/components/page/Section";
import PilotCta from "@/components/page/PilotCta";
import ProcessSection from "@/components/home/ProcessSection";
import JsonLd from "@/components/seo/JsonLd";
import Button from "@/components/ui/Button";
import { aboutPageSchema, organizationSchema } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/nosotros",
  title: "Nosotros | Innvestiga, expertos en cliente oculto",
  description:
    "Medimos la experiencia del cliente con cliente oculto (mystery shopper) en Centroamérica, el Caribe y Chiapas, México. Desde 2008; plataforma propia desde 2013.",
});

const TIMELINE = [
  {
    year: "2008",
    text: "Nace Innvestiga y desarrollamos estudios de mercado y de consumidor para empresas de distintos sectores.",
  },
  {
    year: "2013",
    text: "Enfocamos nuestro trabajo en la metodología de cliente oculto y lanzamos la primera versión de ESI.",
  },
  {
    year: "Hoy",
    text: "Operamos en 8 mercados y podemos evaluar cualquiera de sus 1,282 municipios, con resultados en máximo 3 días.",
  },
];

const KEY_FACTS: [string, string][] = [
  ["Nombre", "Innvestiga Market Specialists"],
  ["Inicio de operaciones", "2008 (18 años de experiencia)"],
  ["Especialización", "Cliente oculto (mystery shopper) desde 2013"],
  ["Plataforma", "ESI, plataforma propia (primera versión en 2013)"],
  ["Mercados", "Guatemala, Honduras, El Salvador, Nicaragua, Costa Rica, Panamá, República Dominicana y Chiapas, México"],
  ["Cobertura", "1,282 municipios donde podemos evaluar"],
  ["Oficinas", "Ciudad de Guatemala y San Salvador"],
  ["Tiempo de entrega", "Máximo 3 días después de cada visita"],
];

export default function NosotrosPage() {
  return (
    <>
      <JsonLd data={[aboutPageSchema(), organizationSchema()]} />
      <PageHero
        crumbs={[{ name: "Nosotros", path: "/nosotros" }]}
        label="Sobre Innvestiga"
        title="Medimos la experiencia del cliente donde ocurre: en cada punto de venta"
        intro={
          <p>
            Innvestiga Market Specialists es una empresa de investigación de mercados que opera desde 2008. Desde 2013
            concentramos nuestra experiencia en la metodología de cliente oculto (mystery shopper) y creamos ESI, nuestra
            plataforma propia. Hoy auditamos puntos de venta en 8 mercados de Centroamérica, el Caribe y Chiapas, México.
          </p>
        }
      />

      <Section title="Nuestra historia" tone="alt">
        <ol className="relative max-w-3xl border-l border-primary/25 pl-8 space-y-10">
          {TIMELINE.map((t) => (
            <li key={t.year} className="relative">
              <span aria-hidden="true" className="absolute -left-[38px] top-1.5 h-3 w-3 rounded-full bg-primary ring-4 ring-surface-alt" />
              <h3 className="font-heading text-2xl font-bold text-primary">{t.year}</h3>
              <p className="mt-2 text-[16px] text-body leading-relaxed">{t.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Una experiencia que se nota en cada auditoría">
        <p className="max-w-3xl text-[16px] text-body leading-relaxed">
          Antes de especializarnos, desarrollamos estudios en sectores como telefonía celular, banca y tarjetas de
          crédito, calzado, ferreterías, electrodomésticos, centros comerciales, repuestos automotrices, farmacéutico,
          supermercados, comida rápida y productos de consumo masivo. Esa experiencia nos enseñó a diseñar criterios
          claros, preparar equipos de campo y presentar resultados que sirven para tomar decisiones.
        </p>
      </Section>

      <ProcessSection />

      <Section title="Datos clave" tone="alt">
        <div className="max-w-3xl overflow-x-auto rounded-2xl border border-border bg-surface">
          <table className="w-full text-left text-[15px]">
            <thead className="bg-surface-alt text-[11px] uppercase tracking-[0.15em] text-muted">
              <tr>
                <th scope="col" className="px-5 py-3 font-bold">
                  Dato
                </th>
                <th scope="col" className="px-5 py-3 font-bold">
                  Valor
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {KEY_FACTS.map(([label, value]) => (
                <tr key={label}>
                  <th scope="row" className="px-5 py-3 font-semibold text-ink align-top whitespace-nowrap">
                    {label}
                  </th>
                  <td className="px-5 py-3 text-body">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/contacto" variant="gold">
            Solicitar prueba piloto
          </Button>
        </div>
      </Section>

      <PilotCta />
    </>
  );
}
