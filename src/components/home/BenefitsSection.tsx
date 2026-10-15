"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import DifferenceBlock from "./DifferenceBlock";

// What a client gets out of an audit. The spec keeps these four lines as
// they are.
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

export default function BenefitsSection() {
  return (
    <section className="relative bg-surface-alt border-t border-border py-24 md:py-32 overflow-hidden">
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
                Beneficios
              </span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase leading-[0.95] tracking-tight text-ink">
              Lo que ganas con una{" "}
              <span className="text-gold-gradient">auditoría</span>
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
                  <span className="font-heading font-bold text-2xl text-primary leading-none pt-0.5">
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
                Solicitar prueba piloto
              </Button>
            </div>
          </motion.div>

          <DifferenceBlock />
        </div>
      </div>
    </section>
  );
}
