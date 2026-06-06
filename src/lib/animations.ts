"use client";

import { gsap } from "@/lib/gsap";

const ease = [0.16, 1, 0.3, 1] as const;

export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6 },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -80 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease },
};

export const slideInRight = {
  initial: { opacity: 0, x: 80 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, ease },
};

export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5, ease },
};

export function createTextReveal(element: HTMLElement) {
  return gsap.fromTo(
    element,
    { backgroundSize: "0% 100%" },
    {
      backgroundSize: "100% 100%",
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "top 30%",
        scrub: 1,
      },
    }
  );
}
