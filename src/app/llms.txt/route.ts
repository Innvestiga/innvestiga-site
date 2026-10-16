import { COVERAGE, coverageHref } from "@/data/coverage";
import { SCENARIOS, scenarioHref } from "@/data/scenarios";
import { CONTACT, OFFICES } from "@/lib/constants";
import { siteUrl } from "@/lib/env";

export const dynamic = "force-static";

// /llms.txt (section H): a short summary and the key links, in Markdown.
export function GET() {
  const url = (path: string) => `${siteUrl()}${path}`;
  const body = `# Innvestiga Market Specialists

> Auditorías de experiencia del cliente (CX) con cliente oculto, también llamado mystery shopper o cliente misterioso, en 8 países de Mesoamérica y el Caribe: El Salvador, Guatemala, Honduras, Nicaragua, Costa Rica, Panamá, República Dominicana y Chiapas (México). Podemos evaluar cualquiera de sus 1,282 municipios y entregamos resultados en máximo 3 días en ESI, nuestra plataforma propia.

- Innvestiga opera desde 2008 (18 años de experiencia) y se especializa en cliente oculto desde 2013.
- Oficinas: ${OFFICES.map((o) => o.city).join(" y ")}. Teléfono: ${CONTACT.phone}. Correo: ${CONTACT.email}.
- Prueba piloto disponible para comprobar el método en tus propias sucursales antes de decidir.

## Auditorías

- [Auditorías con cliente oculto](${url("/servicios/auditorias")}): visitas presenciales que califican la atención contra los estándares de tu marca.
${SCENARIOS.map((s) => `- [${s.label}](${url(scenarioHref(s))}): ${s.question}`).join("\n")}
- [Auditoría de chat, redes sociales y call center](${url("/servicios/canales-digitales")})

## Cobertura

- [Cobertura en 8 países y 1,282 municipios](${url("/cobertura")})
${COVERAGE.map((c) => `- [${c.fullName}](${url(coverageHref(c))}): ${c.count.toLocaleString("en-US")} ${c.unit}`).join("\n")}

## Empresa y contacto

- [Sobre Innvestiga](${url("/nosotros")})
- [Preguntas frecuentes](${url("/preguntas-frecuentes")})
- [Solicitar prueba piloto](${url("/contacto")})
- [Agendar demo](${url("/demo")})
- [English](${url("/en")})
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
