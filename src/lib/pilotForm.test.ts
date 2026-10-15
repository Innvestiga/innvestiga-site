import { describe, expect, it } from "vitest";
import {
  buildPilotMessage, leadFromFormData, pilotAnalyticsParams,
  readStoredLead, storeLead, thankYouMessage, PILOT_LEAD_STORAGE_KEY,
} from "./pilotForm";

const fd = () => {
  const f = new FormData();
  f.set("user_name", "  Ana López ");
  f.set("company_name", "Tiendas Sol");
  f.set("position", "Gerente CX");
  f.set("country", "El Salvador");
  f.set("branches", "25");
  f.set("user_email", "ana@sol.com");
  f.set("whatsapp", "+503 7000 0000");
  f.set("concern", "Los tiempos de espera.");
  return f;
};

describe("leadFromFormData", () => {
  it("trims every field", () => {
    expect(leadFromFormData(fd()).name).toBe("Ana López");
  });

  it("returns empty strings for missing fields", () => {
    expect(leadFromFormData(new FormData()).concern).toBe("");
  });
});

describe("buildPilotMessage", () => {
  it("lists every answer with its Spanish label", () => {
    const msg = buildPilotMessage(leadFromFormData(fd()));
    expect(msg).toContain("Nombre: Ana López");
    expect(msg).toContain("País: El Salvador");
    expect(msg).toContain("WhatsApp: +503 7000 0000");
    expect(msg).toContain("¿Qué es lo que más te preocupa de la atención en tus sucursales hoy?\nLos tiempos de espera.");
  });
});

describe("pilotAnalyticsParams", () => {
  it("sends no personal data to analytics", () => {
    expect(pilotAnalyticsParams(leadFromFormData(fd()))).toEqual({ country: "El Salvador", branches: "25" });
  });
});

describe("lead storage", () => {
  it("round-trips only name and company", () => {
    const store = new Map<string, string>();
    const storage = {
      setItem: (k: string, v: string) => void store.set(k, v),
      getItem: (k: string) => store.get(k) ?? null,
    };
    storeLead(storage, leadFromFormData(fd()));
    expect(JSON.parse(store.get(PILOT_LEAD_STORAGE_KEY)!)).toEqual({ name: "Ana López", company: "Tiendas Sol" });
    expect(readStoredLead(storage)).toEqual({ name: "Ana López", company: "Tiendas Sol" });
  });

  it("survives missing, blocked or corrupt storage", () => {
    expect(readStoredLead(null)).toBeNull();
    expect(readStoredLead({ getItem: () => { throw new Error("blocked"); } })).toBeNull();
    expect(readStoredLead({ getItem: () => "{not json" })).toBeNull();
    expect(() => storeLead({ setItem: () => { throw new Error("quota"); } }, leadFromFormData(fd()))).not.toThrow();
  });
});

describe("thankYouMessage", () => {
  const lead = { name: "Ana", company: "Tiendas Sol" };

  it("uses the spec sentence once executive and hours are known", () => {
    expect(thankYouMessage(lead, { executive: "Carlos", hours: 24 })).toBe(
      "Gracias, Ana. Carlos te escribirá en menos de 24 horas con una propuesta de prueba piloto pensada para Tiendas Sol.",
    );
  });

  it("drops the unconfirmed promise while the follow-up is pending", () => {
    expect(thankYouMessage(lead, { executive: null, hours: null })).toBe(
      "Gracias, Ana. Te escribiremos con una propuesta de prueba piloto pensada para Tiendas Sol.",
    );
  });

  it("falls back to a generic thank-you without a lead", () => {
    expect(thankYouMessage(null, { executive: "Carlos", hours: 24 })).toBe(
      "Gracias. Recibimos tu solicitud y te escribiremos con una propuesta de prueba piloto.",
    );
  });
});
