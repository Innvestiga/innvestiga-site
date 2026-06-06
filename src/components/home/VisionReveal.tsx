"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

const words = [
  "¿CUÁNDO", "FUE", "LA", "ÚLTIMA", "VEZ",
  "QUE", "AUDITASTE", "A", "TU", "PERSONAL?",
];
const goldWords = ["HAZLO", "HOY."];

export default function VisionReveal() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      sectionRef.current.querySelectorAll(".reveal-word").forEach((el) => {
        (el as HTMLElement).style.backgroundSize = "100% 100%";
      });
      return;
    }

    const ctx = gsap.context(() => {
      const wordEls = gsap.utils.toArray<HTMLElement>(".reveal-word");

      wordEls.forEach((word) => {
        gsap.fromTo(
          word,
          { backgroundSize: "0% 100%" },
          {
            backgroundSize: "100% 100%",
            ease: "none",
            scrollTrigger: {
              trigger: word,
              start: "top 85%",
              end: "top 35%",
              scrub: 1,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const wordClass =
    "reveal-word font-heading text-[clamp(1.5rem,3.8vw,4rem)] font-[800] uppercase leading-[1.2] tracking-tight bg-no-repeat [-webkit-background-clip:text] [background-clip:text] inline-block";

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)" }}
    >
      {/* Decorative elements */}
      <div className="absolute top-12 left-12 w-px h-20 bg-gradient-to-b from-primary/30 to-transparent" />
      <div className="absolute bottom-12 right-12 w-px h-20 bg-gradient-to-t from-primary/30 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vh] rounded-full bg-primary/[0.015] blur-[120px] pointer-events-none" />

      <div className="min-h-screen flex items-center justify-center px-8 md:px-16 lg:px-24 py-32">
        <div className="text-center max-w-[1100px] mx-auto">
          <div className="flex flex-wrap justify-center items-baseline gap-x-[0.4em] gap-y-[0.15em]">
            {words.map((word, i) => (
              <span
                key={i}
                className={wordClass}
                style={{
                  color: "rgba(31, 41, 55, 0.10)",
                  backgroundImage: "linear-gradient(90deg, #1f2937, #1f2937)",
                  backgroundSize: "0% 100%",
                }}
              >
                {word}
              </span>
            ))}
            {goldWords.map((word, i) => (
              <span
                key={`gold-${i}`}
                className={wordClass}
                style={{
                  color: "rgba(30, 64, 175, 0.12)",
                  backgroundImage: "linear-gradient(90deg, #1e40af, #1e40af)",
                  backgroundSize: "0% 100%",
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
