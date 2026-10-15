"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { startsInView } from "./aboveFold";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

const format = (n: number) => Math.round(n).toLocaleString("en-US");

// The server HTML carries the final number so crawlers and no-JS readers
// see it; the count-up runs on the client when the number scrolls in.
export default function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
  duration = 2,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (startsInView(el.getBoundingClientRect().top, window.innerHeight)) return;

    const obj = { val: 0 };
    const render = () => {
      el.textContent = `${prefix}${format(obj.val)}${suffix}`;
    };
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        render();
        gsap.to(obj, { val: end, duration, ease: "power2.out", onUpdate: render });
      },
    });

    return () => trigger.kill();
  }, [end, suffix, prefix, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {format(end)}
      {suffix}
    </span>
  );
}
