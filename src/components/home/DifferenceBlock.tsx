"use client";

import { motion } from "framer-motion";

// Survey vs audit, right after the four outcomes (spec section D).
export default function DifferenceBlock() {
  return (
    <motion.div
      className="lg:col-span-6 rounded-3xl bg-surface border border-border p-7 md:p-10 shadow-[0_1px_3px_rgba(15,23,42,0.06),0_24px_60px_-18px_rgba(30,64,175,0.18)]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary/70">La diferencia</span>
      <h2
        style={{ textTransform: "none" }}
        className="mt-5 font-heading text-2xl md:text-[2rem] font-bold leading-tight tracking-tight text-ink"
      >
        Una encuesta mide a quien responde.{" "}
        <span className="text-gold-gradient">Una auditoría mide a todas tus sucursales.</span>
      </h2>
      <p className="mt-6 text-body text-base leading-relaxed">
        Las encuestas reflejan la opinión de los clientes que deciden contestar. Una auditoría con cliente oculto evalúa la
        misma visita, con los mismos criterios, en cada punto de venta. Así sabes dónde se cumple tu estándar y dónde no.
      </p>
    </motion.div>
  );
}
