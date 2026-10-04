"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { ESI_BENEFITS, CONTACT } from "@/lib/constants";
import { BENEFIT_ICONS } from "@/lib/benefitIcons";

// What a client gets out of a program. Each line paraphrases the promise of
// one service or ESI feature as it is written on this site (services.ts,
// ESI_BENEFITS), so nothing here claims more than the service pages do.
const OUTCOMES = [
  {
    title: "Fortalezas y áreas de mejora de tus equipos comerciales",
    text: "Evaluaciones presenciales con metodología propia en cada punto de venta.",
  },
  {
    title: "Consistencia en todos tus canales",
    text: "Sucursal, chat, redes sociales y call center medidos con los mismos criterios.",
  },
  {
    title: "Situaciones críticas identificadas a tiempo",
    text: "Casos relevantes con video, fotografías y audio, no con un resumen.",
  },
  {
    title: "Decisiones basadas en datos reales",
    text: "Rankings, tiempos de atención y reportes comparables entre países y regiones.",
  },
];

const BADGES = ["Desde 2013", "3ª generación", "Resultados en máx. 3 días"];

export default function BenefitsSection() {
  return (
    <section className="relative bg-[#f3f6fc] py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none [mask-image:radial-gradient(120%_100%_at_50%_0%,#000,transparent)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ── Left: the outcomes ── */}
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-primary" />
              <span className="text-[10px] font-bold tracking-[0.45em] uppercase text-primary">
                Lo que ganas
              </span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-[800] uppercase leading-[0.95] tracking-tight text-ink">
              Lo que cambia con un{" "}
              <span className="text-gold-gradient">programa</span>
            </h2>

            <ol className="mt-10 space-y-0 border-t border-border">
              {OUTCOMES.map((o, i) => (
                <motion.li
                  key={o.title}
                  className="grid grid-cols-[2.5rem_1fr] gap-4 py-5 border-b border-border"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="font-heading font-[800] text-2xl text-primary leading-none pt-0.5">
                    0{i + 1}
                  </span>
                  <div>
                    <h3
                      style={{ textTransform: "none", letterSpacing: "-0.01em" }}
                      className="font-body text-[17px] font-semibold text-ink leading-snug"
                    >
                      {o.title}
                    </h3>
                    <p className="mt-1 text-[14.5px] text-body leading-relaxed">{o.text}</p>
                  </div>
                </motion.li>
              ))}
            </ol>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/contacto" variant="gold">
                Solicitar Prueba Piloto
              </Button>
            </div>
          </motion.div>

          {/* ── Right: what every audit delivers in ESI ── */}
          <motion.div
            className="lg:col-span-6 rounded-3xl bg-surface border border-border p-6 md:p-8 shadow-[0_1px_3px_rgba(15,23,42,0.06),0_24px_60px_-18px_rgba(30,64,175,0.18)]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between gap-4">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary/70">
                Cada auditoría, en ESI
              </span>
              <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-muted">
                Exploración Sistémica
              </span>
            </div>

            <ul className="mt-5 grid sm:grid-cols-2 gap-x-6 gap-y-1">
              {ESI_BENEFITS.map((benefit, i) => (
                <li
                  key={benefit}
                  className="group flex items-start gap-3 rounded-xl px-2 py-2.5 transition-colors duration-300 hover:bg-[#f3f6fc]"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                    <svg
                      width="15"
                      height="15"
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
                  <span className="text-ink text-[13.5px] font-medium leading-snug">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-5 border-t border-border flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {BADGES.map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3.5 py-1.5 text-[9px] font-bold tracking-[0.15em] uppercase"
                  >
                    {b}
                  </span>
                ))}
              </div>
              <Button href={CONTACT.portal} external variant="outline" className="!px-6 !py-3">
                Quiero conocer ESI
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
