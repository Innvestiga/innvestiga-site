import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "auditorias",
    number: "01",
    title: "Auditorías de Proceso de Venta",
    slug: "auditorias",
    shortDescription:
      "Identificamos fortalezas y áreas de mejora en tus equipos comerciales mediante evaluaciones presenciales con metodología propia.",
    fullDescription:
      "Nuestras auditorías de proceso de venta permiten evaluar el desempeño de tus equipos comerciales en el punto de venta. Utilizamos clientes misteriosos capacitados que realizan visitas presenciales para medir el cumplimiento de protocolos, la calidad de atención y la efectividad del proceso comercial.",
    features: [
      "Evaluación presencial con cliente misterioso",
      "Medición de protocolos de atención",
      "Análisis de cumplimiento comercial",
      "Reportes detallados con evidencia fotográfica",
      "Benchmarking competitivo",
      "Recomendaciones accionables",
    ],
    process: [
      {
        step: 1,
        title: "Diseño",
        description:
          "Definimos los criterios de evaluación alineados a tus objetivos comerciales.",
      },
      {
        step: 2,
        title: "Ejecución",
        description:
          "Nuestros auditores capacitados realizan visitas presenciales a cada punto de venta.",
      },
      {
        step: 3,
        title: "Análisis",
        description:
          "Procesamos los datos recolectados y generamos indicadores clave de desempeño (KPI) por sucursal y por etapa del journey de compra.",
      },
      {
        step: 4,
        title: "Entrega",
        description:
          "Presentamos reportes ejecutivos con hallazgos y recomendaciones estratégicas.",
      },
    ],
    icon: "clipboard-check",
  },
  {
    id: "canales-digitales",
    number: "02",
    title: "Canales Digitales y Telefónicos",
    slug: "canales-digitales",
    shortDescription:
      "Evaluamos la atención en plataformas online y call centers para asegurar consistencia en todos los canales.",
    fullDescription:
      "Monitoreamos y evaluamos la calidad de atención en todos tus canales digitales y telefónicos. Desde chat en vivo y redes sociales hasta call centers, aseguramos que la experiencia del cliente sea consistente y de alta calidad en cada punto de contacto.",
    features: [
      "Evaluación de chat en vivo y chatbots",
      "Auditoría de redes sociales",
      "Monitoreo de call center",
      "Medición de tiempos de respuesta",
      "Análisis de calidad de interacción",
      "Evaluación omnicanal",
    ],
    process: [
      {
        step: 1,
        title: "Mapeo",
        description:
          "Identificamos todos los canales digitales y telefónicos activos de tu empresa.",
      },
      {
        step: 2,
        title: "Evaluación",
        description:
          "Realizamos interacciones controladas en cada canal midiendo métricas clave.",
      },
      {
        step: 3,
        title: "Diagnóstico",
        description:
          "Analizamos la consistencia y calidad de atención a través de todos los canales.",
      },
      {
        step: 4,
        title: "Optimización",
        description:
          "Entregamos un plan de mejora con acciones específicas por canal.",
      },
    ],
    icon: "monitor-smartphone",
  },
];
