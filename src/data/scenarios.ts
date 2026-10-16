export interface Scenario {
  slug: string;
  label: string;
  /** One line under the card title. */
  question: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  /** "Qué verificamos". */
  checks: string[];
  /** "Qué decisión te ayuda a tomar". */
  decision: string;
}

// The six audit scenarios of section E, verbatim and in the spec order.
export const SCENARIOS: Scenario[] = [
  {
    slug: "proceso-de-ventas",
    label: "Proceso de ventas",
    question: "¿Tu equipo vende como tu estándar dice?",
    title: "Auditoría del Proceso de Ventas en Tienda | Innvestiga",
    description:
      "Un cliente oculto recorre tu proceso de ventas, del saludo al cierre, y mide si tu equipo sigue el estándar en cada sucursal. Resultados en 3 días.",
    h1: "Auditoría del proceso de ventas en tus tiendas.",
    intro:
      "Una auditoría del proceso de ventas muestra cómo atiende tu equipo a un cliente real, desde que entra a la tienda hasta que paga o se va sin comprar. Un cliente oculto simula una compra y califica cada etapa contra tu estándar.",
    checks: [
      "Saludo y acercamiento",
      "Detección de necesidades",
      "Presentación del producto",
      "Manejo de objeciones",
      "Ofrecimiento de productos o servicios adicionales",
      "Cierre y despedida",
      "Tiempo de espera",
    ],
    decision: "Dónde capacitar y qué sucursales están por debajo del estándar.",
  },
  {
    slug: "garantias",
    label: "Garantías",
    question: "¿Se explican y se gestionan como define tu política?",
    title: "Auditoría de Garantías en Retail | Innvestiga",
    description:
      "Comprueba si tus tiendas explican y gestionan las garantías como define tu política. Un cliente oculto presenta un caso acordado. Resultados en 3 días.",
    h1: "Auditoría de garantías en tus puntos de venta.",
    intro:
      "Una auditoría de garantías comprueba si tu tienda explica, acepta y gestiona una garantía tal como la define tu política. Un cliente oculto presenta un caso acordado contigo y registra lo que ocurre.",
    checks: [
      "La información que recibe el cliente",
      "Los documentos que se piden",
      "Los tiempos prometidos y los cumplidos",
      "El trato",
      "La consistencia entre sucursales",
    ],
    decision: "Qué parte del proceso de garantías falla y dónde.",
  },
  {
    slug: "reclamos-y-conflictos",
    label: "Reclamos y conflictos",
    question: "¿Cómo responde tu personal cuando el cliente se queja?",
    title: "Auditoría de Manejo de Reclamos y Quejas | Innvestiga",
    description:
      "Un cliente oculto presenta una queja simulada y mide cómo responde tu personal: escucha, solución y escalamiento. Resultados en 3 días.",
    h1: "Auditoría del manejo de reclamos y conflictos con el cliente.",
    intro:
      "Cómo responde tu equipo cuando un cliente se queja define si se queda o se va. Un cliente oculto presenta un reclamo simulado y evalúa la escucha, la solución ofrecida y el escalamiento.",
    checks: [
      "Actitud y empatía",
      "Si se ofrece una solución",
      "Si se escala a un supervisor cuando corresponde",
      "Si se registra el reclamo",
      "El seguimiento prometido",
    ],
    decision: "Qué entrenar y qué protocolo ajustar.",
  },
  {
    slug: "reparaciones-y-servicio-tecnico",
    label: "Reparaciones y servicio técnico",
    question: "¿Cumples los tiempos y la comunicación prometidos?",
    title: "Auditoría de Reparaciones y Servicio Técnico | Innvestiga",
    description:
      "Un cliente oculto ingresa un producto a reparación y da seguimiento para medir tiempos, comunicación y entrega. Resultados en 3 días.",
    h1: "Auditoría de reparaciones y servicio técnico.",
    intro:
      "Una auditoría de servicio técnico sigue un caso de principio a fin: recepción del producto, diagnóstico, tiempos, comunicación con el cliente y entrega.",
    checks: [
      "Recepción y registro",
      "Claridad del diagnóstico y del costo",
      "Cumplimiento del plazo prometido",
      "Comunicación durante el proceso",
      "Calidad de la entrega",
    ],
    decision: "Dónde se rompe la promesa de servicio postventa.",
  },
  {
    slug: "devoluciones-y-cambios",
    label: "Devoluciones y cambios",
    question: "¿Tu política se cumple tal como está escrita?",
    title: "Auditoría de Política de Devoluciones y Cambios | Innvestiga",
    description:
      "Comprueba si tu política de devoluciones se cumple tal como está escrita, en cada sucursal. Un cliente oculto lo verifica. Resultados en 3 días.",
    h1: "Auditoría de devoluciones y cambios.",
    intro:
      "Una auditoría de devoluciones comprueba si tu política se aplica en tienda tal como está escrita. Un cliente oculto solicita una devolución o cambio y registra la respuesta del personal.",
    checks: [
      "Si se aplica la política",
      "Plazos y condiciones",
      "Documentos solicitados",
      "Trato al cliente",
      "Rechazos indebidos o excepciones no autorizadas",
    ],
    decision: "Dónde la política y la práctica no coinciden.",
  },
  {
    slug: "promociones-y-precios",
    label: "Promociones y precios",
    question: "¿Lo que anuncias es lo que se cobra?",
    title: "Auditoría de Promociones y Precios en Tienda | Innvestiga",
    description:
      "Verifica que lo que anuncias coincide con lo que el cliente ve y paga en cada punto de venta. Un cliente oculto lo comprueba. Resultados en 3 días.",
    h1: "Auditoría de promociones y precios.",
    intro:
      "Una auditoría de promociones verifica que lo que anuncias coincide con lo que el cliente ve y paga en cada punto de venta.",
    checks: [
      "Precios exhibidos frente a precios cobrados",
      "Promociones vigentes",
      "Información al cliente",
      "Material publicitario",
    ],
    decision: "Dónde se incumple lo que prometes en tus promociones.",
  },
];

export function scenarioHref(s: Pick<Scenario, "slug">): string {
  return `/servicios/auditorias/${s.slug}`;
}

export function findScenario(slug: string): Scenario | undefined {
  return SCENARIOS.find((s) => s.slug === slug);
}
