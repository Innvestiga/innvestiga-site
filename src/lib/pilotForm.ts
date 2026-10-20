export interface PilotLead {
  name: string;
  company: string;
  position: string;
  country: string;
  branches: string;
  email: string;
  whatsapp: string;
  concern: string;
}

export const CONCERN_QUESTION = "¿Qué es lo que más te preocupa de la atención en tus sucursales hoy?";
export const PILOT_LEAD_STORAGE_KEY = "innvestiga:pilot-lead";

// The form lets the lead pick several countries ("countries" checkboxes);
// they travel to EmailJS as one "country" value, e.g. "Guatemala, Honduras".
export function selectedCountries(fd: FormData): string {
  const picked = fd.getAll("countries").map((v) => String(v).trim()).filter(Boolean);
  return picked.length ? picked.join(", ") : String(fd.get("country") ?? "").trim();
}

// Field names match the EmailJS templates (notification + auto-reply).
export function leadFromFormData(fd: FormData): PilotLead {
  const get = (key: string) => String(fd.get(key) ?? "").trim();
  return {
    name: get("user_name"),
    company: get("company_name"),
    position: get("position"),
    country: selectedCountries(fd),
    branches: get("branches"),
    email: get("user_email"),
    whatsapp: get("whatsapp"),
    concern: get("concern"),
  };
}

export function buildPilotMessage(lead: PilotLead): string {
  return [
    `Nombre: ${lead.name}`,
    `Empresa: ${lead.company}`,
    `Cargo: ${lead.position}`,
    `País(es): ${lead.country}`,
    `Número de sucursales: ${lead.branches}`,
    `Correo: ${lead.email}`,
    `WhatsApp: ${lead.whatsapp}`,
    "",
    CONCERN_QUESTION,
    lead.concern,
  ].join("\n");
}

// Analytics must never receive personal data.
export function pilotAnalyticsParams(lead: PilotLead): { country: string; branches: string } {
  return { country: lead.country, branches: lead.branches };
}

export function storeLead(storage: Pick<Storage, "setItem"> | null, lead: PilotLead): void {
  try {
    storage?.setItem(PILOT_LEAD_STORAGE_KEY, JSON.stringify({ name: lead.name, company: lead.company }));
  } catch {
    // Private mode or quota: /gracias falls back to the generic message.
  }
}

export function readStoredLead(storage: Pick<Storage, "getItem"> | null): { name: string; company: string } | null {
  try {
    const raw = storage?.getItem(PILOT_LEAD_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { name?: unknown; company?: unknown };
    return typeof parsed.name === "string" && typeof parsed.company === "string" && parsed.name
      ? { name: parsed.name, company: parsed.company }
      : null;
  } catch {
    return null;
  }
}

export function thankYouMessage(
  lead: { name: string; company: string } | null,
  followUp: { executive: string | null; hours: number | null },
): string {
  if (!lead) return "Gracias. Recibimos tu solicitud y te escribiremos con una propuesta de prueba piloto.";
  if (followUp.executive && followUp.hours) {
    return `Gracias, ${lead.name}. ${followUp.executive} te escribirá en menos de ${followUp.hours} horas con una propuesta de prueba piloto pensada para ${lead.company}.`;
  }
  return `Gracias, ${lead.name}. Te escribiremos con una propuesta de prueba piloto pensada para ${lead.company}.`;
}
