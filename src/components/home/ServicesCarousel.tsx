"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { services } from "@/data/services";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import ServiceCard from "@/components/servicios/ServiceCard";

export default function ServicesCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current || isMobile) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const track = trackRef.current;
    const totalWidth = track.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-surface-alt overflow-hidden"
    >
      {/* Atmospheric top gradient */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-bg to-transparent pointer-events-none" />
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="px-8 md:px-16 lg:px-24 pt-32 pb-12 md:pb-0">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-gold/50" />
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-gold/70">
                Soluciones
              </span>
            </div>
            <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-[800] leading-[0.88] uppercase max-w-4xl tracking-tighter text-ink">
              Servicios que revelan
              <br />
              <span className="text-muted">lo que otros no ven.</span>
            </h2>
          </div>
        </div>

        {/* Cards track */}
        {isMobile ? (
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 px-8 pb-24 pt-10 scrollbar-hide">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div
            ref={trackRef}
            className="flex gap-8 pl-24 pr-16 pt-16 pb-32 will-change-transform"
            style={{ width: "fit-content" }}
          >
            {services.map((service, i) => (
              <ServiceCard
                key={service.id}
                service={service}
                width={i === 0 ? "42vw" : i === 1 ? "34vw" : "34vw"}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
