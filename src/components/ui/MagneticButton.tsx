"use client";

import { useMagneticEffect } from "@/hooks/useMagneticEffect";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useMagneticEffect<HTMLDivElement>(strength);

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      <button
        type="button"
        onClick={onClick}
        className="relative"
      >
        {children}
      </button>
    </div>
  );
}
