"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Only show on devices with fine pointer
    const hasHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    if (!hasHover) return;

    dot.style.display = "block";
    ring.style.display = "block";

    const moveCursor = (e: MouseEvent) => {
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseEnterInteractive = () => {
      gsap.to(ring, {
        width: 60,
        height: 60,
        borderColor: "rgba(30,64,175,0.6)",
        duration: 0.3,
      });
      gsap.to(dot, { scale: 0.5, duration: 0.3 });
    };

    const handleMouseLeaveInteractive = () => {
      gsap.to(ring, {
        width: 40,
        height: 40,
        borderColor: "rgba(30,64,175,1)",
        duration: 0.3,
      });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    document.addEventListener("mousemove", moveCursor);

    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select'
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnterInteractive);
      el.addEventListener("mouseleave", handleMouseLeaveInteractive);
    });

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnterInteractive);
        el.removeEventListener("mouseleave", handleMouseLeaveInteractive);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[100002] -translate-x-1/2 -translate-y-1/2 hidden"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border border-primary rounded-full pointer-events-none z-[100001] -translate-x-1/2 -translate-y-1/2 hidden"
      />
    </>
  );
}
