// Pilot request form (client spec, 2026-10-22): four fields, posted to
// Formspree. Field names are the client's; "email" lets Formspree use the
// address as the reply-to.
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/meaajblw";

export const PILOT_FIELDS = ["nombre", "empresa_cargo", "email", "whatsapp"] as const;

export interface PilotLead {
  name: string;
  companyRole: string;
  email: string;
  whatsapp: string;
}

export const PILOT_LEAD_STORAGE_KEY = "innvestiga:pilot-lead";

export function leadFromFormData(fd: FormData): PilotLead {
  const get = (key: (typeof PILOT_FIELDS)[number]) => String(fd.get(key) ?? "").trim();
  return { name: get("nombre"), companyRole: get("empresa_cargo"), email: get("email"), whatsapp: get("whatsapp") };
}

// Formspree's _subject sets the notification subject. Country pages name
// their country so the team knows where the request came from.
export function pilotSubject(country?: string): string {
  return country ? `Solicitud de prueba piloto — ${country}` : "Solicitud de prueba piloto";
}

// POSTs the form to Formspree as AJAX (Accept: application/json), so the
// lead stays on the site. Throws when Formspree rejects the submission.
export async function submitToFormspree(body: FormData, fetcher: typeof fetch = fetch): Promise<void> {
  const res = await fetcher(FORMSPREE_ENDPOINT, {
    method: "POST",
    body,
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
}

// Only the first name is kept, for the thank-you line on /gracias.
export function storeLead(storage: Pick<Storage, "setItem"> | null, lead: PilotLead): void {
  try {
    storage?.setItem(PILOT_LEAD_STORAGE_KEY, JSON.stringify({ name: lead.name }));
  } catch {
    // Private mode or quota: /gracias falls back to the generic message.
  }
}

export function readStoredLead(storage: Pick<Storage, "getItem"> | null): { name: string } | null {
  try {
    const raw = storage?.getItem(PILOT_LEAD_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { name?: unknown };
    return typeof parsed.name === "string" && parsed.name ? { name: parsed.name } : null;
  } catch {
    return null;
  }
}

export function thankYouMessage(
  lead: { name: string } | null,
  followUp: { executive: string | null; hours: number | null },
): string {
  if (!lead) return "Gracias. Recibimos tu solicitud y te escribiremos con una propuesta de prueba piloto.";
  if (followUp.executive && followUp.hours) {
    return `Gracias, ${lead.name}. ${followUp.executive} te escribirá en menos de ${followUp.hours} horas con una propuesta de prueba piloto para tu empresa.`;
  }
  return `Gracias, ${lead.name}. Te escribiremos con una propuesta de prueba piloto para tu empresa.`;
}
