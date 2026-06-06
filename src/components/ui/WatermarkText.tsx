"use client";

interface WatermarkTextProps {
  text: string;
  className?: string;
}

export default function WatermarkText({
  text,
  className = "",
}: WatermarkTextProps) {
  return (
    <div
      className={`absolute whitespace-nowrap font-heading text-[18vw] font-[800] leading-none pointer-events-none select-none z-0 tracking-tighter ${className}`}
      style={{
        WebkitTextStroke: "1px rgba(15,23,42,0.04)",
        WebkitTextFillColor: "transparent",
      }}
    >
      {text}
    </div>
  );
}
