"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const BENEFITS = [
  "Ves la evidencia de cada visita, no un resumen.",
  "Recibes resultados en máximo 3 días, cuando todavía importa.",
  "Comparas sucursales, ciudades y países con el mismo criterio.",
  "Detectas situaciones críticas a tiempo.",
  "Validas los resultados con tu equipo mediante un proceso claro.",
  "Presentas hallazgos y recomendaciones listos para tu comité.",
];

const STRIP = ["Desde 2013", "Resultados en máx. 3 días"];

// ESI is described only through benefits: no module names, screenshots or
// expansion of the acronym (spec rule B2).
export default function ESISection() {
  return (
    <section className="relative bg-[#f3f6fc] border-t border-border py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none [mask-image:radial-gradient(120%_100%_at_50%_0%,#000,transparent)]" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-primary" />
              <span className="text-[10px] font-bold tracking-[0.45em] uppercase text-primary">Tecnología</span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase leading-[0.95] tracking-tight text-ink">
              Plataforma propia, <span className="text-gold-gradient">ESI</span>
            </h2>
            <p className="mt-7 text-body text-base md:text-lg leading-relaxed">
              Cada auditoría llega a ESI, nuestra plataforma propia, operando desde 2013.
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {STRIP.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center rounded-full bg-primary/10 text-primary px-4 py-2 text-[10px] font-bold tracking-[0.15em] uppercase"
                >
                  {b}
                </span>
              ))}
            </div>
            <div className="mt-10">
              <Button href="/contacto" variant="gold">
                Solicitar prueba piloto
              </Button>
            </div>
          </motion.div>

          <ul className="rounded-3xl bg-surface border border-border p-3 md:p-4 shadow-[0_1px_3px_rgba(15,23,42,0.06),0_24px_60px_-18px_rgba(30,64,175,0.18)]">
            {BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-center gap-4 rounded-2xl px-4 py-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <p className="text-ink text-[15px] font-medium leading-snug">{benefit}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
