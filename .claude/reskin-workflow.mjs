export const meta = {
  name: 'innvestiga-reskin',
  description: 'Reposition Innvestiga site: light/blue re-skin + new Hero copy, ESI section, pilot form, map fixes',
  phases: [
    { title: 'Transform', detail: '9 parallel agents: content changes + light/blue re-skin across disjoint file buckets' },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared COLOR CONTRACT — every agent follows this exactly.
// Foundation files are ALREADY done; agents must NOT edit them.
// ─────────────────────────────────────────────────────────────────────────────
const CONTRACT = `
# Innvestiga LIGHT THEME re-skin contract (blue / slate)
The site was dark (#0a1628 midnight) + gold (#c9a84c). We are converting it to a LIGHT,
corporate blue theme. Design tokens are ALREADY defined in src/app/globals.css. Use these
Tailwind classes:
  Surfaces: bg-bg (#f8fafc page) · bg-surface (#fff cards) · bg-surface-alt (#f1f5f9 alt sections) · border-border (#e2e8f0)
  Text:     text-ink (#1f2937 headings/strong) · text-body (#4b5563 secondary) · text-muted (#6b7280 faint)
  Brand:    bg-primary / text-primary (#1e40af) · hover bg-primary-hover / text-primary-hover (#2563eb) · accent #2563eb

IMPORTANT — legacy tokens are REMAPPED in globals.css: text-gold / bg-gold / from-gold / border-gold
now render BLUE automatically. So gold-named classes are SAFE (already blue). You may leave them or
rename to *primary for clarity — your choice. The REAL work is the dark-on-dark classes below.

RULES (apply with judgment, preserve everything else):
1. text-white / text-white/NN on a light surface → text-ink (strong), text-body (secondary), text-muted (faint).
   KEEP text-white ONLY when the element sits on a blue/dark fill (inside a primary button, or a deliberately
   colored band).
2. bg-midnight / bg-midnight-light / bg-midnight-deep used as section/page backgrounds → bg-bg / bg-surface /
   bg-surface-alt. (An un-converted bg-midnight renders DARK = a visible bug. Hunt them all.)
3. Literal hairlines/borders rgba(255,255,255,0.0x) → border-border or rgba(15,23,42,0.06)–rgba(15,23,42,0.10).
4. Literal gold rgba(201,168,76,a) → blue rgba(30,64,175,a) or rgba(37,99,235,a).
5. Dark glassmorphism → clean light card: bg-surface + border border-border +
   shadow-[0_1px_3px_rgba(15,23,42,0.06),0_8px_24px_rgba(15,23,42,0.04)].
6. Dark radial glows / gradients (from-midnight, dark rgba glows) → subtle blue/slate on light; lighten or remove
   so nothing looks like a dark splotch on a near-white page.
7. PRESERVE all layout, spacing, font sizes, GSAP/framer-motion animations, props, exports, file names. ONLY
   change colors/surfaces (except where this brief explicitly asks for content changes).
8. Headings remain uppercase via global CSS (don't fight it) UNLESS the brief says a specific heading should read
   as a normal sentence — then add 'normal-case' on that element.

DO NOT EDIT (already finished — leave untouched): src/app/globals.css, src/components/ui/Button.tsx,
src/components/ui/GlassCard.tsx, src/app/layout.tsx, src/data/countries.ts, src/lib/constants.ts.

Goal: each file must look intentional on a near-white page — no white-on-white text, no stray dark bands,
good contrast (ink text on light surfaces, white text on blue buttons).
`

const RESULT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    bucket: { type: 'string' },
    filesChanged: { type: 'array', items: { type: 'string' } },
    summary: { type: 'string' },
    issues: { type: 'array', items: { type: 'string' } },
  },
  required: ['bucket', 'filesChanged', 'summary', 'issues'],
}

const ROOT = 'C:/Users/takam/WebstormProjects/InnvestigaMainSite'

