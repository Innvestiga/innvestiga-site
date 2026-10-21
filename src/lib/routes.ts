import { COVERAGE, coverageHref } from "@/data/coverage";
import { SCENARIOS, scenarioHref } from "@/data/scenarios";
import { RESOURCES, RESOURCES_HUB, resourceHref } from "@/data/resources";

// Every public, indexable route; the sitemap and the SEO audit both read it.
export const INDEXABLE_ROUTES: string[] = [
  "/",
  "/nosotros",
  "/servicios",
  "/servicios/auditorias",
  ...SCENARIOS.map(scenarioHref),
  "/servicios/canales-digitales",
  "/cobertura",
  ...COVERAGE.map(coverageHref),
  RESOURCES_HUB,
  ...RESOURCES.map(resourceHref),
  "/preguntas-frecuentes",
  "/contacto",
  "/en",
];
