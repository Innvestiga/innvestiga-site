"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { sendContactEmail } from "@/lib/emailjs";
import { trackEvent } from "@/lib/analytics";
import { COVERAGE } from "@/data/coverage";
import {
  CONCERN_QUESTION,
  buildPilotMessage,
  leadFromFormData,
  pilotAnalyticsParams,
  storeLead,
} from "@/lib/pilotForm";
import Button from "@/components/ui/Button";

const safeSessionStorage = () => {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
};

const inputStyles = [
  "w-full bg-transparent",
  "border-b border-border hover:border-ink/20 focus:border-primary",
  "py-4 outline-none",
  "text-sm text-ink",
  "placeholder:text-muted/40",
  "transition-colors duration-300",
].join(" ");

const labelStyles = "block text-[10px] font-bold tracking-[0.3em] uppercase text-muted mb-1";

function Field({ id, label, ...props }: { id: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className={labelStyles} htmlFor={id}>
        {label}
      </label>
      <input id={id} name={id} className={inputStyles} {...props} />
    </div>
  );
}

export default function ContactForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const messageRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form || status === "sending") return;

    const lead = leadFromFormData(new FormData(form));
    // Every answer travels in {{message}} so the notification is complete
    // whatever fields the EmailJS template references.
    if (messageRef.current) messageRef.current.value = buildPilotMessage(lead);

    setStatus("sending");
    try {
      await sendContactEmail(form);
      trackEvent("pilot_form_submit", pilotAnalyticsParams(lead));
      storeLead(safeSessionStorage(), lead);
      router.push("/gracias");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form ref={formRef} method="post" onSubmit={handleSubmit} className="space-y-5">
      {/* Hidden fields for EmailJS template independence */}
      <input type="hidden" name="title" value="Solicitud de Prueba Piloto" />
      <input ref={messageRef} type="hidden" name="message" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
        <Field id="user_name" label="Nombre *" type="text" required autoComplete="name" placeholder="Nombre y apellido" />
        <Field id="company_name" label="Empresa *" type="text" required autoComplete="organization" placeholder="Empresa S.A." />
        <Field
          id="position"
          label="Cargo *"
          type="text"
          required
          autoComplete="organization-title"
          placeholder="Gerente de experiencia del cliente"
        />
        <div>
          <label className={labelStyles} htmlFor="country">
            País *
          </label>
          <select id="country" name="country" required defaultValue="" className={inputStyles}>
            <option value="" disabled>
              Selecciona un país
            </option>
            {COVERAGE.map((c) => (
              <option key={c.slug} value={c.fullName}>
                {c.fullName}
              </option>
            ))}
          </select>
        </div>
        <Field
          id="branches"
          label="Número de sucursales *"
          type="number"
          min={1}
          inputMode="numeric"
          required
          placeholder="Ej. 25"
        />
        <Field id="user_email" label="Correo *" type="email" required autoComplete="email" placeholder="nombre@empresa.com" />
        <Field id="whatsapp" label="WhatsApp *" type="tel" required autoComplete="tel" placeholder="+503 0000 0000" />
        <div className="md:col-span-2">
          <label className={labelStyles} htmlFor="concern">
            {CONCERN_QUESTION}
          </label>
          <textarea id="concern" name="concern" rows={4} className={`${inputStyles} resize-none`} />
        </div>
      </div>

      <div className="pt-4">
        <Button type="submit" variant="gold" className="w-full">
          {status === "sending" ? "Enviando..." : status === "error" ? "Error — Reintentar" : "Solicitar prueba piloto"}
        </Button>
      </div>

      {status === "error" && (
        <p role="alert" className="text-center text-sm text-red-700 mt-4">
          No pudimos enviar tu solicitud. Inténtalo de nuevo o escríbenos a info@innvestiga.com.
        </p>
      )}
    </form>
  );
}
