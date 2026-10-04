"use client";

import { motion } from "framer-motion";
import { services } from "@/data/services";

// The four steps of a sales-process audit, as defined on the service itself.
const audit = services[0];
const steps = audit.process;

export default function ProcessSection() {
  return (
    <section className="relative bg-bg overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none [mask-image:radial-gradient(100%_80%_at_50%_50%,#000,transparent)]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 py-24 md:py-28">
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-primary" />
              <span className="text-[10px] font-bold tracking-[0.45em] uppercase text-primary">
                Cómo trabajamos
              </span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-[800] uppercase leading-[0.95] tracking-tight text-ink">
              Cuatro pasos, un{" "}
              <span className="text-gold-gradient">mismo método</span>
            </h2>
          </div>
          <p className="text-body text-base md:text-lg leading-relaxed md:max-w-md">
            {audit.shortDescription}
          </p>
        </motion.div>

        <ol className="relative mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 pt-8">
          {/* Progress rule drawn across the top as the row comes into view */}
          <div className="absolute top-0 left-0 right-0 h-px bg-border" />
          <motion.div
            className="absolute top-0 left-0 h-px bg-primary"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          />
          {steps.map((s, i) => (
            <motion.li
              key={s.step}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.25 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="absolute -top-[2.45rem] left-0 h-3 w-3 rounded-full bg-primary ring-4 ring-bg" />
              <span className="font-heading font-[800] text-[2.75rem] leading-none text-ink/[0.08]">
                0{s.step}
              </span>
              <h3 className="mt-2 font-heading text-xl md:text-2xl font-[800] uppercase tracking-tight text-ink">
                {s.title}
              </h3>
              <p className="mt-2 text-[14.5px] text-body leading-relaxed">{s.description}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
