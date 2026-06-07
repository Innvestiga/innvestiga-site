"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import Button from "@/components/ui/Button";
import { STATS, CONTACT, PILOT_COUNTRIES } from "@/lib/constants";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { countries } from "@/data/countries";
import HeroMap from "./HeroMap";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(".hero-glow", {
        scale: 1.12,
        opacity: 0.8,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-bg"
    >
      {/* ─── Clean background: one contained brand glow + fine dot texture ─── */}
      <div className="hero-glow absolute top-[-10vh] right-[-5vw] w-[55vw] h-[55vh] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.07)_0%,transparent_65%)] blur-3xl pointer-events-none" />
      <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none [mask-image:radial-gradient(120%_90%_at_70%_30%,#000,transparent)]" />

      {/* ─── Content ─── */}
      <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 pt-36 pb-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-16 lg:gap-12">
            {/* ── Left: Typography ── */}
            <div className="flex-1 lg:max-w-[600px]">
              <motion.div
                className="flex items-center gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="w-12 h-px bg-primary" />
                <span className="text-[10px] font-bold tracking-[0.45em] uppercase text-primary">
                  Experiencia del Cliente · Plataforma ESI
                </span>
              </motion.div>

              <motion.h1
                style={{ textTransform: "none" }}
                className="font-heading text-[clamp(2.2rem,4.6vw,3.85rem)] font-[800] leading-[1.08] tracking-tight text-ink"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                ¿Sabes realmente cómo es tu{" "}
                <span className="text-gold-gradient">Experiencia del Cliente</span>?
              </motion.h1>

              <motion.p
                className="mt-7 text-body text-base md:text-lg leading-relaxed max-w-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Diseñas estándares, capacitas a tu equipo y defines procesos claros… pero
                ¿realmente sabes lo que está pasando en cada una de tus sucursales?
              </motion.p>

              <motion.p
                className="mt-4 text-body text-base md:text-lg leading-relaxed max-w-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.75 }}
              >
                Te ayudamos a cerrar esa brecha con auditorías presenciales y nuestra
                plataforma <span className="text-primary font-semibold">ESI</span>.
              </motion.p>

              <motion.p
                className="mt-6 text-muted text-xs md:text-sm leading-relaxed max-w-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.85 }}
              >
                Prueba piloto disponible en {PILOT_COUNTRIES}.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4 mt-9"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.95 }}
              >
                <Button href="/contacto" variant="gold">
                  Solicitar Prueba Piloto
                </Button>
                <Button href={CONTACT.portal} external variant="outline">
                  Ingresar a ESI
                </Button>
              </motion.div>
            </div>

            {/* ── Right: coverage panel — map + reach + countries ── */}
            <motion.div
              className="hidden lg:flex flex-col w-[46%] max-w-[560px] flex-shrink-0 rounded-[28px] border border-border bg-gradient-to-br from-[#eef3fc] via-surface to-surface overflow-hidden shadow-[0_1px_3px_rgba(15,23,42,0.05),0_24px_60px_-14px_rgba(30,64,175,0.20)]"
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-6 pt-5">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-[9px] font-bold tracking-[0.35em] uppercase text-primary/70">
                    Cobertura regional
                  </span>
                </div>
                <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-muted">
                  Centroamérica · Caribe
                </span>
              </div>

              {/* Map */}
              <div className="px-3 pt-1">
                <div className="aspect-[322/250]">
                  <HeroMap />
                </div>
              </div>

              {/* Footer: reach figures + the actual countries */}
              <div className="border-t border-border bg-surface/70 px-6 py-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-primary/70">
                    Nuestro Alcance
                  </span>
                </div>

                <div className="grid grid-cols-3 divide-x divide-border mb-5">
                  {[
                    { end: STATS.countries, label: "Países", suffix: "" },
                    { end: STATS.departments, label: "Departamentos", suffix: "" },
                    { end: STATS.municipalities, label: "Municipios", suffix: "+" },
                  ].map((s) => (
                    <div key={s.label} className="flex flex-col items-center text-center px-2">
                      <AnimatedCounter
                        end={s.end}
                        suffix={s.suffix}
                        className="text-2xl font-heading font-[800] text-primary tracking-tight leading-none"
                      />
                      <span className="mt-1.5 text-[8px] font-bold uppercase tracking-[0.16em] text-muted">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {countries.map((c) => (
                    <span
                      key={c.id}
                      className="text-[9px] font-semibold tracking-wide text-body bg-primary/[0.06] border border-primary/10 px-2.5 py-1 rounded-full"
                    >
                      {c.name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent pointer-events-none z-20" />
    </section>
  );
}
