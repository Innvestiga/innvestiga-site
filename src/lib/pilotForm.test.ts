import { describe, expect, it, vi } from "vitest";
import {
  FORMSPREE_ENDPOINT, PILOT_FIELDS, PILOT_LEAD_STORAGE_KEY,
  leadFromFormData, pilotSubject, readStoredLead, storeLead, submitToFormspree, thankYouMessage,
} from "./pilotForm";

const fd = () => {
  const f = new FormData();
  f.set("nombre", "  Ana López ");
  f.set("empresa_cargo", "Tiendas Sol - Gerente CX");
  f.set("email", "ana@sol.com");
  f.set("whatsapp", "+503 7000 0000");
  return f;
};

describe("pilot form spec", () => {
  it("posts to the client's Formspree endpoint", () => {
    expect(FORMSPREE_ENDPOINT).toBe("https://formspree.io/f/meaajblw");
  });

  it("has exactly the four client fields", () => {
    expect(PILOT_FIELDS).toEqual(["nombre", "empresa_cargo", "email", "whatsapp"]);
  });
});

describe("leadFromFormData", () => {
  it("reads and trims the four fields", () => {
    expect(leadFromFormData(fd())).toEqual({
      name: "Ana López",
      companyRole: "Tiendas Sol - Gerente CX",
      email: "ana@sol.com",
      whatsapp: "+503 7000 0000",
    });
  });

  it("returns empty strings for missing fields", () => {
    expect(leadFromFormData(new FormData()).whatsapp).toBe("");
  });
});

describe("pilotSubject", () => {
  it("names the country when the form sits on a country page", () => {
    expect(pilotSubject("Guatemala")).toBe("Solicitud de prueba piloto — Guatemala");
    expect(pilotSubject()).toBe("Solicitud de prueba piloto");
  });
});

describe("submitToFormspree", () => {
  it("POSTs the form data as JSON-accepting AJAX to the endpoint", async () => {
    const body = fd();
    const fetcher = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    await submitToFormspree(body, fetcher);
    expect(fetcher).toHaveBeenCalledWith(FORMSPREE_ENDPOINT, {
      method: "POST",
      body,
      headers: { Accept: "application/json" },
    });
  });

  it("throws when Formspree rejects the submission", async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response('{"errors":[]}', { status: 422 }));
    await expect(submitToFormspree(fd(), fetcher)).rejects.toThrow("422");
  });
});

describe("lead storage", () => {
  it("round-trips only the name", () => {
    const store = new Map<string, string>();
    const storage = {
      setItem: (k: string, v: string) => void store.set(k, v),
      getItem: (k: string) => store.get(k) ?? null,
    };
    storeLead(storage, leadFromFormData(fd()));
    expect(JSON.parse(store.get(PILOT_LEAD_STORAGE_KEY)!)).toEqual({ name: "Ana López" });
    expect(readStoredLead(storage)).toEqual({ name: "Ana López" });
  });

  it("survives missing, blocked or corrupt storage", () => {
    expect(readStoredLead(null)).toBeNull();
    expect(readStoredLead({ getItem: () => { throw new Error("blocked"); } })).toBeNull();
    expect(readStoredLead({ getItem: () => "{not json" })).toBeNull();
    expect(() => storeLead({ setItem: () => { throw new Error("quota"); } }, leadFromFormData(fd()))).not.toThrow();
  });
});

describe("thankYouMessage", () => {
  const lead = { name: "Ana" };

  it("names the executive and the hours once they are known", () => {
    expect(thankYouMessage(lead, { executive: "Carlos", hours: 24 })).toBe(
      "Gracias, Ana. Carlos te escribirá en menos de 24 horas con una propuesta de prueba piloto para tu empresa.",
    );
  });

  it("drops the unconfirmed promise while the follow-up is pending", () => {
    expect(thankYouMessage(lead, { executive: null, hours: null })).toBe(
      "Gracias, Ana. Te escribiremos con una propuesta de prueba piloto para tu empresa.",
    );
  });

  it("falls back to a generic thank-you without a lead", () => {
    expect(thankYouMessage(null, { executive: "Carlos", hours: 24 })).toBe(
      "Gracias. Recibimos tu solicitud y te escribiremos con una propuesta de prueba piloto.",
    );
  });
});
