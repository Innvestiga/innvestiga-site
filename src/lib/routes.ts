import { COVERAGE, coverageHref } from "@/data/coverage";
import { SCENARIOS, scenarioHref } from "@/data/scenarios";

// Every public, indexable route; the sitemap and the SEO audit both read it.
export const INDEXABLE_ROUTES: string[] = [
  "/",
  "/nosotros",
  "/servicios",
  "/servicios/auditorias",
  ...SCENARIOS.map(scenarioHref),
  "/servicios/canales-digitales",
  "/servicios/consumer-insights",
  "/cobertura",
  ...COVERAGE.map(coverageHref),
  "/preguntas-frecuentes",
  "/contacto",
  "/demo",
  "/en",
];
