# Innvestiga Website Changes for IT (SEO + AI Search) — source requirements

> Verbatim text extracted from the client document `Innvestiga Website Changes for IT (SEO + AI Search).docx` (received 2026-10-15). Instructions are in English; site copy is in Spanish and must be pasted as-is. Tables are flattened one cell per line.

Innvestiga: Website Changes for IT (SEO + AI Search)

Single launch: everything live together on or before Friday, October 30, 2026. Based on the current page, main.innvestiga.com. Replaces any earlier version.

All website text is in Spanish and ready to paste. Instructions are in English. Items in [brackets] will be sent separately.

Goal and delivery plan

Our goal is for Google and AI assistants (ChatGPT, Gemini, Perplexity, etc.) to find and cite Innvestiga when CX managers of large companies in Mesoamérica and the Caribbean search for CX audits, cliente oculto or mystery shopper services, and for visitors to request a pilot or book a demo.

One launch of everything together, on or before Friday, October 30.

Thursday, October 22: first staging link with the home page, /contacto and /demo, for review.

Wednesday, October 28: full staging link with all pages.

Friday, October 30: everything goes live at once.

Please confirm these dates, or tell us which items put them at risk.

A. Page inventory (what exists today and what to do)

URL

Today

Action

/

Exists

Rewrite (section D)

/nosotros

Exists

Rewrite (section F)

/servicios

Exists

Rewrite (section E)

/servicios/auditorias

Exists

Rewrite (section E)

/servicios/canales-digitales

Exists

Edit (section E)

/servicios/consumer-insights

Exists

Keep the URL, retitle and demote (section E)

/cobertura

Exists

Rewrite (section F)

/contacto

Exists

Convert into the pilot request page (section C)

/casos-de-exito

Exists, linked in the footer

Unpublish, 301 redirect to /servicios/auditorias, remove from the footer

/blog

Exists, linked in the footer

If it has no articles: noindex and remove the footer link until the first 3 are published

/servicios/auditorias/{6 scenarios}

Does not exist

New (section E)

/cobertura/{8 countries}

Does not exist

New (section F)

/demo, /gracias, /preguntas-frecuentes

Do not exist

New (sections C and G)

/en/

Does not exist

New, home page only (section F)

esi3.innvestiga.com

Client login

Keep exactly as is, set to noindex

B. Global rules

Client access (upper right): keep the "Acceso" item in the upper right corner of every page, exactly as it works today (clients enter their credentials there). Do not move it or change how it works. On mobile, show it as a button, "Acceso clientes". Remove the other ESI login buttons in the page body (the home page has "Ingresar a ESI" in the hero and in the final call to action, and "Quiero conocer ESI" in the ESI section). In the footer, rename "Portal ESI3" to "Acceso clientes".

ESI protection: remove the ESI section that lists modules (dashboard, Geo-Métrica, tickets, rankings, Excel export), and the expansion "Exploración Sistémica" and "3ª generación". ESI is described only through benefits (home page, section D).

Brand line: replace "Inteligencia de Mercado Premium" everywhere (page title, meta, header, footer, copyright line) with "Auditorías CX con Cliente Oculto". Use the full name "Innvestiga Market Specialists" (the logo currently reads "Market Specialist", singular). The footer line "Centroamérica & México" becomes "Mesoamérica y el Caribe".

Search visibility: the text of every page must be in the HTML, including the final value of the animated counters (today they read "0" in the HTML). Set esi3.innvestiga.com to noindex. Verify the domain in Google Search Console and Bing Webmaster Tools and submit sitemap.xml.

robots.txt: allow public pages and the AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Bingbot).

Per page: one H1, a unique title (about 60 characters) and meta description (about 155), canonical, Open Graph image (1200x630), Spanish URLs in lowercase with hyphens, alt text on images, fast mobile loading (LCP under 2.5 s, WebP images). Change og:locale from es_GT to es_LA, change twitter:card to summary_large_image, and remove the meta-keywords tag (search engines ignore it).

