import Link from "next/link";
import type { NavLink } from "@/types";

const topLinkClass =
  "relative text-body hover:text-ink text-[10px] font-bold uppercase tracking-[0.2em] py-2 transition-colors duration-300";

// Pure CSS dropdown (hover and focus-within): works without JS and keeps
// every child link in the server HTML for crawlers.
export default function NavDropdown({ link }: { link: NavLink }) {
  return (
    <div className="group relative">
      <Link href={link.href} className={topLinkClass} aria-haspopup="true">
        <span className="text-primary/40 mr-1">{link.number}</span>
        {link.label}
        <span
          aria-hidden="true"
          className="ml-1 inline-block transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180"
        >
          ▾
        </span>
      </Link>
      <div className="invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-200 absolute left-1/2 -translate-x-1/2 top-full pt-3 z-[1001]">
        <div className="flex rounded-2xl bg-surface border border-border shadow-[0_12px_32px_rgba(15,23,42,0.14)] p-2 gap-2">
          <ul className="min-w-[260px]">
            {link.children?.map((child) => (
              <li key={child.href}>
                <Link
                  href={child.href}
                  className="block rounded-xl px-4 py-2.5 hover:bg-surface-alt focus-visible:bg-surface-alt transition-colors text-[13px] text-ink font-medium"
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
          {link.featured && (
            <Link
              href={link.featured.href}
              className="w-[240px] flex flex-col justify-end rounded-xl bg-primary/[0.06] hover:bg-primary/[0.1] focus-visible:bg-primary/[0.1] border border-primary/15 p-5 transition-colors"
            >
              <span className="text-[14px] font-bold text-primary leading-snug">{link.featured.title}</span>
              <span className="mt-2 text-[12.5px] text-body leading-relaxed">{link.featured.subtitle}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
