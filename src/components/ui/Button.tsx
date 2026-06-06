"use client";

import Link from "next/link";

type ButtonVariant = "gold" | "outline" | "ghost" | "white";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  href?: string;
  onClick?: () => void;
  className?: string;
  external?: boolean;
  type?: "button" | "submit";
}

// NOTE: variant names kept for back-compat with existing call sites.
// "gold" is now the primary blue action.
const variantStyles: Record<ButtonVariant, string> = {
  gold: [
    "bg-primary text-white font-[800]",
    "shadow-[0_4px_14px_rgba(30,64,175,0.25)]",
    "hover:bg-primary-hover hover:shadow-[0_6px_24px_rgba(37,99,235,0.35)] hover:scale-[1.03]",
    "active:scale-[0.98]",
  ].join(" "),
  outline: [
    "border border-primary/40 text-primary",
    "hover:bg-primary/10 hover:border-primary",
    "active:scale-[0.98]",
  ].join(" "),
  ghost: [
    "text-muted hover:text-primary",
  ].join(" "),
  white: [
    "bg-white text-primary font-[800] border border-border",
    "shadow-[0_4px_24px_rgba(15,23,42,0.10)]",
    "hover:border-primary/40 hover:shadow-[0_6px_28px_rgba(30,64,175,0.18)] hover:scale-[1.03]",
    "active:scale-[0.98]",
  ].join(" "),
};

export default function Button({
  children,
  variant = "gold",
  href,
  onClick,
  className = "",
  external = false,
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-300 ease-out whitespace-nowrap select-none";

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={combinedStyles}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedStyles}>
      {children}
    </button>
  );
}