Tracking (GA4): events pilot_form_submit, demo_booking, whatsapp_click, phone_click, video_play. Mark the first two as conversions.

Social profiles: all use the handle @innvestiga. Add icons in the footer (and in the header if there is space), opening in a new tab: linkedin.com/company/innvestiga · youtube.com/@innvestiga · tiktok.com/@innvestiga · instagram.com/innvestiga · facebook.com/innvestiga · x.com/innvestiga · Google Business [link for each office]. Open each link to check it goes to the right profile; if a platform uses another address format, use the real one. Add the same URLs to sameAs in the Organization schema.

Consistency: the same name, phone (+502 2277 7220) and offices (Guatemala City, San Salvador) everywhere. The starting year is 2008 (18 años de experiencia) on the site, schema and every profile. Only ESI keeps 2013 as its first version.

No case studies, no client names or logos, no founder name, photo or bio anywhere on the site.

Typeface: headings Sora (600/700), body Inter (400/500/600). Both are free and support Spanish accents. Self-host WOFF2, with font-display: swap.

Tone: "tú", short sentences, no words like "líder", "premium" or "el mejor". Use "cliente oculto" and "cliente misterioso" as equivalents, without repeating them unnaturally.

Menu: keep the current structure (Nosotros, Servicios, Cobertura, Contacto, Acceso). Add a visible button "Agendar demo" just before "Acceso". "Servicios" has a dropdown with the audit scenarios; "Cobertura" has a dropdown with the 8 countries in this order everywhere on the site: El Salvador, Guatemala, Honduras, Nicaragua, Costa Rica, Panamá, República Dominicana, Chiapas.

Search terms each page must target (use them naturally in the title, H1, first paragraph and one H2; do not repeat them mechanically):

Page

Main search terms

Home

auditoría de experiencia del cliente, mystery shopper Centroamérica, cliente oculto

/servicios/auditorias

cliente oculto, mystery shopper, auditoría con cliente misterioso

Scenario pages

auditoría de garantías, auditoría de devoluciones, auditoría de proceso de ventas, etc.

Country pages

mystery shopper {país}, cliente oculto {país}

/cobertura

auditorías CX Mesoamérica y el Caribe

C. Pilot, contact and demo

/contacto (convert into the pilot request page; keep the URL)

Today: a generic contact page that all the "Solicitar Prueba Piloto" buttons link to.

Title: Prueba Piloto de Auditoría CX y Contacto | Innvestiga

Meta: Comprueba el método en tus propias sucursales antes de decidir. Solicita tu prueba piloto de auditoría CX en toda Centroamérica.

H1: Comprueba en tus propias sucursales lo que realmente pasa.

Text: La prueba piloto te permite ver el método y la evidencia en tu operación antes de tomar una decisión. [What the pilot includes: to be sent]

Form: nombre, empresa, cargo, país (order: El Salvador, Guatemala, then the rest), número de sucursales, correo, WhatsApp, and the question ¿Qué es lo que más te preocupa de la atención en tus sucursales hoy? Each submission must notify [email] and [WhatsApp] immediately and fire pilot_form_submit.

Below the form: phone, email, offices (Guatemala City, San Salvador) and a WhatsApp button.

Thank-you page /gracias (noindex): Gracias, [nombre]. [Ejecutivo] te escribirá en menos de [X] horas con una propuesta de prueba piloto pensada para [empresa]. Send the same text by automatic email.

/demo (new)

Title: Agenda una Demo | Innvestiga

Meta: Mira cómo recibirías la evidencia y los resultados de una auditoría CX en tu operación. Demo guiada de 30 minutos con datos de ejemplo.

H1: Mira cómo recibirías los resultados de tu auditoría.

Text: En 30 minutos te mostramos, con datos de ejemplo, cómo ver la evidencia de cada visita, comparar tus sucursales y presentar resultados claros a tu equipo. La demo es guiada: no se entrega acceso a la plataforma.

