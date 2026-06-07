"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { ESI_BENEFITS, CONTACT } from "@/lib/constants";

// One distinct icon per ESI benefit (index-aligned with ESI_BENEFITS).
// lucide-style stroke icons rendered inside a shared 24×24 svg wrapper.
const BENEFIT_ICONS: React.ReactNode[] = [
  // Dashboard con indicadores clave y tendencias
  <>
    <rect x="3" y="3" width="7" height="9" rx="1" />
    <rect x="14" y="3" width="7" height="5" rx="1" />
    <rect x="14" y="12" width="7" height="9" rx="1" />
    <rect x="3" y="16" width="7" height="5" rx="1" />
  </>,
  // Acceso a evaluación con videos / fotos / audio
  <>
    <circle cx="12" cy="12" r="9" />
    <polygon points="10 8 16 12 10 16 10 8" />
  </>,
  // Rankings por país, región, área y punto de venta
  <>
    <polyline points="3 17 9 11 13 15 21 7" />
    <polyline points="15 7 21 7 21 13" />
  </>,
  // Casos Relevantes / situaciones críticas
  <>
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </>,
  // Medición detallada de tiempos de atención
  <>
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 7 12 12 15 14" />
  </>,
  // Geo-Métrica con Google Maps
  <>
    <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </>,
  // Sistema de Tickets para revisiones y apelaciones
  <>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </>,
  // Reportes y exportación a Excel
  <>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="8" y1="13" x2="16" y2="13" />
    <line x1="8" y1="17" x2="16" y2="17" />
  </>,
];

const BADGES = ["Desde 2013", "3ª generación", "Resultados en máx. 3 días"];

export default function ESISection() {
  return (
    <section className="relative bg-[#f3f6fc] py-28 md:py-36 overflow-hidden">
      {/* Subtle dot texture, masked so it fades out */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none [mask-image:radial-gradient(120%_100%_at_50%_0%,#000,transparent)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* ── Left: narrative ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-primary" />
              <span className="text-[10px] font-bold tracking-[0.45em] uppercase text-primary">
                Tecnología
              </span>
            </div>

            <h2 className="font-heading text-4xl md:text-5xl font-[800] uppercase leading-[0.95] tracking-tight text-ink">
              Nuestra Plataforma{" "}
              <span className="text-gold-gradient">ESI</span>
            </h2>

            <p className="mt-7 text-body text-base md:text-lg leading-relaxed">
              Desarrollada desde el 2013 y actualmente en su tercera generación, ESI
              (Exploración Sistémica) es el corazón tecnológico de nuestro servicio.
            </p>
            <p className="mt-4 text-body text-base md:text-lg leading-relaxed">
              Publicamos los resultados de cada auditoría en máximo 3 días y te entregamos
              una plataforma completa para gestionar tu Experiencia del Cliente de forma
              inteligente.
            </p>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {BADGES.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center rounded-full bg-primary/10 text-primary px-4 py-2 text-[10px] font-bold tracking-[0.15em] uppercase"
                >
                  {b}
                </span>
              ))}
            </div>

            <div className="mt-10">
              <Button href={CONTACT.portal} external variant="gold">
                Quiero conocer ESI
              </Button>
            </div>
          </motion.div>

          {/* ── Right: benefits with distinct icons ── */}
          <motion.div
            className="rounded-3xl bg-surface border border-border p-3 md:p-4 shadow-[0_1px_3px_rgba(15,23,42,0.06),0_24px_60px_-18px_rgba(30,64,175,0.18)]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {ESI_BENEFITS.map((benefit, i) => (
              <motion.div
                key={benefit}
                className="group flex items-center gap-4 rounded-2xl px-4 py-3.5 transition-colors duration-300 hover:bg-[#f3f6fc]"
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {BENEFIT_ICONS[i]}
                  </svg>
                </span>
                <p className="text-ink text-[14.5px] font-medium leading-snug">
                  {benefit}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
