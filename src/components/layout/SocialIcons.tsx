import { CONTACT, SOCIAL_PROFILES, whatsappHref, type SocialIcon } from "@/lib/constants";

// Stroke glyphs that match the site's line icons (24x24).
const ICONS: Record<SocialIcon | "whatsapp", React.ReactNode> = {
  whatsapp: <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21 M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />,
  linkedin: <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />,
};

export default function SocialIcons({ className = "" }: { className?: string }) {
  const wa = whatsappHref();
  const links = [
    ...SOCIAL_PROFILES.map((p) => ({ ...p, label: `${p.name} de Innvestiga` })),
    ...(wa ? [{ name: "WhatsApp", url: wa, icon: "whatsapp" as const, label: `WhatsApp ${CONTACT.whatsapp}` }] : []),
  ];
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {links.map((p) => (
        <li key={p.icon}>
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={p.label}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-body hover:text-primary hover:border-primary/40 transition-colors duration-300"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {ICONS[p.icon]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