Embed a booking calendar. No screenshots or recordings of ESI. Fire demo_booking.

D. Home page /

Each block says what the page has today and what to do.

Header and menu: see rule 13.

Title: today "Innvestiga | Inteligencia de Mercado Premium". New: Auditorías CX: Cliente Oculto y Mystery Shopper | Innvestiga

Meta description: today "Auditorías de proceso de venta, canales digitales y consumer insights en 8 países de Centroamérica y México". New: Auditorías CX con cliente oculto (mystery shopper) en 8 países y 1,282 municipios de Mesoamérica y el Caribe. Resultados en 3 días. Solicita tu prueba piloto.

Hero H1: today "Cierra la brecha entre tus estándares y tu cliente." New: Descubre lo que realmente pasa en cada una de tus sucursales.

Hero text: today three paragraphs. New first paragraph (adapted from the current text): Diseñas estándares, capacitas a tu equipo y defines procesos claros. Una auditoría te muestra si eso ocurre en cada sucursal. Second paragraph: Auditorías de experiencia del cliente con cliente misterioso en 8 países de Centroamérica, el Caribe y Chiapas. Evidencia real y resultados en máximo 3 días. Keep the third line ("Prueba piloto disponible en...") but order the countries El Salvador, Guatemala, Honduras, Nicaragua, Costa Rica, Panamá, República Dominicana y Chiapas, each linking to its country page.

Hero buttons: today "Solicitar Prueba Piloto" and "Ingresar a ESI". New: "Solicitar prueba piloto" (to /contacto) and "Agendar demo" (to /demo).

Counters: today "Años de experiencia", "Estudios realizados", "Clientes activos". New, exactly three: 18 años de experiencia · 8 países · 1,282 municipios que podemos evaluar. Remove "Estudios realizados" and "Clientes activos".

Map band ("Centroamérica · Caribe"): keep, in the country order of rule 13. Keep "SEDE" as a legend only. Each country name links to its page.

"Lo que cambia con un programa" (the four items): keep the text, because it already works. Change the title to "Lo que ganas con una auditoría". Keep the button "Solicitar prueba piloto".

New block "La diferencia" (after the four items): H2 Una encuesta mide a quien responde. Una auditoría mide a todas tus sucursales. Text: Las encuestas reflejan la opinión de los clientes que deciden contestar. Una auditoría con cliente oculto evalúa la misma visita, con los mismos criterios, en cada punto de venta. Así sabes dónde se cumple tu estándar y dónde no.

ESI section ("Cada auditoría, en ESI"): remove the module list, the expansion and "3ª generación". New block:

H2: Plataforma propia, ESI

Text: Cada auditoría llega a ESI, nuestra plataforma propia, operando desde 2013.

Benefits (six lines): Ves la evidencia de cada visita, no un resumen. · Recibes resultados en máximo 3 días, cuando todavía importa. · Comparas sucursales, ciudades y países con el mismo criterio. · Detectas situaciones críticas a tiempo. · Validas los resultados con tu equipo mediante un proceso claro. · Presentas hallazgos y recomendaciones listos para tu comité.

Strip: "Desde 2013 · Resultados en máx. 3 días". Button: "Agendar demo" (replaces "Quiero conocer ESI").

New block "Por qué Innvestiga" (four items):

Equipo logístico en la región. Podemos evaluar cualquiera de los 1,282 municipios de 8 países, con un mismo método.

Resultados en máximo 3 días. Decides cuando todavía importa.

Plataforma propia, ESI. Evidencia, comparativos y resultados claros para tu comité.

18 años de experiencia. Innvestiga mide servicio en la región desde 2008, y desde 2013 con ESI.

