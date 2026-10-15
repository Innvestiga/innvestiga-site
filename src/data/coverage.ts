export type CoverageUnit = "municipios" | "cantones" | "distritos";

export interface CoverageCountry {
  slug: string;
  name: string;
  /** Name used in tables and schema, e.g. "Chiapas (México)". */
  fullName: string;
  count: number;
  unit: CoverageUnit;
  /** Sales priority countries get larger cards and the pilot form first. */
  priority: boolean;
}

// Order is fixed by the spec (rule B13) and reused everywhere on the site.
export const COVERAGE: CoverageCountry[] = [
  { slug: "el-salvador", name: "El Salvador", fullName: "El Salvador", count: 44, unit: "municipios", priority: true },
  { slug: "guatemala", name: "Guatemala", fullName: "Guatemala", count: 340, unit: "municipios", priority: true },
  { slug: "honduras", name: "Honduras", fullName: "Honduras", count: 298, unit: "municipios", priority: false },
  { slug: "nicaragua", name: "Nicaragua", fullName: "Nicaragua", count: 153, unit: "municipios", priority: false },
  { slug: "costa-rica", name: "Costa Rica", fullName: "Costa Rica", count: 84, unit: "cantones", priority: false },
  { slug: "panama", name: "Panamá", fullName: "Panamá", count: 81, unit: "distritos", priority: false },
  { slug: "republica-dominicana", name: "República Dominicana", fullName: "República Dominicana", count: 158, unit: "municipios", priority: false },
  { slug: "chiapas-mexico", name: "Chiapas", fullName: "Chiapas (México)", count: 124, unit: "municipios", priority: false },
];

export const TOTAL_MUNICIPALITIES = COVERAGE.reduce((sum, c) => sum + c.count, 0);

export function coverageHref(c: Pick<CoverageCountry, "slug">): string {
  return `/cobertura/${c.slug}`;
}
