"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

interface ImageRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "left" | "right" | "up";
}

export default function ImageReveal({
  children,
  className = "",
  direction = "left",
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const clipPaths: Record<string, { from: string; to: string }> = {
      left: {
        from: "inset(0 100% 0 0)",
        to: "inset(0 0% 0 0)",
      },
      right: {
        from: "inset(0 0 0 100%)",
        to: "inset(0 0 0 0%)",
      },
      up: {
        from: "inset(100% 0 0 0)",
        to: "inset(0% 0 0 0)",
      },
    };

    const clip = clipPaths[direction];

    const anim = gsap.fromTo(
      ref.current,
      { clipPath: clip.from },
      {
        clipPath: clip.to,
        duration: 1.2,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
        },
      }
    );

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [direction]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
