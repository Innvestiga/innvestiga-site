import Link from "next/link";
import EmailOff from "@/components/seo/EmailOff";
import { CONTACT, NAV_LINKS, OFFICES, SITE_LEGAL_NAME, SITE_TAGLINE } from "@/lib/constants";
import { SCENARIOS, scenarioHref } from "@/data/scenarios";
import { COVERAGE, coverageHref } from "@/data/coverage";
import SocialIcons from "./SocialIcons";

const headingClass = "text-[10px] font-bold tracking-[0.3em] uppercase text-muted block mb-5";
const linkClass = "text-[12px] text-body hover:text-primary transition-colors duration-300";

function Column({ title, links }: { title: string; links: { href: string; label: string; external?: boolean }[] }) {
  return (
    <div>
      <span className={headingClass}>{title}</span>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            {l.external ? (
              <a href={l.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {l.label}
              </a>
            ) : (
              <Link href={l.href} className={linkClass}>
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

// The Blog link returns to "Recursos" once its first three real articles
// are published (spec section A).
export default function Footer() {
  return (
    <footer className="relative bg-[#e3e8f0] border-t border-[#d5dce6] text-body z-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 py-20">
        <div className="mb-16">
          <span className="font-heading text-3xl md:text-4xl font-bold tracking-tighter block text-ink">
            {SITE_LEGAL_NAME}
          </span>
          <span className="text-primary/70 text-[10px] tracking-[0.3em] font-bold uppercase mt-2 block">
            {SITE_TAGLINE}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-16">
          <Column title="Navegación" links={NAV_LINKS.map((l) => ({ href: l.href, label: l.label }))} />
          <Column
            title="Servicios"
            links={[
              ...SCENARIOS.map((s) => ({ href: scenarioHref(s), label: s.label })),
              { href: "/servicios/canales-digitales", label: "Canales digitales" },
            ]}
          />
          <Column title="Cobertura" links={COVERAGE.map((c) => ({ href: coverageHref(c), label: c.name }))} />
          <Column
            title="Recursos"
            links={[
              { href: "/preguntas-frecuentes", label: "Preguntas frecuentes" },
              { href: CONTACT.portal, label: "Acceso clientes", external: true },
            ]}
          />
          <div className="col-span-2 md:col-span-1">
            <span className={headingClass}>Contacto</span>
            <ul className="space-y-3">
              <li>
                <a href={CONTACT.phoneHref} className={linkClass}>
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <EmailOff>
                  <a href={`mailto:${CONTACT.email}`} className={linkClass}>
                    {CONTACT.email}
                  </a>
                </EmailOff>
              </li>
              <li className="text-[12px] text-body">{OFFICES.map((o) => o.city).join(" | ")}</li>
            </ul>
            <SocialIcons className="mt-5" />
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <p className="text-[10px] text-muted tracking-[0.15em] uppercase leading-relaxed">
            © {new Date().getFullYear()} {SITE_LEGAL_NAME}. Todos los derechos reservados. Auditorías CX con cliente oculto
            en Mesoamérica y el Caribe.
          </p>
        </div>
      </div>
    </footer>
  );
}
