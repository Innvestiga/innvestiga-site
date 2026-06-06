"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

interface TextRevealProps {
  children: string;
  className?: string;
  gold?: boolean;
}

export default function TextReveal({
  children,
  className = "",
  gold = false,
}: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      ref.current.style.backgroundSize = "100% 100%";
      return;
    }

    const anim = gsap.fromTo(
      ref.current,
      { backgroundSize: "0% 100%" },
      {
        backgroundSize: "100% 100%",
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          end: "top 30%",
          scrub: 1,
        },
      }
    );

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, []);

  return (
    <span
      ref={ref}
      className={`
        font-heading text-[clamp(2rem,8vw,10rem)] font-[800] uppercase leading-[0.95] tracking-tight
        bg-no-repeat bg-clip-text [-webkit-background-clip:text]
        ${gold
          ? "text-gold/10 bg-[image:linear-gradient(90deg,var(--color-gold),var(--color-gold))]"
          : "text-midnight/10 bg-[image:linear-gradient(90deg,var(--color-midnight),var(--color-midnight))]"
        }
        ${className}
      `}
    >
      {children}
    </span>
  );
}
