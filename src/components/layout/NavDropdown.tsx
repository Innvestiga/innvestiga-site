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
        <ul className="min-w-[260px] rounded-2xl bg-surface border border-border shadow-[0_12px_32px_rgba(15,23,42,0.14)] p-2">
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
      </div>
    </div>
  );
}