Services block ("Servicios que revelan lo que otros no ven"): today three cards (Auditorías de Proceso de Venta, Canales Digitales y Telefónicos, Consumer Insights). New: H2 Situaciones que una auditoría te ayuda a resolver, with six cards linking to section E: Proceso de ventas · Garantías · Reclamos y conflictos · Reparaciones y servicio técnico · Devoluciones y cambios · Promociones y precios. Below the cards add a link "Auditoría de canales digitales". Remove the Consumer Insights card.

"Cómo trabajamos": keep the four steps. Delete the repeated sentence under the title ("Identificamos fortalezas y áreas de mejora...") or replace it with Cuatro pasos, un mismo método para todos tus puntos de venta.

Banner "¿Cuándo fue la última vez que auditaste a tu personal? Hazlo hoy.": keep. Make sure the text is in the HTML as normal words (today the letters are split for animation, so search engines may read it as fragments).

"Cobertura Regional" block: today each country shows departments and municipalities (for example "Guatemala 22 depto. · 120 mun."). New: H2 Auditamos en 8 países. Podemos evaluar cualquier punto de venta. Eight cards in the rule 13 order showing "{N} {unidad}" from the table in section F, each linking to its page (make El Salvador and Guatemala larger). Replace the three counters (Países, Departamentos, Municipios) with two: 8 países · 1,282 municipios. Remove "Departamentos".

Block "Sectores donde hemos trabajado" (new, text only): telefonía celular, banca y tarjetas de crédito, calzado, ferreterías, electrodomésticos, centros comerciales, repuestos automotrices, farmacéutico, supermercados, comida rápida, productos de consumo masivo y turismo.

FAQ block (new): the first four questions of section G, with FAQPage markup.

Pilot call to action (bottom): keep "Solicita tu Prueba Piloto" and "Comprueba en terreno lo que realmente sucede en tus puntos de venta". Buttons: "Solicitar prueba piloto" (to /contacto) and "Agendar demo" (to /demo), replacing "Ingresar a ESI".

Footer: columns Navegación (Nosotros, Servicios, Cobertura, Contacto) · Servicios (the 6 audits and canales digitales) · Cobertura (the 8 countries in order) · Recursos (Preguntas frecuentes, Blog if live, Acceso clientes) · Contacto (phone, email, offices, social icons). Remove "Casos de Éxito". Bottom line: © 2026 Innvestiga Market Specialists. Todos los derechos reservados. Auditorías CX con cliente oculto en Mesoamérica y el Caribe.

Schema: Organization, WebSite, FAQPage (section I).

E. Audit pages

/servicios

Today: a services page with the three cards.

Title: Servicios de Auditoría CX con Cliente Oculto | Innvestiga

H1: Auditorías de experiencia del cliente para empresas de retail.

Content: the six scenarios as cards with links; then "Auditoría de canales digitales"; at the bottom a small link "Otros estudios" to /servicios/consumer-insights.

/servicios/auditorias

Today: "Auditorías de Proceso de Venta" (evaluación presencial con cliente misterioso, protocolos, cumplimiento comercial, reportes con evidencia fotográfica). Keep those four points under "Qué evaluamos".

Title: Auditorías con Cliente Oculto (Mystery Shopper) | Innvestiga

Meta: Visitas presenciales con cliente oculto para medir atención, protocolos y cumplimiento en cada punto de venta. Evidencia real y resultados en 3 días.

H1: Auditorías con cliente oculto en tus puntos de venta.

First paragraph: Una auditoría con cliente oculto (mystery shopper) es una visita presencial de un auditor capacitado que actúa como un cliente real y califica la atención contra los estándares de tu marca. Innvestiga la realiza en 8 países, puede evaluar cualquiera de sus 1,282 municipios y entrega resultados en máximo 3 días.

H2: Situaciones en las que una auditoría ayuda a una empresa de retail. Six cards (title plus one line, each linking to its page):

Proceso de ventas: ¿tu equipo vende como tu estándar dice?

Garantías: ¿se explican y se gestionan como define tu política?

Reclamos y conflictos: ¿cómo responde tu personal cuando el cliente se queja?

