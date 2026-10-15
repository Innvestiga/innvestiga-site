"use client";

import { Fragment, useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

// Sentence case in the source so the HTML reads as a normal sentence; the
// word class uppercases it visually.
const QUESTION = "¿Cuándo fue la última vez que auditaste a tu personal?";
const CALL = "Hazlo hoy.";
const words = QUESTION.split(" ");
const goldWords = CALL.split(" ");

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
    "reveal-word font-heading text-[clamp(1.5rem,3.8vw,4rem)] font-bold uppercase leading-[1.2] tracking-tight bg-no-repeat [-webkit-background-clip:text] [background-clip:text] inline-block";

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-border"
      style={{ background: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)" }}
    >
      {/* Decorative elements */}
      <div className="absolute top-12 left-12 w-px h-20 bg-gradient-to-b from-primary/30 to-transparent" />
      <div className="absolute bottom-12 right-12 w-px h-20 bg-gradient-to-t from-primary/30 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vh] rounded-full bg-primary/[0.015] blur-[120px] pointer-events-none" />

      <div className="min-h-screen flex items-center justify-center px-8 md:px-16 lg:px-24 py-32">
        <div className="text-center max-w-[1100px] mx-auto">
          <p className="flex flex-wrap justify-center items-baseline gap-x-[0.4em] gap-y-[0.15em]">
            {/* A real space after each word keeps the sentence intact in the
                HTML; flex drops whitespace-only text, so layout is unchanged. */}
            {[...words, ...goldWords].map((word, i) => {
              const gold = i >= words.length;
              return (
                <Fragment key={i}>
                  <span
                    className={wordClass}
                    style={{
                      color: gold ? "rgba(30, 64, 175, 0.12)" : "rgba(31, 41, 55, 0.10)",
                      backgroundImage: gold
                        ? "linear-gradient(90deg, #1e40af, #1e40af)"
                        : "linear-gradient(90deg, #1f2937, #1f2937)",
                      backgroundSize: "0% 100%",
                    }}
                  >
                    {word}
                  </span>{" "}
                </Fragment>
              );
            })}
          </p>
        </div>
      </div>
    </section>
  );
}
