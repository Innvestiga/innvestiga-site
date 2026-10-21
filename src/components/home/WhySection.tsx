"use client";

import { motion } from "framer-motion";

const REASONS = [
  {
    title: "Equipo logístico en la región.",
    text: "Podemos evaluar cualquiera de los 1,282 municipios de 8 mercados, con un mismo método.",
  },
  { title: "Resultados en máximo 3 días.", text: "Decides cuando todavía importa." },
  { title: "Plataforma propia, ESI.", text: "Evidencia, comparativos y resultados claros para tu comité." },
  {
    title: "18 años de experiencia.",
    text: "Innvestiga mide servicio en la región desde 2008, y desde 2013 con ESI.",
  },
];

export default function WhySection() {
  return (
    <section className="relative bg-bg border-t border-border py-24 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-px bg-primary" />
          <span className="text-[10px] font-bold tracking-[0.45em] uppercase text-primary">Por qué nosotros</span>
        </div>
        <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase leading-[0.95] tracking-tight text-ink">
          Por qué <span className="text-gold-gradient">Innvestiga</span>
        </h2>
        <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {REASONS.map((r, i) => (
            <motion.li
              key={r.title}
              className="rounded-2xl bg-surface border border-border p-7"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 style={{ textTransform: "none" }} className="font-heading text-lg font-bold text-ink leading-snug">
                {r.title}
              </h3>
              <p className="mt-2 text-[14.5px] text-body leading-relaxed">{r.text}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