Reparaciones y servicio técnico: ¿cumples los tiempos y la comunicación prometidos?

Devoluciones y cambios: ¿tu política se cumple tal como está escrita?

Promociones y precios: ¿lo que anuncias es lo que se cobra?

Other sections: Qué evaluamos · Cómo funciona (4 steps) · Qué recibes (evidencia en video, fotos y audio; comparativos entre sucursales y países; recomendaciones) · Preguntas frecuentes (3) · CTA.

Scenario pages (new, one template, six pages)

URL pattern /servicios/auditorias/{slug}, schema Service (the audit as the service, the scenario in the name), breadcrumbs, links to the 8 country pages, and the pilot CTA. Each page has: H2 "Qué situación evaluamos", H2 "Qué verificamos", H2 "Qué decisión te ayuda a tomar", then the CTA.

1. /proceso-de-ventas

Title: Auditoría del Proceso de Ventas en Tienda | Innvestiga

Meta: Un cliente oculto recorre tu proceso de ventas, del saludo al cierre, y mide si tu equipo sigue el estándar en cada sucursal. Resultados en 3 días.

H1: Auditoría del proceso de ventas en tus tiendas.

First paragraph: Una auditoría del proceso de ventas muestra cómo atiende tu equipo a un cliente real, desde que entra a la tienda hasta que paga o se va sin comprar. Un cliente oculto simula una compra y califica cada etapa contra tu estándar.

Qué verificamos: saludo y acercamiento · detección de necesidades · presentación del producto · manejo de objeciones · ofrecimiento de productos o servicios adicionales · cierre y despedida · tiempo de espera.

Decisión: dónde capacitar y qué sucursales están por debajo del estándar.

2. /garantias

Title: Auditoría de Garantías en Retail | Innvestiga

Meta: Comprueba si tus tiendas explican y gestionan las garantías como define tu política. Un cliente oculto presenta un caso acordado. Resultados en 3 días.

H1: Auditoría de garantías en tus puntos de venta.

First paragraph: Una auditoría de garantías comprueba si tu tienda explica, acepta y gestiona una garantía tal como la define tu política. Un cliente oculto presenta un caso acordado contigo y registra lo que ocurre.

Qué verificamos: la información que recibe el cliente · los documentos que se piden · los tiempos prometidos y los cumplidos · el trato · la consistencia entre sucursales.

Decisión: qué parte del proceso de garantías falla y dónde.

3. /reclamos-y-conflictos

Title: Auditoría de Manejo de Reclamos y Quejas | Innvestiga

Meta: Un cliente oculto presenta una queja simulada y mide cómo responde tu personal: escucha, solución y escalamiento. Resultados en 3 días.

H1: Auditoría del manejo de reclamos y conflictos con el cliente.

First paragraph: Cómo responde tu equipo cuando un cliente se queja define si se queda o se va. Un cliente oculto presenta un reclamo simulado y evalúa la escucha, la solución ofrecida y el escalamiento.

Qué verificamos: actitud y empatía · si se ofrece una solución · si se escala a un supervisor cuando corresponde · si se registra el reclamo · el seguimiento prometido.

Decisión: qué entrenar y qué protocolo ajustar.

4. /reparaciones-y-servicio-tecnico

Title: Auditoría de Reparaciones y Servicio Técnico | Innvestiga

Meta: Un cliente oculto ingresa un producto a reparación y da seguimiento para medir tiempos, comunicación y entrega. Resultados en 3 días.

H1: Auditoría de reparaciones y servicio técnico.

First paragraph: Una auditoría de servicio técnico sigue un caso de principio a fin: recepción del producto, diagnóstico, tiempos, comunicación con el cliente y entrega.

Qué verificamos: recepción y registro · claridad del diagnóstico y del costo · cumplimiento del plazo prometido · comunicación durante el proceso · calidad de la entrega.

Decisión: dónde se rompe la promesa de servicio postventa.

