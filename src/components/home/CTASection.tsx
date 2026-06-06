"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import Button from "@/components/ui/Button";
import { CONTACT } from "@/lib/constants";

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(".cta-marquee", {
        xPercent: -50,
        ease: "none",
        duration: 50,
        repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden bg-surface-alt"
    >
      {/* Multi-layer atmospheric glow */}
      <div className="absolute inset-0 bg-[radial-gradient(800px_circle_at_50%_50%,rgba(37,99,235,0.04),transparent_60%)]" />

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />

      {/* Scrolling marquee background */}
      <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none select-none">
        <div className="cta-marquee flex whitespace-nowrap">
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="text-[clamp(20vh,40vh,70vh)] font-heading font-[800] text-primary/[0.05] uppercase leading-none px-[3vw] tracking-tighter"
            >
              PRUEBA PILOTO ·
            </span>
          ))}
        </div>
      </div>

      {/* CTA Content */}
      <div className="relative z-10 text-center px-6">
        {/* Top decorative line */}
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-primary/40 mx-auto mb-12" />

        <h2 className="font-heading text-5xl md:text-7xl lg:text-[6.5rem] font-[800] uppercase leading-[0.85] tracking-tighter mb-8">
          <span className="text-gold-gradient block">Solicita tu</span>
          <span className="text-ink block">Prueba Piloto</span>
        </h2>

        <p className="text-body text-[11px] tracking-[0.3em] uppercase mb-12 max-w-sm mx-auto font-light">
          Comprueba en terreno lo que realmente sucede en tus puntos de venta
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button href="/contacto" variant="gold">
            Solicitar Prueba Piloto
          </Button>
          <Button href={CONTACT.portal} variant="outline" external>
            Ingresar a ESI
          </Button>
        </div>

        {/* Bottom decorative line */}
        <div className="w-px h-16 bg-gradient-to-t from-transparent to-primary/20 mx-auto mt-12" />
      </div>
    </section>
  );
}
