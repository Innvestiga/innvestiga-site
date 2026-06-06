"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export function useGSAP<T extends HTMLElement = HTMLDivElement>(
  callback: (ctx: gsap.Context) => void,
  deps: React.DependencyList = []
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      callback(ctx);
    }, ref);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