// Each bucket = disjoint set of files + (optional) content instructions.
const BUCKETS = [
  {
    label: 'hero',
    extra: `
CONTENT CHANGES for src/components/home/HeroSection.tsx (rewrite copy + light redesign):
- This is a repositioning toward "Experiencia del Cliente / Prueba Piloto / plataforma ESI".
- The current h1 is giant stacked uppercase words. REPLACE it with a real question headline that reads as a
  sentence (add 'normal-case'):  "¿Sabes realmente cómo es tu Experiencia del Cliente?"
  Use a strong but sentence-appropriate size, e.g. text-[clamp(2.2rem,5vw,4.25rem)] font-[800] leading-[1.05]
  text-ink, with the phrase "Experiencia del Cliente" in text-primary (or .text-gold-gradient, now blue).
- Directly under the headline add a lead paragraph (text-body): "Diseñas estándares, capacitas a tu equipo y
  defines procesos claros… pero ¿realmente sabes lo que está pasando en cada una de tus sucursales?"
- Then a second supporting line (text-body): "Te ayudamos a cerrar esa brecha con auditorías presenciales y
  nuestra plataforma ESI." (you may emphasize "ESI" in text-primary).
- Add a small countries line (text-muted, small, can wrap): import { PILOT_COUNTRIES } from "@/lib/constants"
  and render: "Prueba piloto disponible en " + PILOT_COUNTRIES + ".".
- Buttons: replace the two buttons with:
    primary:   <Button href="/contacto" variant="gold">Solicitar Prueba Piloto</Button>   (variant "gold" is now blue)
    secondary: <Button href={CONTACT.portal} external variant="outline">Ingresar a ESI</Button>
  import { CONTACT } from "@/lib/constants".
- Keep the right-side stats GlassCard (reach numbers) but reskin to light.
- Reskin the whole section from dark to light per the contract: the section bg (bg-midnight) → bg-bg with the
  existing gradient-mesh kept; the giant "INNVESTIGA" watermark text → very-low-opacity ink (e.g. text-ink/[0.03]);
  lighten the radial glows to subtle blue; keep the HeroMap on the right.
- Keep all framer-motion entrance animations and the GSAP parallax.`,
    files: ['src/components/home/HeroSection.tsx'],
  },

  {
    label: 'esi-section',
    extra: `
NET-NEW COMPONENT + page wiring.
1. CREATE src/components/home/ESISection.tsx — a new home section "Nuestra Plataforma ESI", light theme,
   matching the visual language of the other home sections (you may reuse src/components/ui/SectionHeading.tsx
   and src/components/ui/Button.tsx; import { ESI_BENEFITS, CONTACT } from "@/lib/constants"). It must contain:
   - Section heading: "Nuestra Plataforma ESI"
   - Intro paragraph 1 (text-body): "Desarrollada desde el 2013 y actualmente en su tercera generación, ESI
     (Exploración Sistémica) es el corazón tecnológico de nuestro servicio."
   - Intro paragraph 2 (text-body): "Publicamos los resultados de cada auditoría en máximo 3 días y te entregamos
     una plataforma completa para que puedas gestionar tu Experiencia del Cliente de forma inteligente."
   - A responsive grid (2 cols on md+) of the 8 ESI_BENEFITS, each as a light card (bg-surface, border-border,
     soft shadow) with a small blue check/dot icon + the benefit text in text-body / text-ink.
   - A CTA button: <Button href={CONTACT.portal} external variant="gold">Quiero conocer ESI</Button>
   - 'use client' if you use any client hooks; otherwise it can be a server component. Keep it tasteful, animated
     entrance optional (framer-motion ok).
2. EDIT src/app/page.tsx — import ESISection and insert it right AFTER <HeroSection /> (order: Hero, ESISection,
   VisionReveal, ServicesCarousel, CoverageSplit, CTASection). Change nothing else in page.tsx.`,
    files: ['src/components/home/ESISection.tsx (new)', 'src/app/page.tsx'],
  },

  {
    label: 'maps',
    extra: `
MAP FIXES + recolor. Two files share the same SVG path data (viewBox "0 0 480 260"):
src/components/home/HeroMap.tsx and src/components/cobertura/InteractiveMap.tsx.

A) REPÚBLICA DOMINICANA is stranded in the far-right corner (x≈400–468) with a huge empty ocean gap, so it
   renders tiny. Fix it as an INSET: move the RD island (and the neighbouring "haiti" context shape, which is the
   other half of Hispaniola) LEFT/UP into the empty gap so it appears near Central America. Implementation:
   - Define a single shared transform, e.g. dx = -150, dy = +70, applied consistently. The cleanest approach is to
     wrap RD's rendered elements (fill, outline, city marker, label) AND the haiti context shape in an SVG group:
     <g transform="translate(-150,70)"> ... </g> so they move together with one transform.
   - For the connection arc in HeroMap (drawn separately from HQ to RD's city), recompute the RD endpoint to the
     TRANSFORMED coordinates: newCity = { x: 432 + (-150), y: 40 + 70 } = { x: 282, y: 110 }. Make the arc and the
     'connections' entry for RD point to that transformed point so the line still connects.
   - Draw a thin inset frame around the moved island: a rounded rect in stroke rgba(30,64,175,0.25) with a tiny
     label "INSET · REP. DOMINICANA" (fontSize ~4, fill muted) so it's clearly a callout, not a geographic error.
   - In InteractiveMap, move RD's interactive <path> + its "DO" label by the same transform (wrap in the same <g>).
B) PANAMÁ must become a REAL country (it was only a background context shape). It now exists in
   src/data/countries.ts with id "panama".
   - In InteractiveMap: move the panama path from contextPaths into countryPaths (so it becomes interactive/
     clickable like the others), and add a label entry { id:"panama", x:248, y:236, label:"PA" } to the labels array.
   - In HeroMap: add panama to the interactive 'mapData' array (label:"PANAMÁ",
     city:{ x:248, y:236, name:"Ciudad de Panamá" }, fill:"rgba(30,64,175,0.07)") and add a connection from HQ to
     { x:248, y:236 }. Remove panama from the 'contextShapes' array (it is now a primary country).
C) RECOLOR both maps to the blue light theme per the contract: country fills rgba(30,64,175,0.07)–(0.12),
   outlines/strokes rgba(30,64,175,0.40)–(0.50) (must be visible on a LIGHT background), city dots & HQ glow blue
   (#1e40af / rgba(30,64,175,*)), grid dots & lat/long lines subtle blue, label text fill from white → text-ink
   tone (e.g. rgba(31,41,55,0.7)). Replace every rgba(201,168,76,*) and rgba(255,255,255,*) accordingly. Keep all
   GSAP draw-in animations intact.
Verify both files still compile (valid JSX/SVG) and the country count reads as 8.`,
    files: ['src/components/home/HeroMap.tsx', 'src/components/cobertura/InteractiveMap.tsx'],
  },

  {
    label: 'pilot-form',
    extra: `
REBUILD the contact form into the "Prueba Piloto" request form + reskin the contacto page & its sub-components.

1. src/components/contacto/ContactForm.tsx — rebuild as the pilot-request form with these fields (keep using the
   existing sendContactEmail(form) from "@/lib/emailjs", which calls emailjs.sendForm and submits all named inputs):
     - company_name   "Nombre de la empresa"            (text, required)
     - user_name      "Nombre completo del contacto"    (text, required)
     - position       "Cargo"                           (text)
     - user_email     "Correo electrónico"              (email, required)
     - phone          "Teléfono de contacto"            (tel, required)
     - branches       "Número aproximado de sucursales" (number/text)
     - countries      "Países donde operas"             (text)
     - pos1           "Punto de venta 1 (dirección exacta)" (text, required)
     - pos2           "Punto de venta 2 (dirección exacta)" (text)
     - pos3           "Punto de venta 3 (dirección exacta)" (text)
     - protocol       "¿Tienes algún protocolo o estándar de servicio que podamos tomar como base?" (textarea)
   CRITICAL — EmailJS template independence: before sending, compose ALL field values into ONE readable string and
   put it into a hidden <input name="message"> (and also keep a hidden <input name="title" value="Solicitud de
   Prueba Piloto">). On submit: read the form values, set the hidden message input's value to a multi-line summary
   like "Empresa: ...\\nContacto: ...\\nCargo: ...\\n..." for every field, THEN call sendContactEmail(formRef.current).
   This guarantees the email contains everything even if the EmailJS template only references {{message}}.
   - Submit button label: "Enviar Solicitud" (sending → "Enviando...", sent → "Enviado", error → "Error — Reintentar").
   - On success show the confirmation: "Gracias por tu solicitud. Muy pronto nos pondremos en contacto contigo para
     coordinar la prueba piloto."
   - Light theme inputs: transparent/surface bg, border-b border-border, text-ink, placeholder text-muted/40,
     focus:border-primary. Keep it on-brand and tidy; group fields in a responsive 2-col grid where sensible.
2. src/app/contacto/page.tsx — update the page heading to "Solicita tu Prueba Piloto" and intro to
   "Queremos conocer mejor tu operación para diseñarte una prueba piloto a la medida." Add id="prueba-piloto" to the
   form section anchor. Reskin to light.
3. src/components/contacto/DirectChannels.tsx and src/components/contacto/OfficeLocations.tsx — reskin to light only.`,
    files: [
      'src/components/contacto/ContactForm.tsx',
      'src/app/contacto/page.tsx',
      'src/components/contacto/DirectChannels.tsx',
      'src/components/contacto/OfficeLocations.tsx',
    ],
  },

  {
    label: 'home-rest',
    extra: `
Reskin to light + one content tweak.
- src/components/home/VisionReveal.tsx — reskin only.
- src/components/home/ServicesCarousel.tsx — reskin only.
- src/components/home/CoverageSplit.tsx — reskin only (it references the 8 countries / coverage; just colors).
- src/components/home/CTASection.tsx — reskin AND make it the pilot CTA: headline/copy should invite the pilot,
  e.g. heading "Solicita tu Prueba Piloto" with a primary button <Button href="/contacto" variant="gold">Solicitar
  Prueba Piloto</Button> (and you may keep a secondary "Ingresar a ESI" → CONTACT.portal external if one exists).
  Import CONTACT from "@/lib/constants" only if you use it. If this section is a dark band, convert to a light or a
  blue-accent band consistent with the contract (a soft blue surface is fine; if you keep a colored band use
  bg-primary with text-white inside).`,
    files: [
      'src/components/home/VisionReveal.tsx',
      'src/components/home/ServicesCarousel.tsx',
      'src/components/home/CoverageSplit.tsx',
      'src/components/home/CTASection.tsx',
    ],
  },

  {
    label: 'layout-ui',
    extra: `
Reskin to light only (no content changes). Navbar sat over a dark hero — now it's over a light page, so nav text
must become text-ink/text-body with a light translucent backdrop when scrolled; logo/active states use text-primary.
Footer is a big dark block (22 color refs) — convert it to a light footer (bg-surface-alt, text-body, borders
border-border, links hover text-primary). MobileMenu likewise light. CustomCursor: gold → primary (#1e40af).
Files:
- src/components/layout/Navbar.tsx
- src/components/layout/Footer.tsx
- src/components/layout/MobileMenu.tsx
- src/components/layout/PageTransition.tsx
- src/components/layout/SmoothScrollProvider.tsx
- src/components/ui/CustomCursor.tsx
- src/components/ui/TextReveal.tsx
- src/components/ui/WatermarkText.tsx
- src/components/ui/SectionHeading.tsx
- src/components/ui/ImageReveal.tsx
- src/components/ui/MagneticButton.tsx
- src/components/ui/AnimatedCounter.tsx
(Several of these may have little/no color; touch only what needs it. Do NOT touch Button.tsx or GlassCard.tsx.)`,
    files: ['src/components/layout/*', 'src/components/ui/* (except Button, GlassCard)'],
  },

  {
    label: 'servicios',
    extra: `
Reskin to light only. The services pages were dark with gold accents; make them light/blue per the contract,
preserving all layout and animation. Files:
- src/app/servicios/page.tsx
- src/app/servicios/auditorias/page.tsx
- src/app/servicios/canales-digitales/page.tsx
- src/app/servicios/consumer-insights/page.tsx
- src/components/servicios/ServiceCard.tsx
- src/components/servicios/ServiceHero.tsx
- src/components/servicios/ServiceProcess.tsx`,
    files: ['src/app/servicios/**', 'src/components/servicios/*'],
  },

  {
    label: 'cobertura-casos',
    extra: `
Reskin to light only (do NOT touch InteractiveMap.tsx — another agent owns it). Files:
- src/app/cobertura/page.tsx
- src/components/cobertura/CountryDetail.tsx
- src/components/cobertura/StatsPanel.tsx
- src/app/casos-de-exito/page.tsx
- src/components/casos/CaseGrid.tsx
- src/components/casos/CaseCard.tsx
- src/components/casos/IndustryFilter.tsx`,
    files: ['src/app/cobertura/page.tsx', 'src/components/cobertura/CountryDetail.tsx', 'src/components/cobertura/StatsPanel.tsx', 'src/app/casos-de-exito/page.tsx', 'src/components/casos/*'],
  },

  {
    label: 'blog-misc',
    extra: `
Reskin to light only. Files:
- src/app/blog/page.tsx
- src/app/blog/[slug]/page.tsx
- src/components/blog/BlogGrid.tsx
- src/components/blog/BlogCard.tsx
- src/components/blog/BlogPost.tsx
- src/app/not-found.tsx`,
    files: ['src/app/blog/**', 'src/components/blog/*', 'src/app/not-found.tsx'],
  },
]

phase('Transform')
log(`Re-skinning Innvestiga to light/blue + content changes across ${BUCKETS.length} buckets`)

const results = await parallel(
  BUCKETS.map((b) => () =>
    agent(
      `You are editing the Next.js 16 project at ${ROOT}. Work ONLY on the files for the "${b.label}" bucket.\n\n` +
        CONTRACT +
        `\n\n# YOUR BUCKET: ${b.label}\nFiles: ${b.files.join(', ')}\n` +
        b.extra +
        `\n\nRead each file first, apply the changes, and write them back with the Edit/Write tools. Then return your result.`,
      {
        label: `reskin:${b.label}`,
        phase: 'Transform',
        agentType: 'general-purpose',
        schema: RESULT_SCHEMA,
      }
    )
  )
)

return results.filter(Boolean)
