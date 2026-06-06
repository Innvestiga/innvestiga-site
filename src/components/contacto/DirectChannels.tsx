"use client";

import { CONTACT } from "@/lib/constants";

const channels = [
  { label: "Teléfono", value: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/\./g, "")}`, icon: "phone" },
  { label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}`, icon: "mail" },
  { label: "LinkedIn", value: "Innvestiga", href: CONTACT.linkedin, icon: "linkedin" },
  { label: "Portal", value: "esi3.innvestiga.com", href: CONTACT.portal, icon: "globe" },
];

const iconPaths: Record<string, string> = {
  phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
  mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
  linkedin: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z",
  globe: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
};

export default function DirectChannels() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {channels.map((ch) => (
        <a
          key={ch.label}
          href={ch.href}
          target={ch.href.startsWith("http") ? "_blank" : undefined}
          rel={ch.href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="group relative p-6 rounded-2xl overflow-hidden bg-surface border border-border hover:border-primary/30 shadow-[0_1px_3px_rgba(15,23,42,0.06),0_8px_24px_rgba(15,23,42,0.04)] transition-all duration-500"
        >
          {/* Hover glow */}
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/[0.03] transition-colors duration-500" />
          <div className="relative z-10">
            <svg
              className="w-5 h-5 text-primary/60 group-hover:text-primary transition-colors duration-300 mb-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={iconPaths[ch.icon]} />
            </svg>
            <span className="text-[8px] font-bold tracking-[0.3em] uppercase text-muted block mb-2">
              {ch.label}
            </span>
            <span className="text-[12px] font-bold text-body group-hover:text-ink transition-colors duration-300 break-words block">
              {ch.value}
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
