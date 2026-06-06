"use client";

import Link from "next/link";
import { NAV_LINKS, CONTACT, SITE_NAME } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative bg-surface-alt text-body z-10">
      {/* Top accent rule */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 py-24">
        {/* Top row: giant brand + tagline */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
          <div>
            <span className="font-heading text-3xl md:text-4xl font-[800] tracking-tighter block text-ink">
              {SITE_NAME}
            </span>
            <span className="text-primary/60 text-[9px] tracking-[0.3em] font-bold uppercase mt-1 block">
              Inteligencia de Mercado Premium
            </span>
          </div>

          <div className="flex items-center gap-4 text-[9px] tracking-[0.3em] uppercase text-muted font-bold">
            <span>Guatemala</span>
            <div className="w-1 h-1 rounded-full bg-primary/40" />
            <span>El Salvador</span>
            <div className="w-1 h-1 rounded-full bg-primary/40" />
            <span>Honduras</span>
            <div className="w-1 h-1 rounded-full bg-primary/40" />
            <span>Costa Rica</span>
          </div>
        </div>

        {/* Link grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-20">
          <div>
            <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-muted block mb-5">
              Navegación
            </span>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[12px] text-body hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-muted block mb-5">
              Servicios
            </span>
            <ul className="space-y-3">
              {[
                { href: "/servicios/auditorias", label: "Auditorías" },
                { href: "/servicios/canales-digitales", label: "Canales Digitales" },
                { href: "/servicios/consumer-insights", label: "Consumer Insights" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[12px] text-body hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-muted block mb-5">
              Recursos
            </span>
            <ul className="space-y-3">
              {[
                { href: "/casos-de-exito", label: "Casos de Éxito" },
                { href: "/blog", label: "Blog" },
                { href: CONTACT.portal, label: "Portal ESI3", external: true },
              ].map((link) => (
                <li key={link.href}>
                  {"external" in link ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[12px] text-body hover:text-primary transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-[12px] text-body hover:text-primary transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-muted block mb-5">
              Contacto
            </span>
            <ul className="space-y-3">
              <li className="text-[12px] text-body">{CONTACT.phone}</li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-[12px] text-body hover:text-primary transition-colors duration-300"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li className="text-[12px] text-body">
                Guatemala City | San Salvador
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-border">
          <p className="text-[9px] text-muted tracking-[0.2em] uppercase">
            &copy; {new Date().getFullYear()} {SITE_NAME}. Todos los derechos reservados.
          </p>
          <p className="text-[9px] text-muted tracking-[0.2em] uppercase">
            Inteligencia de Mercado Premium — Centroamérica & México
          </p>
        </div>
      </div>
    </footer>
  );
}
