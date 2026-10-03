"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { ESI_BENEFITS, CONTACT } from "@/lib/constants";
import { BENEFIT_ICONS } from "@/lib/benefitIcons";

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
