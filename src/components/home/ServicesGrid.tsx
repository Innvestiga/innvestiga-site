"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SCENARIOS, scenarioHref } from "@/data/scenarios";

// The six audit situations of section E, each linking to its page.
export default function ServicesGrid() {
  return (
    <section className="relative bg-surface border-t border-border overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 pt-32 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-px bg-primary" />
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-primary">
              Servicios
            </span>
          </div>
          <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.88] uppercase max-w-4xl tracking-tighter text-ink">
            Situaciones que una auditoría
            <br />
            <span className="text-muted">te ayuda a resolver.</span>
          </h2>
        </motion.div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SCENARIOS.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={scenarioHref(s)}
                className="group relative flex h-full flex-col rounded-2xl overflow-hidden bg-surface border border-border p-8 shadow-[0_1px_3px_rgba(15,23,42,0.06),0_12px_32px_rgba(15,23,42,0.08)] hover:border-primary/40 hover:shadow-[0_1px_3px_rgba(15,23,42,0.08),0_20px_48px_rgba(30,64,175,0.12)] transition-all duration-700"
              >
                <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary/[0.05] blur-[80px] group-hover:bg-primary/[0.1] transition-all duration-700 pointer-events-none" />
                <div className="absolute top-0 right-0 w-24 h-24">
                  <div className="absolute top-6 right-6 w-12 h-px bg-primary/20 group-hover:w-16 group-hover:bg-primary/40 transition-all duration-500" />
                  <div className="absolute top-6 right-6 h-12 w-px bg-primary/20 group-hover:h-16 group-hover:bg-primary/40 transition-all duration-500" />
                </div>

                <span className="relative z-10 text-[4.5rem] font-heading font-bold leading-none text-ink/[0.06] group-hover:text-primary/[0.1] transition-colors duration-700">
                  0{i + 1}
                </span>

                <div className="relative z-10 mt-6 flex-1">
                  <h3 className="text-2xl md:text-[1.7rem] font-heading font-bold uppercase leading-[0.95] text-ink group-hover:text-primary transition-colors duration-500">
                    {s.label}
                  </h3>
                  <p className="mt-4 text-[14px] text-body leading-relaxed">
                    {s.question}
                  </p>
                </div>

                <div className="relative z-10 flex items-center gap-2 mt-8 text-[10px] font-bold tracking-[0.3em] uppercase text-primary/60 group-hover:text-primary group-hover:gap-4 transition-all duration-500">
                  <span>Ver auditoría</span>
                  <div className="w-4 h-px bg-current transition-all duration-500 group-hover:w-8" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <Link
          href="/servicios/canales-digitales"
          className="group inline-flex items-center gap-3 mt-10 text-[11px] font-bold tracking-[0.25em] uppercase text-primary/70 hover:text-primary transition-colors"
        >
          <span>Auditoría de canales digitales</span>
          <span className="w-4 h-px bg-current transition-all duration-300 group-hover:w-8" />
        </Link>
      </div>
    </section>
  );
}