5. /devoluciones-y-cambios

Title: Auditoría de Política de Devoluciones y Cambios | Innvestiga

Meta: Comprueba si tu política de devoluciones se cumple tal como está escrita, en cada sucursal. Un cliente oculto lo verifica. Resultados en 3 días.

H1: Auditoría de devoluciones y cambios.

First paragraph: Una auditoría de devoluciones comprueba si tu política se aplica en tienda tal como está escrita. Un cliente oculto solicita una devolución o cambio y registra la respuesta del personal.

Qué verificamos: si se aplica la política · plazos y condiciones · documentos solicitados · trato al cliente · rechazos indebidos o excepciones no autorizadas.

Decisión: dónde la política y la práctica no coinciden.

6. /promociones-y-precios

Title: Auditoría de Promociones y Precios en Tienda | Innvestiga

Meta: Verifica que lo que anuncias coincide con lo que el cliente ve y paga en cada punto de venta. Un cliente oculto lo comprueba. Resultados en 3 días.

H1: Auditoría de promociones y precios.

First paragraph: Una auditoría de promociones verifica que lo que anuncias coincide con lo que el cliente ve y paga en cada punto de venta.

Qué verificamos: precios exhibidos frente a precios cobrados · promociones vigentes · información al cliente · material publicitario.

Decisión: dónde se incumple lo que prometes en tus promociones.

/servicios/canales-digitales (edit)

Today: "Canales Digitales y Telefónicos" with four points (chat en vivo y chatbots, redes sociales, call center, tiempos de respuesta). Keep the four points.

Title: Auditoría de Chat, Redes Sociales y Call Center | Innvestiga

Meta: Evaluamos la atención de tu chat, chatbot, redes sociales y call center con los mismos criterios que tus sucursales. Resultados en 3 días.

H1: Auditoría de atención en chat, redes sociales y call center.

/servicios/consumer-insights (keep the URL, demote)

Today: a full service page. Keep the content, but remove it from the home page cards and give it lower prominence in the menu.

Title: Inteligencia de Mercado y Estudios a la Medida | Innvestiga

H1: Otros estudios que realizamos.

Opening text: Además de las auditorías, realizamos inteligencia de mercado, estudios cuantitativos y cualitativos a la medida y mediciones de satisfacción del cliente.

F. Coverage and About

/cobertura (rewrite)

Today: interactive map and country cards with departments and municipalities.

Title: Cobertura de Auditorías CX en 8 Países y 1,282 Municipios | Innvestiga

H1: Auditorías CX en 1,282 municipios de Mesoamérica y el Caribe.

First paragraph: Estamos presentes en las principales ciudades de El Salvador, Guatemala, Honduras, Nicaragua, Costa Rica, Panamá, República Dominicana y Chiapas, y podemos realizar auditorías en cualquier punto de venta de esta región. Nuestro equipo comercial atiende primero a El Salvador y Guatemala, y la operación de campo llega a todos los países.

Keep the map and add a plain-text table (replace the old figures; keep this order):

País

Podemos evaluar cualquiera de...

Cantidad

El Salvador

municipios

44

Guatemala

municipios

340

Honduras

municipios

298

Nicaragua

municipios

153

Costa Rica

cantones

84

Panamá

distritos

81

República Dominicana

municipios

158

Chiapas (México)

municipios del estado

124

Total

1,282

Note under the table: En Costa Rica contamos cantones y en Panamá, distritos. En todos los casos, el total corresponde a las divisiones municipales donde podemos realizar evaluaciones.

Country pages (new, all 8 launch together)

/cobertura/el-salvador, /guatemala, /honduras, /nicaragua, /costa-rica, /panama, /republica-dominicana, /chiapas-mexico.

Title: Mystery Shopper y Cliente Oculto en {País} | Innvestiga

Meta: Auditorías con cliente oculto en cualquiera de los {N} {unidad} de {País}. Evidencia real y resultados en 3 días. Solicita tu prueba piloto.

