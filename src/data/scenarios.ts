export interface Scenario {
  slug: string;
  label: string;
  question: string;
}

// The six audit scenarios of section E, in the spec order.
export const SCENARIOS: Scenario[] = [
  { slug: "proceso-de-ventas", label: "Proceso de ventas", question: "¿Tu equipo vende como tu estándar dice?" },
  { slug: "garantias", label: "Garantías", question: "¿Se explican y se gestionan como define tu política?" },
  { slug: "reclamos-y-conflictos", label: "Reclamos y conflictos", question: "¿Cómo responde tu personal cuando el cliente se queja?" },
  { slug: "reparaciones-y-servicio-tecnico", label: "Reparaciones y servicio técnico", question: "¿Cumples los tiempos y la comunicación prometidos?" },
  { slug: "devoluciones-y-cambios", label: "Devoluciones y cambios", question: "¿Tu política se cumple tal como está escrita?" },
  { slug: "promociones-y-precios", label: "Promociones y precios", question: "¿Lo que anuncias es lo que se cobra?" },
];

export function scenarioHref(s: Pick<Scenario, "slug">): string {
  return `/servicios/auditorias/${s.slug}`;
}
