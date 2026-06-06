"use client";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  gold?: boolean;
}

// Light surface card. `gold` now denotes a highlighted (primary-accented) card.
export default function GlassCard({
  children,
  className = "",
  gold = false,
}: GlassCardProps) {
  return (
    <div
      className={`
        relative rounded-2xl p-8 overflow-hidden
        bg-surface
        border border-border
        ${gold
          ? "border-primary/20 shadow-[0_1px_3px_rgba(15,23,42,0.06),0_12px_40px_rgba(30,64,175,0.08)]"
          : "shadow-[0_1px_3px_rgba(15,23,42,0.06),0_8px_24px_rgba(15,23,42,0.04)]"
        }
        ${className}
      `}
    >
      {/* Subtle top sheen */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
      {gold && (
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/[0.05] rounded-full blur-3xl pointer-events-none" />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
