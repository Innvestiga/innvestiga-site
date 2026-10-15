import { SOCIAL_PROFILES, type SocialIcon } from "@/lib/constants";

// Stroke glyphs that match the site's line icons (24x24).
const ICONS: Record<SocialIcon, React.ReactNode> = {
  linkedin: <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />,
  youtube: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="m10 9 5 3-5 3z" />
    </>
  ),
  tiktok: <path d="M9 12a4 4 0 1 0 4 4V3c.6 2.8 2.6 4.8 5.5 5" />,
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" />
    </>
  ),
  facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  x: <path d="M4 4l11.7 16H20L8.3 4H4z M4 20l6.8-7.4 M20 4l-6.6 7.2" />,
};

export default function SocialIcons({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {SOCIAL_PROFILES.map((p) => (
        <li key={p.icon}>
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${p.name} de Innvestiga`}
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