H1: Auditorías de experiencia del cliente en {País}.

First paragraph: Innvestiga audita puntos de venta en {País} con un equipo local y logística regional. Estamos presentes en las principales ciudades [list of cities: to be sent] y podemos evaluar cualquiera de los {N} {unidad} de {País}. Entregamos resultados en máximo 3 días. (For Chiapas: "...de los 124 municipios del estado de Chiapas".)

Sections (same for all): Cobertura en {País} (cities and regions) · Situaciones que auditamos (link to the scenario pages) · Cómo trabajamos en {País} · Preguntas frecuentes · CTA · "Última actualización: [fecha]".

Values for {N} and {unidad}: El Salvador 44 municipios · Guatemala 340 municipios · Honduras 298 municipios · Nicaragua 153 municipios · Costa Rica 84 cantones · Panamá 81 distritos · República Dominicana 158 municipios · Chiapas 124 municipios.

El Salvador and Guatemala (sales priority): at least 400 words specific to the country, 3 local FAQs, and a block "Atención comercial en {País}" with the office address, phone and a WhatsApp button. The pilot form comes first in the page, above the fold.

The other six countries: at least 300 words specific to the country and 2 local FAQs. State clearly that the operation can reach any point of sale in the country.

No copied text between countries. Schema: Service with areaServed. Only San Salvador and Guatemala City appear as offices; do not describe offices in the other countries.

/nosotros (rewrite)

Title: Sobre Innvestiga | Auditorías de Experiencia del Cliente desde 2008

Meta: Innvestiga Market Specialists: 18 años de experiencia en estudios y especialización en cliente oculto (mystery shopper) desde 2013, en 8 países.

H1: Innvestiga: 18 años de experiencia, especialistas en cliente oculto desde 2013.

First paragraph: Innvestiga Market Specialists es una empresa de investigación de mercados que opera desde 2008. Desde 2013 concentramos nuestra experiencia en la metodología de cliente oculto (mystery shopper) y creamos ESI, nuestra plataforma propia. Hoy auditamos puntos de venta en 8 países de Mesoamérica y el Caribe.

H2: Nuestra historia (timeline):

2008: nace Innvestiga y desarrollamos estudios de mercado y de consumidor para empresas de distintos sectores.

2013: enfocamos nuestro trabajo en la metodología de cliente oculto y lanzamos la primera versión de ESI.

Hoy: operamos en 8 países y podemos evaluar cualquiera de sus 1,282 municipios, con resultados en máximo 3 días.

H2: Una experiencia que se nota en cada auditoría: Antes de especializarnos, desarrollamos estudios en sectores como telefonía celular, banca y tarjetas de crédito, calzado, ferreterías, electrodomésticos, centros comerciales, repuestos automotrices, farmacéutico, supermercados, comida rápida y productos de consumo masivo. Esa experiencia nos enseñó a diseñar criterios claros, preparar equipos de campo y presentar resultados que sirven para tomar decisiones.

H2: Cómo trabajamos: the same 4 steps as on the home page.

H2: Datos clave (plain HTML table):

Dato

Valor

Nombre

Innvestiga Market Specialists

Inicio de operaciones

2008 (18 años de experiencia)

Especialización

Cliente oculto (mystery shopper) desde 2013

Plataforma

ESI, plataforma propia (primera versión en 2013)

Países

El Salvador, Guatemala, Honduras, Nicaragua, Costa Rica, Panamá, República Dominicana y Chiapas (México)

Cobertura

1,282 municipios donde podemos evaluar

Oficinas

Guatemala City y San Salvador

Tiempo de entrega

Máximo 3 días después de cada visita

Schema: AboutPage and Organization only. CTA: "Solicitar prueba piloto" and "Agendar demo".

/en/ (new, home page only)

Title: CX Audits and Mystery Shopping in Central America | Innvestiga

