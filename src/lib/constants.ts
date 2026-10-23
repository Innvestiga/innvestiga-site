import type { NavLink, Office } from "@/types";
import { COVERAGE, coverageHref } from "@/data/coverage";
import { SCENARIOS, scenarioHref } from "@/data/scenarios";
import { RESOURCES_HUB } from "@/data/resources";

export const SITE_NAME = "Innvestiga";
export const SITE_LEGAL_NAME = "Innvestiga Market Specialists";
export const SITE_TAGLINE = "Auditorías CX con Cliente Oculto";
export const SITE_SUBTITLE = "MARKET SPECIALISTS";
export const SITE_REGION = "Centroamérica, el Caribe y Chiapas, México";

export const FOUNDING_YEAR = 2008;
export const ESI_FIRST_YEAR = 2013;

export const STATS = {
  yearsExperience: 18,
  countries: 8,
  municipalities: 1282,
} as const;

export const CONTACT = {
  phone: "+503 7666 1141",
  phoneHref: "tel:+50376661141",
  email: "info@innvestiga.com",
  portal: "https://esi3.innvestiga.com",
  // El Salvador mobile, also the WhatsApp line (client, 2026-10-23: the
  // Guatemala landline +502 2277 7220 no longer works). WhatsApp buttons
  // stay hidden if whatsapp is emptied.
  whatsapp: "+503 7666 1141",
} as const;

// GA4 property for the production site (NEXT_PUBLIC_GA_ID overrides it).
export const GA4_MEASUREMENT_ID = "G-3N1LL20CKL";

// Google Business profile. The link does not say which office it belongs
// to, so it is listed on the organization rather than on one office.
export const GOOGLE_BUSINESS_URL = "https://share.google/0iOxKKg89kGZD7o7h";

export function whatsappHref(number: string = CONTACT.whatsapp): string | null {
  const digits = number.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : null;
}

export const OFFICES: Office[] = [
  {
    city: "Ciudad de Guatemala",
    country: "Guatemala",
    countryCode: "GT",
    address: "12 Avenida B 5-98, Zona 8, Mixco, Guatemala, Guatemala",
    streetAddress: "12 Avenida B 5-98, Zona 8",
    locality: "Mixco",
    region: "Guatemala",
    postalCode: "01057",
  },
  {
    city: "San Salvador",
    country: "El Salvador",
    countryCode: "SV",
    address: "Calle Cuscatlán No.133, Colonia Escalón, San Salvador, El Salvador",
    streetAddress: "Calle Cuscatlán No.133, Colonia Escalón",
    locality: "San Salvador",
    region: "San Salvador",
    postalCode: "01101",
  },
];

export type SocialIcon = "linkedin";

// Only LinkedIn is active for now (client, 2026-10-19); WhatsApp is shown
// next to it in the footer from CONTACT.whatsapp.
export const SOCIAL_PROFILES: { name: string; url: string; icon: SocialIcon }[] = [
  { name: "LinkedIn", url: "https://www.linkedin.com/company/innvestiga-cx-specialists", icon: "linkedin" },
];

export const NAV_LINKS: NavLink[] = [
  { number: "01", label: "Nosotros", href: "/nosotros" },
  {
    number: "02",
    label: "Servicios",
    href: "/servicios",
    children: [
      ...SCENARIOS.map((s) => ({ label: s.label, href: scenarioHref(s) })),
      { label: "Auditoría de canales digitales", href: "/servicios/canales-digitales" },
    ],
    featured: {
      title: "Centro de Recursos & Guías CX →",
      subtitle: "Estrategias de cliente incógnito, métricas de NPS y auditoría retail",
      href: RESOURCES_HUB,
    },
  },
  {
    number: "03",
    label: "Cobertura",
    href: "/cobertura",
    children: COVERAGE.map((c) => ({ label: c.name, href: coverageHref(c) })),
  },
  { number: "04", label: "Contacto", href: "/contacto" },
];

// What the pilot includes (client spec, 2026-10-20). Shown on /contacto and
// as the full answer of the pilot FAQ.
export const PILOT_SCOPE: string | null =
  "La prueba piloto de cortesía incluye tres evaluaciones a cualquiera de las sucursales de tu cadena en el país que más lo requieras, evaluadas con un protocolo base de atención. Los resultados se publicarán en la plataforma ESI en máximo 3 días, con evidencia multimedia de cada visita. Luego agendaremos una reunión para revisar los resultados, y ampliar dudas e inquietudes para la ejecución del programa completo.";

// Pending from the client: who follows up and how fast, for /gracias.
export const PILOT_FOLLOW_UP: { executive: string | null; hours: number | null } = {
  executive: null,
  hours: null,
};

