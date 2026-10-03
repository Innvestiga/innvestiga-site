"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { ESI_BENEFITS, CONTACT } from "@/lib/constants";
import { BENEFIT_ICONS } from "@/lib/benefitIcons";

const BADGES = ["Desde 2013", "3ª generación", "Resultados en máx. 3 días"];

// What the client gets, first. The ESI feature list is the concrete
// deliverable of every audit, so it leads the page instead of sitting
// behind the technology story.
export default function BenefitsSection() {
  return (
    <section className="relative bg-[#f3f6fc] py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none [mask-image:radial-gradient(120%_100%_at_50%_0%,#000,transparent)]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-primary" />
            <span className="text-[10px] font-bold tracking-[0.45em] uppercase text-primary">
              Lo que recibes
            </span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-[800] uppercase leading-[0.95] tracking-tight text-ink">
            Cada auditoría, publicada en{" "}
            <span className="text-gold-gradient">máximo 3 días</span> en ESI
          </h2>
          <p className="mt-7 text-body text-base md:text-lg leading-relaxed max-w-2xl">
            Desarrollada desde el 2013 y actualmente en su tercera generación, ESI
            (Exploración Sistémica) es el corazón tecnológico de nuestro servicio: una
            plataforma completa para gestionar tu Experiencia del Cliente de forma
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
        </motion.div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ESI_BENEFITS.map((benefit, i) => (
            <motion.div
              key={benefit}
              className="group rounded-2xl bg-surface border border-border p-6 shadow-[0_1px_3px_rgba(15,23,42,0.06),0_8px_24px_rgba(15,23,42,0.04)] hover:border-primary/30 hover:shadow-[0_1px_3px_rgba(15,23,42,0.08),0_20px_48px_rgba(30,64,175,0.12)] transition-all duration-500"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
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
              <span className="mt-5 block text-[9px] font-bold tracking-[0.35em] uppercase text-muted">
                0{i + 1}
              </span>
              <p className="mt-2 text-ink text-[15px] font-medium leading-snug">{benefit}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 flex flex-wrap items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Button href="/contacto" variant="gold">
            Solicitar Prueba Piloto
          </Button>
          <Button href={CONTACT.portal} external variant="outline">
            Quiero conocer ESI
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
