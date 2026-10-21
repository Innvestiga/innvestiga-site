import { PILOT_SCOPE } from "@/lib/constants";

export interface FaqItem {
  question: string;
  answer: string;
}

const PILOT_VALUE = "Te permite comprobar el método en tus propias sucursales antes de decidir.";

// Section G, verbatim. The pilot answer is the client's scope text when set,
// otherwise the sentence that was approved first.
export const FAQS: FaqItem[] = [
  {
    question: "¿Qué es una auditoría con cliente oculto (mystery shopper)?",
    answer:
      "Es una evaluación presencial en la que un auditor capacitado visita un punto de venta como si fuera un cliente real y califica la atención contra los estándares de la marca. También se le llama cliente misterioso. Innvestiga la realiza en 8 mercados de Centroamérica, el Caribe y Chiapas, México.",
  },
  {
    question: "¿Cuánto tardan los resultados?",
    answer: "Máximo 3 días después de cada visita, en nuestra plataforma propia ESI.",
  },
  {
    question: "¿En qué países y municipios pueden evaluar?",
    answer:
      "En Guatemala, Honduras, El Salvador, Nicaragua, Costa Rica, Panamá, República Dominicana y Chiapas, México. Podemos evaluar cualquiera de sus 1,282 municipios.",
  },
  {
    question: "¿Qué incluye la prueba piloto?",
    answer: PILOT_SCOPE ?? PILOT_VALUE,
  },
  {
    question: "¿En qué se diferencia de una encuesta de satisfacción?",
    answer:
      "La encuesta recoge la opinión de quienes deciden responder. La auditoría evalúa la misma visita, con los mismos criterios, en todas tus sucursales.",
  },
  {
    question: "¿Qué situaciones pueden auditar en una tienda?",
    answer:
      "El proceso de ventas, las garantías, el manejo de reclamos, las reparaciones y el servicio técnico, las devoluciones y cambios, y el cumplimiento de promociones y precios.",
  },
  {
    question: "¿Cómo garantizan resultados objetivos?",
    answer:
      "Los criterios se definen contigo, los auditores están capacitados y cada evaluación se respalda con evidencia, con un proceso para revisar y aclarar resultados.",
  },
  {
    question: "¿Auditan chat, redes y call center?",
    answer: "Sí, con los mismos criterios que las sucursales.",
  },
  {
    question: "¿Cuánto cuesta?",
    answer:
      "Depende del número de puntos de venta, países y frecuencia. Preparamos una propuesta a la medida; la prueba piloto permite comprobar el método antes de contratar.",
  },
];

export const HOME_FAQS = FAQS.slice(0, 4);