Meta: Mystery shopping and customer experience audits in 8 countries and 1,282 municipalities across Mesoamerica and the Caribbean. Results in 3 days.

H1: Find out what really happens in each of your stores.

Counters: 18 years of experience · 8 countries · 1,282 municipalities we can evaluate.

Short sections: why Innvestiga (the four items of the Spanish home page, translated) and two buttons: "Request a pilot" (to /contacto) and "Book a demo" (to /demo). Add hreflang between es and en, with x-default pointing to the Spanish home page.

G. FAQ page

/preguntas-frecuentes (new), with FAQPage markup

The first four questions also appear on the home page.

Title: Preguntas Frecuentes sobre Auditorías CX y Mystery Shopper | Innvestiga

Meta: Respuestas sobre auditorías con cliente oculto: qué son, cuánto tardan, qué países cubren y cómo funciona la prueba piloto.

H1: Preguntas frecuentes sobre auditorías de experiencia del cliente.

¿Qué es una auditoría con cliente oculto (mystery shopper)? Es una evaluación presencial en la que un auditor capacitado visita un punto de venta como si fuera un cliente real y califica la atención contra los estándares de la marca. También se le llama cliente misterioso. Innvestiga la realiza en 8 países.

¿Cuánto tardan los resultados? Máximo 3 días después de cada visita, en nuestra plataforma propia ESI.

¿En qué países y municipios pueden evaluar? En El Salvador, Guatemala, Honduras, Nicaragua, Costa Rica, Panamá, República Dominicana y Chiapas (México). Podemos evaluar cualquiera de sus 1,282 municipios.

¿Qué incluye la prueba piloto? [scope]. Te permite comprobar el método en tus propias sucursales antes de decidir.

¿En qué se diferencia de una encuesta de satisfacción? La encuesta recoge la opinión de quienes deciden responder. La auditoría evalúa la misma visita, con los mismos criterios, en todas tus sucursales.

¿Qué situaciones pueden auditar en una tienda? El proceso de ventas, las garantías, el manejo de reclamos, las reparaciones y el servicio técnico, las devoluciones y cambios, y el cumplimiento de promociones y precios.

¿Cómo garantizan resultados objetivos? Los criterios se definen contigo, los auditores están capacitados y cada evaluación se respalda con evidencia, con un proceso para revisar y aclarar resultados.

¿Auditan chat, redes y call center? Sí, con los mismos criterios que las sucursales.

¿Cuánto cuesta? Depende del número de puntos de venta, países y frecuencia. Preparamos una propuesta a la medida; la prueba piloto permite comprobar el método antes de contratar.

H. Technical

Breadcrumbs with BreadcrumbList. Each audit and scenario page links to the 8 country pages, and each country page links to the scenario pages and the pilot. Show "Última actualización" on country pages and FAQ. 301 redirects for every URL that changes or is removed (including /casos-de-exito). Publish /llms.txt with a short summary and key links. Accessibility basics: alt text, visible focus, labeled forms.

I. Structured data

Organization (home): name "Innvestiga Market Specialists", alternateName "Innvestiga", url, logo, foundingDate 2008, areaServed (the 8 countries), contactPoint (+502 2277 7220), sameAs (the 7 social profiles).

Service on /servicios/auditorias, each scenario page, each country page and /servicios/canales-digitales. FAQPage on home and /preguntas-frecuentes. LocalBusiness per office (San Salvador, Guatemala City) with the exact address and phone from Google Business. AboutPage on /nosotros.

Validate everything with Google's Rich Results Test.

J. Final checklist before launch

All pages in the inventory (section A) are live, and removed pages redirect.

The "Acceso" item still works from every page.

No ESI module names, screenshots, expansion of the acronym, client names, logos or founder details appear anywhere.

Counters show their final numbers in the HTML.

Every page has one H1, a unique title and description, and schema that validates.

Pilot and demo forms send notifications and fire their tracking events.

Every claim and number appears in this document. Do not publish anything else.
