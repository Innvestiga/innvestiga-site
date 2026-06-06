import type { CaseStudy } from "@/types";

export const caseStudies: CaseStudy[] = [
  {
    id: "banco-regional",
    title: "Transformación de Atención Bancaria",
    industry: "Banca y Finanzas",
    country: "Guatemala",
    challenge:
      "Un banco regional con más de 200 agencias necesitaba evaluar y mejorar la calidad de atención al cliente en todos sus puntos de servicio.",
    solution:
      "Implementamos un programa de auditorías mensuales con cliente misterioso en las 200+ agencias, evaluando 15 criterios de servicio.",
    result:
      "Incremento del 34% en el índice de satisfacción del cliente en 6 meses, con mejora sostenida en protocolos de atención.",
    metrics: [
      { label: "Agencias evaluadas", value: "200+" },
      { label: "Mejora en satisfacción", value: "+34%" },
      { label: "Período", value: "6 meses" },
    ],
    image: "/images/cases/banking.jpg",
  },
  {
    id: "retail-centroamerica",
    title: "Auditoría Retail Centroamericana",
    industry: "Retail",
    country: "Centroamérica",
    challenge:
      "Cadena de retail con presencia en 5 países necesitaba estandarizar su proceso de venta y atención al cliente.",
    solution:
      "Diseñamos un programa de evaluación regional con estándares unificados, adaptando criterios culturales por país.",
    result:
      "Estandarización del 89% en protocolos de atención y reducción del 22% en quejas de clientes.",
    metrics: [
      { label: "Países cubiertos", value: "5" },
      { label: "Estandarización", value: "89%" },
      { label: "Reducción de quejas", value: "-22%" },
    ],
    image: "/images/cases/retail.jpg",
  },
  {
    id: "telecomunicaciones",
    title: "Optimización de Call Center",
    industry: "Telecomunicaciones",
    country: "El Salvador",
    challenge:
      "Operador de telecomunicaciones con altos índices de insatisfacción en su call center y canales digitales.",
    solution:
      "Evaluación integral de canales digitales y telefónicos con 500+ interacciones mensuales y feedback en tiempo real.",
    result:
      "Reducción del tiempo promedio de resolución en 40% y mejora del NPS en 28 puntos.",
    metrics: [
      { label: "Interacciones/mes", value: "500+" },
      { label: "Tiempo resolución", value: "-40%" },
      { label: "Mejora NPS", value: "+28pts" },
    ],
    image: "/images/cases/telecom.jpg",
  },
  {
    id: "farmaceutica",
    title: "Insights del Consumidor Farmacéutico",
    industry: "Farmacéutica",
    country: "Honduras",
    challenge:
      "Laboratorio farmacéutico necesitaba entender las preferencias y hábitos de compra de medicamentos OTC.",
    solution:
      "Estudio de Consumer Insights con 2,000 encuestas, 12 focus groups y análisis de comportamiento de compra en farmacias.",
    result:
      "Identificación de 3 nuevos segmentos de mercado y reformulación exitosa de estrategia de producto.",
    metrics: [
      { label: "Encuestas", value: "2,000" },
      { label: "Focus groups", value: "12" },
      { label: "Nuevos segmentos", value: "3" },
    ],
    image: "/images/cases/pharma.jpg",
  },
  {
    id: "automotriz",
    title: "Evaluación de Concesionarios",
    industry: "Automotriz",
    country: "Costa Rica",
    challenge:
      "Red de concesionarios automotrices buscaba mejorar la experiencia de compra y post-venta.",
    solution:
      "Programa de mystery shopping en 45 concesionarios evaluando el proceso completo de venta y servicio.",
    result:
      "Mejora del 45% en la tasa de conversión de visitantes a compradores en 8 meses.",
    metrics: [
      { label: "Concesionarios", value: "45" },
      { label: "Mejora conversión", value: "+45%" },
      { label: "Período", value: "8 meses" },
    ],
    image: "/images/cases/automotive.jpg",
  },
  {
    id: "hoteleria",
    title: "Estándar de Servicio Hotelero",
    industry: "Hotelería",
    country: "Rep. Dominicana",
    challenge:
      "Cadena hotelera premium necesitaba garantizar estándares de servicio 5 estrellas en todas sus propiedades.",
    solution:
      "Auditorías trimestrales con huéspedes misteriosos evaluando 50+ puntos de contacto en cada propiedad.",
    result:
      "Obtención de certificación de calidad internacional y mejora del 38% en reviews online.",
    metrics: [
      { label: "Puntos evaluados", value: "50+" },
      { label: "Mejora reviews", value: "+38%" },
      { label: "Certificación", value: "Obtenida" },
    ],
    image: "/images/cases/hotel.jpg",
  },
];

export const industries = [
  "Todos",
  "Banca y Finanzas",
  "Retail",
  "Telecomunicaciones",
  "Farmacéutica",
  "Automotriz",
  "Hotelería",
];
