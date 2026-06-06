"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import Button from "@/components/ui/Button";
import GlassCard from "@/components/ui/GlassCard";
import { STATS, CONTACT, PILOT_COUNTRIES } from "@/lib/constants";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import HeroMap from "./HeroMap";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(".hero-watermark", {
        xPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      gsap.to(".hero-glow", {
        scale: 1.1,
        opacity: 0.7,
        duration: 4,
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
      {/* ─── Atmospheric layers ─── */}
      <div className="hero-glow absolute -top-[20vh] -right-[10vw] w-[70vw] h-[70vh] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.10)_0%,transparent_70%)] blur-3xl pointer-events-none" />
      <div className="absolute -bottom-[20vh] -left-[10vw] w-[50vw] h-[50vh] rounded-full bg-[radial-gradient(circle,rgba(30,64,175,0.06)_0%,transparent_70%)] blur-3xl pointer-events-none" />
      <div className="absolute inset-0 gradient-mesh pointer-events-none" />

      {/* ─── SVG Map — large background element ─── */}
      <div className="absolute inset-0 flex items-center justify-end pointer-events-none">
        <motion.div
          className="w-[75vw] lg:w-[60vw] h-[80vh] mr-[-5vw] opacity-60 lg:opacity-80"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <HeroMap />
        </motion.div>
      </div>

      {/* ─── Decorative corner lines ─── */}
      <div className="absolute top-32 right-16 w-px h-24 bg-gradient-to-b from-gold/30 to-transparent hidden lg:block" />
      <div className="absolute top-32 right-16 w-24 h-px bg-gradient-to-l from-gold/30 to-transparent hidden lg:block" />
      <div className="absolute bottom-24 left-16 w-px h-16 bg-gradient-to-t from-gold/20 to-transparent hidden lg:block" />
      <div className="absolute bottom-24 left-16 w-16 h-px bg-gradient-to-r from-gold/20 to-transparent hidden lg:block" />

      {/* ─── Watermark ─── */}
      <div className="hero-watermark absolute top-1/2 -translate-y-1/2 left-0 whitespace-nowrap text-[18vw] font-heading font-[800] leading-none pointer-events-none select-none z-0 text-ink/[0.03] tracking-tighter">
        INNVESTIGA INNVESTIGA INNVESTIGA
      </div>

      {/* ─── Content ─── */}
      <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 pt-36 pb-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-16">
            {/* Left: Typography */}
            <div className="flex-1 max-w-4xl">
              <motion.div
                className="flex items-center gap-4 mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="w-12 h-px bg-primary" />
                <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-primary">
                  Experiencia del Cliente · Plataforma ESI
                </span>
              </motion.div>

              <motion.h1
                className="font-heading normal-case text-[clamp(2.2rem,5vw,4.25rem)] font-[800] leading-[1.05] tracking-tight text-ink"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                ¿Sabes realmente cómo es tu{" "}
                <span className="text-gold-gradient">Experiencia del Cliente</span>?
              </motion.h1>

              <motion.p
                className="mt-8 text-body text-base md:text-lg leading-relaxed max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Diseñas estándares, capacitas a tu equipo y defines procesos claros… pero
                ¿realmente sabes lo que está pasando en cada una de tus sucursales?
              </motion.p>

              <motion.p
                className="mt-4 text-body text-base md:text-lg leading-relaxed max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.75 }}
              >
                Te ayudamos a cerrar esa brecha con auditorías presenciales y nuestra
                plataforma <span className="text-primary font-semibold">ESI</span>.
              </motion.p>

              <motion.p
                className="mt-6 text-muted text-xs md:text-sm leading-relaxed max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.85 }}
              >
                Prueba piloto disponible en {PILOT_COUNTRIES}.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <Button href="/contacto" variant="gold">
                  Solicitar Prueba Piloto
                </Button>
                <Button href={CONTACT.portal} external variant="outline">
                  Ingresar a ESI
                </Button>
              </motion.div>
            </div>

            {/* Right: Stats glass card */}
            <motion.div
              className="hidden lg:block w-[340px] flex-shrink-0"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <GlassCard gold className="space-y-8">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-primary/70">
                    Nuestro Alcance
                  </span>
                </div>

                <div className="space-y-5">
                  {[
                    { end: STATS.countries, label: "Países", suffix: "" },
                    { end: STATS.departments, label: "Departamentos", suffix: "" },
                    { end: STATS.municipalities, label: "Municipios", suffix: "+" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-baseline justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                      <AnimatedCounter
                        end={stat.end}
                        suffix={stat.suffix}
                        className="text-3xl font-heading font-[800] text-primary tracking-tight"
                      />
                      <span className="text-[9px] tracking-[0.3em] uppercase text-muted font-bold">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <Button href="/cobertura" variant="ghost" className="text-[9px] px-0 tracking-[0.2em]">
                    Ver cobertura completa →
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent pointer-events-none z-20" />
    </section>
  );
}
