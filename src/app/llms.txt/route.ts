import { COVERAGE, coverageHref } from "@/data/coverage";
import { countryPage } from "@/data/countryPages";
import { SCENARIOS, scenarioHref } from "@/data/scenarios";
import { RESOURCES, RESOURCES_HUB, resourceHref } from "@/data/resources";
import { CONTACT, OFFICES } from "@/lib/constants";
import { siteUrl } from "@/lib/env";

export const dynamic = "force-static";

// The first city of each coverage zone.
const mainCities = (slug: string) => (countryPage(slug)?.zones ?? []).map((z) => z.cities[0]);

// /llms.txt (section H): a short summary and the key links, in Markdown.
export function GET() {
  const url = (path: string) => `${siteUrl()}${path}`;
  const body = `# Innvestiga Market Specialists

> Auditorías de experiencia del cliente (CX) con cliente oculto, también llamado mystery shopper o cliente misterioso, en 8 mercados: seis países de Centroamérica (Guatemala, Honduras, El Salvador, Nicaragua, Costa Rica y Panamá), República Dominicana en el Caribe y Chiapas, México. Podemos evaluar cualquiera de sus 1,282 municipios y entregamos resultados en máximo 3 días en ESI, nuestra plataforma propia.

- Innvestiga opera desde 2008 (18 años de experiencia) y se especializa en cliente oculto desde 2013.
- Oficinas: ${OFFICES.map((o) => o.address).join(" y ")}. Teléfono y WhatsApp: ${CONTACT.phone}. Correo: ${CONTACT.email}.
- Prueba piloto disponible para comprobar el método en tus propias sucursales antes de decidir.

## Auditorías

- [Auditorías con cliente oculto](${url("/servicios/auditorias")}): visitas presenciales que califican la atención contra los estándares de tu marca.
${SCENARIOS.map((s) => `- [${s.label}](${url(scenarioHref(s))}): ${s.question}`).join("\n")}
- [Auditoría de chat, redes sociales y call center](${url("/servicios/canales-digitales")})

## Cobertura

- [Cobertura en 8 mercados y 1,282 municipios](${url("/cobertura")})
${COVERAGE.map((c) => `- [${c.fullName}](${url(coverageHref(c))}): ${c.count.toLocaleString("en-US")} ${c.unit}. Ciudades principales: ${mainCities(c.slug).join(", ")}`).join("\n")}

## Recursos y guías

- [Centro de Recursos y Guías CX](${url(RESOURCES_HUB)})
${RESOURCES.map((r) => `- [${r.h1}](${url(resourceHref(r))})`).join("\n")}

## Empresa y contacto

- [Sobre Innvestiga](${url("/nosotros")})
- [Preguntas frecuentes](${url("/preguntas-frecuentes")})
- [Solicitar prueba piloto](${url("/contacto")})
- [English](${url("/en")})
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
