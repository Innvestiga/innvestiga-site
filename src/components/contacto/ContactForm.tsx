"use client";

import { useRef, useState } from "react";
import { sendContactEmail } from "@/lib/emailjs";
import Button from "@/components/ui/Button";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const messageRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const buildMessage = (form: HTMLFormElement) => {
    const get = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | null)?.value?.trim() ?? "";

    return [
      `Empresa: ${get("company_name")}`,
      `Contacto: ${get("user_name")}`,
      `Cargo: ${get("position")}`,
      `Correo electrónico: ${get("user_email")}`,
      `Teléfono: ${get("phone")}`,
      `Número aproximado de sucursales: ${get("branches")}`,
      `Países donde opera: ${get("countries")}`,
      `Punto de venta 1: ${get("pos1")}`,
      `Punto de venta 2: ${get("pos2")}`,
      `Punto de venta 3: ${get("pos3")}`,
      `Protocolo / estándar de servicio: ${get("protocol")}`,
    ].join("\n");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    // Compose every field into one readable string so the email is complete
    // even if the EmailJS template only references {{message}}.
    if (messageRef.current) {
      messageRef.current.value = buildMessage(formRef.current);
    }

    setStatus("sending");
    try {
      await sendContactEmail(formRef.current);
      setStatus("sent");
      formRef.current.reset();
      setTimeout(() => setStatus("idle"), 8000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
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

  const labelStyles = "block text-[9px] font-bold tracking-[0.3em] uppercase text-muted mb-1";

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
      {/* Hidden fields for EmailJS template independence */}
      <input type="hidden" name="title" value="Solicitud de Prueba Piloto" />
      <input ref={messageRef} type="hidden" name="message" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
        <div>
          <label className={labelStyles} htmlFor="company_name">
            Nombre de la empresa *
          </label>
          <input
            id="company_name"
            type="text"
            name="company_name"
            placeholder="Empresa S.A."
            required
            className={inputStyles}
          />
        </div>
        <div>
          <label className={labelStyles} htmlFor="user_name">
            Nombre completo del contacto *
          </label>
          <input
            id="user_name"
            type="text"
            name="user_name"
            placeholder="Nombre y apellido"
            required
            className={inputStyles}
          />
        </div>
        <div>
          <label className={labelStyles} htmlFor="position">
            Cargo
          </label>
          <input
            id="position"
            type="text"
            name="position"
            placeholder="Gerente de operaciones"
            className={inputStyles}
          />
        </div>
        <div>
          <label className={labelStyles} htmlFor="user_email">
            Correo electrónico *
          </label>
          <input
            id="user_email"
            type="email"
            name="user_email"
            placeholder="nombre@empresa.com"
            required
            className={inputStyles}
          />
        </div>
        <div>
          <label className={labelStyles} htmlFor="phone">
            Teléfono de contacto *
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            placeholder="+00 000 000 000"
            required
            className={inputStyles}
          />
        </div>
        <div>
          <label className={labelStyles} htmlFor="branches">
            Número aproximado de sucursales
          </label>
          <input
            id="branches"
            type="text"
            inputMode="numeric"
            name="branches"
            placeholder="Ej. 25"
            className={inputStyles}
          />
        </div>
        <div className="md:col-span-2">
          <label className={labelStyles} htmlFor="countries">
            Países donde operas
          </label>
          <input
            id="countries"
            type="text"
            name="countries"
            placeholder="Ej. Perú, Chile, Colombia"
            className={inputStyles}
          />
        </div>
        <div className="md:col-span-2">
          <label className={labelStyles} htmlFor="pos1">
            Punto de venta 1 (dirección exacta) *
          </label>
          <input
            id="pos1"
            type="text"
            name="pos1"
            placeholder="Dirección completa del punto de venta"
            required
            className={inputStyles}
          />
        </div>
        <div className="md:col-span-2">
          <label className={labelStyles} htmlFor="pos2">
            Punto de venta 2 (dirección exacta)
          </label>
          <input
            id="pos2"
            type="text"
            name="pos2"
            placeholder="Dirección completa del punto de venta"
            className={inputStyles}
          />
        </div>
        <div className="md:col-span-2">
          <label className={labelStyles} htmlFor="pos3">
            Punto de venta 3 (dirección exacta)
          </label>
          <input
            id="pos3"
            type="text"
            name="pos3"
            placeholder="Dirección completa del punto de venta"
            className={inputStyles}
          />
        </div>
        <div className="md:col-span-2">
          <label className={labelStyles} htmlFor="protocol">
            ¿Tienes algún protocolo o estándar de servicio que podamos tomar como base?
          </label>
          <textarea
            id="protocol"
            name="protocol"
            placeholder="Cuéntanos brevemente sobre tus estándares de servicio actuales."
            rows={4}
            className={`${inputStyles} resize-none`}
          />
        </div>
      </div>

      <div className="pt-4">
        <Button type="submit" variant="gold" className="w-full">
          {status === "sending"
            ? "Enviando..."
            : status === "sent"
              ? "Enviado"
              : status === "error"
                ? "Error — Reintentar"
                : "Enviar Solicitud"}
        </Button>
      </div>

      {status === "sent" && (
        <p className="text-center text-sm text-primary leading-relaxed mt-4">
          Gracias por tu solicitud. Muy pronto nos pondremos en contacto contigo para coordinar la
          prueba piloto.
        </p>
      )}
    </form>
  );
}
