import type { NavLink, Office } from "@/types";
import { COVERAGE, coverageHref } from "@/data/coverage";
import { SCENARIOS, scenarioHref } from "@/data/scenarios";

export const SITE_NAME = "Innvestiga";
export const SITE_LEGAL_NAME = "Innvestiga Market Specialists";
export const SITE_TAGLINE = "Auditorías CX con Cliente Oculto";
export const SITE_SUBTITLE = "MARKET SPECIALISTS";
export const SITE_REGION = "Mesoamérica y el Caribe";

export const FOUNDING_YEAR = 2008;
export const ESI_FIRST_YEAR = 2013;

export const STATS = {
  yearsExperience: 18,
  countries: 8,
  municipalities: 1282,
} as const;

export const CONTACT = {
  phone: "+502 2277 7220",
  phoneHref: "tel:+50222777220",
  email: "info@innvestiga.com",
  portal: "https://esi3.innvestiga.com",
  // WhatsApp Business line; WhatsApp buttons stay hidden if this is emptied.
  whatsapp: "+502 2277 7220",
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
    city: "Guatemala City",
    country: "Guatemala",
    countryCode: "GT",
    address: "12 Avenida B 5-98, Zona 8, Mixco, Guatemala, Guatemala",
    streetAddress: "12 Avenida B 5-98, Zona 8",
    locality: "Mixco",
    region: "Guatemala",
  },
  {
    city: "San Salvador",
    country: "El Salvador",
    countryCode: "SV",
    address: "Calle Cuscatlán No.133, Colonia Escalón, San Salvador, El Salvador",
    streetAddress: "Calle Cuscatlán No.133, Colonia Escalón",
    locality: "San Salvador",
    region: "San Salvador",
  },
];

export type SocialIcon = "linkedin" | "youtube" | "tiktok" | "instagram" | "facebook" | "x";

export const SOCIAL_PROFILES: { name: string; url: string; icon: SocialIcon }[] = [
  { name: "LinkedIn", url: "https://www.linkedin.com/company/innvestiga", icon: "linkedin" },
  { name: "YouTube", url: "https://www.youtube.com/@innvestiga", icon: "youtube" },
  { name: "TikTok", url: "https://www.tiktok.com/@innvestiga", icon: "tiktok" },
  { name: "Instagram", url: "https://www.instagram.com/innvestiga", icon: "instagram" },
  { name: "Facebook", url: "https://www.facebook.com/innvestiga", icon: "facebook" },
  { name: "X", url: "https://x.com/innvestiga", icon: "x" },
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
      { label: "Otros estudios", href: "/servicios/consumer-insights", minor: true },
    ],
  },
  {
    number: "03",
    label: "Cobertura",
    href: "/cobertura",
    children: COVERAGE.map((c) => ({ label: c.name, href: coverageHref(c) })),
  },
  { number: "04", label: "Contacto", href: "/contacto" },
];

// Pending from the client: what the pilot includes. Rendered only when set.
export const PILOT_SCOPE: string | null = null;

// Pending from the client: who follows up and how fast, for /gracias.
export const PILOT_FOLLOW_UP: { executive: string | null; hours: number | null } = {
  executive: null,
  hours: null,
};

export const EMAILJS = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "e1gu7dpEs7lxyViEj",
} as const;
