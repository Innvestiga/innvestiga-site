"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { NAV_LINKS, CONTACT } from "@/lib/constants";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 50);
      if (currentY > lastScrollY.current && currentY > 120) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`
          fixed top-5 left-1/2 -translate-x-1/2 w-[92%] max-w-[1200px] z-[1000]
          rounded-full px-5 md:px-8 py-3
          flex items-center justify-between
          transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${scrolled
            ? "bg-surface/80 backdrop-blur-2xl border border-border shadow-[0_8px_24px_rgba(15,23,42,0.08)]"
            : "bg-transparent border border-transparent"
          }
          ${hidden && !menuOpen ? "-translate-y-[150%] opacity-0" : ""}
        `}
      >
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 group">
          <span className="text-lg md:text-xl font-heading font-[800] tracking-tighter text-primary leading-none">
            INNVESTIGA
            <span className="text-primary/60 text-[8px] block font-body tracking-[0.25em] font-light mt-0.5 group-hover:text-primary transition-colors duration-300">
              MARKET SPECIALIST
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-body hover:text-ink text-[10px] font-bold uppercase tracking-[0.2em] py-2 transition-colors duration-300"
            >
              <span className="text-primary/40 mr-1 group-hover:text-primary/70 transition-colors duration-300">
                {link.number}
              </span>
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-primary/60 transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
          <a
            href={CONTACT.portal}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-white px-5 py-2.5 rounded-full text-[9px] font-[800] uppercase tracking-widest hover:bg-primary-hover transition-all duration-300 shadow-[0_2px_12px_rgba(30,64,175,0.25)]"
          >
            Acceso
          </a>
        </div>

        {/* Hamburger */}
        <button
          type="button"
          className="lg:hidden flex flex-col gap-1.5 p-2 relative z-[1001]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-px bg-ink transition-all duration-300 origin-center ${
              menuOpen ? "rotate-45 translate-y-[3.5px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-ink transition-all duration-300 origin-center ${
              menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
            }`}
          />
        </button>
      </nav>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
