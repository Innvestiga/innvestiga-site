export interface Resource {
  slug: string;
  /** Short label for the footer and the hub list. */
  label: string;
  title: string;
  description: string;
  h1: string;
  /** Opening paragraph: the direct answer comes first. */
  body: string;
  /** Question list with Innvestiga's answer to each, rendered as a FAQ. */
  questions?: { question: string; answer: string }[];
}

// Content hub copy from the client spec (2026-10-20), verbatim.
export const RESOURCES_PUBLISHED = "2026-10-20";

export const RESOURCES: Resource[] = [
  {
    slug: "que-es-cliente-oculto",
    label: "¿Qué es un cliente oculto?",
    title: "¿Qué es un cliente oculto (mystery shopper)? | Innvestiga",
    description:
      "Qué es un cliente oculto, cómo funciona una auditoría de mystery shopper en retail, qué mide y en qué se diferencia de una encuesta. Guía de Innvestiga.",
    h1: "¿Qué es un cliente oculto (mystery shopper) y cómo funciona en retail?",
    body: "Un cliente oculto es un auditor capacitado que visita o contacta un punto de venta como si fuera un cliente real y califica la experiencia contra los estándares de la marca. Funciona en 4 etapas: Diseño, Ejecución, Análisis y Entrega de reportes en máximo 3 días. A diferencia de una encuesta que mide opiniones, el cliente oculto mide hechos y conductas reales.",
  },
  {
    slug: "cliente-oculto-y-nps",
    label: "Cliente oculto y NPS",
    title: "Cliente oculto y NPS: cómo se complementan | Innvestiga",
    description:
      "El NPS dice cuánto te recomiendan; el cliente oculto muestra por qué. Cómo usar ambos para mejorar la lealtad del cliente en tus sucursales.",
    h1: "Cliente oculto y NPS: cómo se complementan para mejorar la lealtad del cliente",
    body: "El cliente oculto no reemplaza al NPS: lo explica. El NPS refleja la intención de recomendación de los clientes; la auditoría muestra las conductas exactas del personal (saludo, asesoría, cierre) que causan esa nota. Al cruzar ambos datos, la gerencia identifica las causas raíz de la insatisfacción.",
  },
  {
    slug: "cliente-oculto-recursos-humanos",
    label: "Recursos Humanos",
    title: "Cliente oculto para Recursos Humanos | Innvestiga",
    description:
      "Cómo un programa de cliente oculto apoya a Recursos Humanos: brechas por sucursal, efectividad de la capacitación y mejora de perfiles e inducción.",
    h1: "Cliente oculto para Recursos Humanos: capacitación, contratación y KPIs",
    body: "Aporta datos objetivos sobre la conducta en tienda. Permite medir el impacto antes y después de una capacitación, detectar desviaciones repetitivas en colaboradores nuevos para ajustar el perfil de selección, y entregar KPIs transparentes por turno o sucursal.",
  },
  {
    slug: "journey-de-compra",
    label: "Auditoría del Journey",
    title: "Journey de compra: cómo auditarlo en tienda | Innvestiga",
    description:
      "Qué es el journey de compra (sales journey), cuáles son sus etapas y cómo se mide con cliente oculto cada momento de la experiencia en retail.",
    h1: "Journey de compra: cómo auditar el recorrido del cliente en tienda",
    body: "Evalúa el recorrido completo: Recibimiento, Diagnóstico, Oferta, Cobro, Servicios Posventa (garantías/reclamos) y Canales Digitales. Muestra en qué punto exacto se deteriora la experiencia de compra.",
  },
  {
    slug: "como-elegir-empresa-cliente-oculto",
    label: "Guía de Elección",
    title: "Cómo elegir una empresa de cliente oculto | Innvestiga",
    description:
      "10 preguntas para elegir una empresa de cliente oculto (mystery shopper) en Centroamérica, el Caribe y Chiapas, México, y cómo responde Innvestiga.",
    h1: "Cómo elegir una empresa de cliente oculto en Centroamérica: 10 preguntas antes de contratar",
    body: "Guía objetiva de evaluación basada en: Cobertura geográfica real (+1,280 municipios), Método estandarizado, Evidencia multimedia (video/foto/audio), Tiempos de entrega (≤ 3 días), Plataforma propia (ESI) y Capacidad omnicanal.",
    // Drafted from facts already stated on the site; pending client review.
    questions: [
      {
        question: "¿Tiene cobertura real en todos los países donde opero?",
        answer:
          "Innvestiga audita en 8 mercados: Guatemala, Honduras, El Salvador, Nicaragua, Costa Rica, Panamá, República Dominicana y Chiapas, México. Puede evaluar cualquiera de sus 1,282 municipios, con oficinas en Ciudad de Guatemala y San Salvador.",
      },
      {
        question: "¿Usa el mismo método en todos los países?",
        answer:
          "Sí. La misma guía de evaluación y los mismos criterios se aplican en los 8 mercados, así que los resultados de cada país se comparan directamente.",
      },
      {
        question: "¿Quién define los criterios de evaluación?",
        answer: "Los criterios se definen contigo, alineados a los estándares de tu marca y a tus objetivos comerciales.",
      },
      {
        question: "¿Cuánta experiencia tiene en cliente oculto?",
        answer:
          "Innvestiga opera desde 2008 (18 años de experiencia) y se especializa en la metodología de cliente oculto desde 2013.",
      },
      {
        question: "¿Qué evidencia entrega de cada visita?",
        answer: "Cada evaluación se respalda con evidencia multimedia: video, fotografías y audio de la visita.",
      },
      {
        question: "¿En cuánto tiempo entrega los resultados?",
        answer: "En máximo 3 días después de cada visita.",
      },
      {
        question: "¿Tiene una plataforma propia para consultar resultados?",
        answer:
          "Sí. Los resultados se publican en ESI, la plataforma propia de Innvestiga desde 2013, con la evidencia de cada visita y comparativos entre sucursales, ciudades y países.",
      },
      {
        question: "¿Puede auditar también chat, redes sociales y call center?",
        answer: "Sí. Los canales digitales y telefónicos se evalúan con los mismos criterios que las sucursales.",
      },
      {
        question: "¿Cómo garantiza resultados objetivos?",
        answer:
          "Los auditores están capacitados, cada evaluación se respalda con evidencia y existe un proceso para revisar y aclarar resultados.",
      },
      {
        question: "¿Puedo probar el servicio antes de contratar?",
        answer:
          "Sí. La prueba piloto de cortesía incluye tres evaluaciones en el país que elijas, con resultados en ESI en máximo 3 días y una reunión para revisarlos.",
      },
    ],
  },
];

export const RESOURCES_HUB = "/recursos";

export function resourceHref(r: Pick<Resource, "slug">): string {
  return `${RESOURCES_HUB}/${r.slug}`;
}

export function findResource(slug: string): Resource | undefined {
  return RESOURCES.find((r) => r.slug === slug);
}
