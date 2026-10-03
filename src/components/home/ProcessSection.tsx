"use client";

import { motion } from "framer-motion";
import { services } from "@/data/services";

// The four steps of a sales-process audit, as defined on the service itself.
const steps = services[0].process;

export default function ProcessSection() {
  return (
    <section className="relative bg-bg overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none [mask-image:radial-gradient(100%_80%_at_50%_50%,#000,transparent)]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 py-28 md:py-32">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-primary" />
              <span className="text-[10px] font-bold tracking-[0.45em] uppercase text-primary">
                Cómo trabajamos
              </span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-[800] uppercase leading-[0.95] tracking-tight text-ink">
              De la visita a la{" "}
              <span className="text-gold-gradient">decisión</span>
            </h2>
            <p className="mt-7 text-body text-base md:text-lg leading-relaxed">
              Nuestras auditorías de proceso de venta permiten evaluar el desempeño de tus
              equipos comerciales en el punto de venta. Utilizamos clientes misteriosos
              capacitados que realizan visitas presenciales para medir el cumplimiento de
              protocolos, la calidad de atención y la efectividad del proceso comercial.
            </p>
          </motion.div>

          <ol className="lg:col-span-8 relative grid sm:grid-cols-2 gap-x-8 gap-y-10 pt-8">
            {/* Progress rule drawn across the top as the list comes into view */}
            <motion.div
              className="absolute top-0 left-0 h-px bg-primary/60"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            />
            {steps.map((s, i) => (
              <motion.li
                key={s.step}
                className="relative pl-14"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-heading font-[800] text-sm shadow-[0_4px_14px_rgba(30,64,175,0.25)]">
                  0{s.step}
                </span>
                <h3 className="font-heading text-xl md:text-2xl font-[800] uppercase tracking-tight text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-[14.5px] text-body leading-relaxed">{s.description}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
