import type { NavLink, Office } from "@/types";

export const SITE_NAME = "Innvestiga";
export const SITE_TAGLINE = "INTELIGENCIA DE MERCADO PREMIUM";
export const SITE_SUBTITLE = "MARKET SPECIALIST";
export const SITE_DESCRIPTION =
  "Innvestiga — Inteligencia de Mercado Premium. Auditorías de proceso de venta, canales digitales y consumer insights en 8 países de Centroamérica y México.";

export const CONTACT = {
  phone: "+502.2277.7220",
  email: "info@innvestiga.com",
  portal: "https://esi3.innvestiga.com",
  linkedin: "https://linkedin.com/company/innvestiga",
} as const;

export const OFFICES: Office[] = [
  {
    city: "Guatemala City",
    country: "Guatemala",
    address: "Zona 10, Ciudad de Guatemala",
    phone: "+502.2277.7220",
  },
  {
    city: "San Salvador",
    country: "El Salvador",
    address: "San Salvador, El Salvador",
    phone: "+503.2505.0000",
  },
];

export const NAV_LINKS: NavLink[] = [
  { number: "01", label: "Nosotros", href: "/nosotros" },
  { number: "02", label: "Servicios", href: "/servicios" },
  { number: "03", label: "Cobertura", href: "/cobertura" },
  { number: "04", label: "Contacto", href: "/contacto" },
];

export const STATS = {
  countries: 8,
  departments: 90,
  municipalities: 450,
  yearsExperience: 15,
  completedStudies: 2500,
  activeClients: 120,
} as const;

export const PILOT_COUNTRIES =
  "Guatemala, El Salvador, Honduras, Nicaragua, Costa Rica, Panamá, República Dominicana y Chiapas, México";

export const PILOT_COUNTRIES_LIST = [
  "Guatemala",
  "El Salvador",
  "Honduras",
  "Nicaragua",
  "Costa Rica",
  "Panamá",
  "República Dominicana",
  "Chiapas, México",
] as const;

// ESI platform (Exploración Sistémica) — 3rd generation, since 2013.
export const ESI_BENEFITS = [
  "Dashboard con indicadores clave y tendencias",
  "Acceso completo a cada evaluación con videos editados, fotografías y audio",
  "Rankings por país, región, área y punto de venta",
  "Casos Relevantes para identificar situaciones críticas",
  "Medición detallada de tiempos de atención",
  "Visualización geográfica en Geo-Métrica con Google Maps",
  "Sistema de Tickets para revisiones y apelaciones",
  "Reportes y exportación a Excel",
] as const;

export const EMAILJS = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "e1gu7dpEs7lxyViEj",
} as const;
