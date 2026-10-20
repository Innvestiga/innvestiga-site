export type CoverageUnit = "municipios" | "cantones" | "distritos";

export interface CoverageCountry {
  slug: string;
  name: string;
  /** Name used in tables and schema, e.g. "Chiapas (México)". */
  fullName: string;
  count: number;
  unit: CoverageUnit;
}

// The client's fixed geographic order (2026-10), reused in every menu, map,
// list and text. All 8 markets get the same layout and relevance.
export const COVERAGE: CoverageCountry[] = [
  { slug: "guatemala", name: "Guatemala", fullName: "Guatemala", count: 340, unit: "municipios" },
  { slug: "honduras", name: "Honduras", fullName: "Honduras", count: 298, unit: "municipios" },
  { slug: "el-salvador", name: "El Salvador", fullName: "El Salvador", count: 44, unit: "municipios" },
  { slug: "nicaragua", name: "Nicaragua", fullName: "Nicaragua", count: 153, unit: "municipios" },
  { slug: "costa-rica", name: "Costa Rica", fullName: "Costa Rica", count: 84, unit: "cantones" },
  { slug: "panama", name: "Panamá", fullName: "Panamá", count: 81, unit: "distritos" },
  { slug: "republica-dominicana", name: "República Dominicana", fullName: "República Dominicana", count: 158, unit: "municipios" },
  { slug: "chiapas-mexico", name: "Chiapas", fullName: "Chiapas (México)", count: 124, unit: "municipios" },
];

/** The 8 names in order, joined as Spanish prose ("A, B, ... y Chiapas"). */
export function countryList(names: string[] = COVERAGE.map((c) => c.name)): string {
  return `${names.slice(0, -1).join(", ")} y ${names.at(-1)}`;
}

export const TOTAL_MUNICIPALITIES = COVERAGE.reduce((sum, c) => sum + c.count, 0);

export function coverageHref(c: Pick<CoverageCountry, "slug">): string {
  return `/cobertura/${c.slug}`;
}
