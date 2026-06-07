"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

// Shared transform for the República Dominicana inset callout.
// Moves the RD island (and its Hispaniola context shape "haiti") LEFT/UP into
// the empty ocean gap so it renders near Central America instead of stranded
// in the far-right corner.
const RD_DX = -150;
const RD_DY = 70;

// Geographically accurate Central America SVG paths
// Source: Natural Earth (public domain) via github.com/johan/world.geo.json
// Projection: equirectangular, bbox [-93,7] to [-68,20.5], viewBox 0 0 480 260
const mapData = [
  {
    id: "mexico-chiapas",
    label: "CHIAPAS",
    d: "M-71.3,-103.4L-78.5,-86.5L-81.8,-72.7L-83.2,-46.8L-85.0,-37.4L-81.7,-26.9L-75.9,-17.5L-72.2,-2.6L-59.8,11.7L-55.4,22.7L-48.1,32.2L-28.2,37.3L-20.5,45.4L-4.1,40.0L10.2,38.0L24.2,34.6L35.9,31.3L47.8,23.4L52.3,12.2L53.8,-4.0L57.1,-9.6L69.7,-14.7L89.5,-19.1L106.1,-18.5L117.4,-20.1L121.9,-16.0L121.3,-6.7L111.2,4.7L106.8,16.4L110.2,19.8L107.4,28.1L102.7,43.1L98.0,38.2L94.1,38.5L90.5,38.8L83.8,50.4L80.4,48.1L78.2,49.0L78.3,51.8L61.0,51.6L43.5,51.7L43.5,62.5L35.1,62.6L42.0,69.0L49.0,73.4L51.0,77.6L54.1,78.8L53.6,85.3L29.6,85.4L20.6,101.1L23.2,104.7L21.1,109.2L20.6,114.8L-0.6,94.1L-10.2,87.8L-25.5,82.8L-35.9,84.2L-51.0,91.4L-60.4,93.3L-73.6,88.3L-87.6,84.6L-105.1,75.8L-119.1,73.1L-140.3,64.1L-156.0,54.9L-160.7,49.8L-171.2,48.6L-190.3,42.5L-198.1,33.7L-218.2,22.8L-227.6,10.7L-232.0,1.3L-225.8,-0.6L-227.7,-6.1L-223.4,-11.1L-223.3,-17.8L-229.6,-26.4L-231.3,-34.1L-237.6,-43.8L-254.1,-62.9L-272.9,-78.0L-282.0,-90.0L-298.0,-97.8L-301.5,-102.6L-298.6,-114.5L-308.2,-118.9L-319.2,-128.3L-323.9,-141.7L-333.9,-143.3L-344.8,-153.5L-353.6,-162.8L-354.4,-168.8L-364.4,-183.4L-371.1,-198.1L-370.8,-205.5L-384.3,-213.2L-390.5,-212.3L-401.2,-217.6L-404.2,-209.8L-401.1,-200.6L-399.3,-186.1L-392.9,-178.2L-379.0,-164.9L-375.9,-160.4L-373.1,-159.0L-370.6,-152.4L-367.3,-152.6L-363.5,-140.2L-357.8,-135.3L-353.9,-128.5L-342.1,-118.7L-335.9,-100.8L-330.3,-92.3L-325.1,-83.3L-324.1,-73.2L-315.1,-72.5L-307.6,-63.8L-300.8,-55.2L-301.3,-51.7L-309.1,-44.6L-312.5,-44.7L-317.4,-56.4L-329.6,-67.4L-343.1,-76.7L-352.7,-81.6L-352.1,-95.7L-354.9,-106.2L-363.8,-112.1L-376.7,-120.7L-379.2,-118.2L-383.9,-123.3L-395.4,-127.9L-406.4,-139.1L-405.1,-140.6L-397.4,-139.5L-390.4,-146.7L-389.7,-155.3L-404.1,-169.1L-415.1,-174.4L-422.0,-186.4L-428.9,-199.1L-437.6,-214.5L-445.2,-231.8L-423.9,-233.3L-400.2,-235.4L-401.9,-231.6L-373.7,-222.2L-331.0,-208.7L-293.8,-208.8L-279.0,-208.8L-278.9,-216.8L-246.5,-216.8L-239.7,-209.9L-230.1,-203.8L-219.0,-195.4L-212.8,-185.3L-208.2,-174.7L-198.5,-168.9L-183.0,-163.1L-171.2,-178.3L-155.9,-178.7L-142.7,-171.0L-133.3,-157.9L-126.9,-146.6L-115.8,-135.6L-111.7,-122.1L-106.5,-113.1L-91.9,-107.1L-78.6,-102.8L-71.3,-103.4Z",
    city: { x: 30, y: 95, name: "Tuxtla Gutiérrez" },
    fill: "rgba(30,64,175,0.07)",
  },
  {
    id: "guatemala",
    label: "GUATEMALA",
    d: "M60.5,130.3L50.9,126.9L39.2,126.6L30.7,122.8L20.6,114.8L21.1,109.2L23.2,104.7L20.6,101.1L29.6,85.4L53.6,85.3L54.1,78.8L51.0,77.6L49.0,73.4L42.0,69.0L35.1,62.6L43.5,62.5L43.5,51.7L61.0,51.6L78.3,51.8L78.2,67.1L76.7,88.8L82.3,88.8L88.4,92.3L90.0,89.5L95.5,91.9L87.0,99.3L78.1,104.6L76.8,108.3L78.3,112.1L74.4,117.0L70.0,118.2L71.0,120.5L67.5,122.6L61.1,127.5L60.5,130.3Z",
    city: { x: 55, y: 92, name: "Guatemala City" },
    fill: "rgba(30,64,175,0.12)",
    isHQ: true,
  },
  {
    id: "el-salvador",
    label: "EL SALVADOR",
    d: "M103.6,137.0L101.5,141.6L90.7,141.3L83.9,139.4L76.2,135.6L65.8,134.4L60.5,130.3L61.1,127.5L67.5,122.6L71.0,120.5L70.0,118.2L74.4,117.0L79.9,118.6L83.9,122.5L89.6,125.6L90.3,128.2L98.5,125.9L102.3,127.2L104.9,129.3L103.6,137.0Z",
    city: { x: 84, y: 133, name: "San Salvador" },
    fill: "rgba(30,64,175,0.09)",
    isOffice: true,
  },
  {
    id: "honduras",
    label: "HONDURAS",
    d: "M112.5,144.7L109.2,138.7L103.6,137.0L104.9,129.3L102.3,127.2L98.5,125.9L90.3,128.2L89.6,125.6L83.9,122.5L79.9,118.6L74.4,117.0L78.3,112.1L76.8,108.3L78.1,104.6L87.0,99.3L95.5,91.9L97.4,92.7L101.5,89.3L106.9,89.0L108.6,90.6L111.5,89.6L120.2,91.4L128.9,90.8L134.9,88.7L137.1,86.6L143.0,87.6L147.5,88.9L152.4,88.4L156.1,86.7L164.7,89.4L167.6,89.8L173.3,93.4L178.8,97.8L185.6,100.7L190.5,106.0L184.1,105.6L181.5,108.2L175.0,110.8L170.3,110.8L166.1,113.2L162.4,112.3L159.2,109.4L157.2,110.0L154.8,114.6L153.0,114.4L152.7,118.4L146.2,123.7L142.7,126.0L140.8,128.3L135.3,124.4L131.3,129.6L127.4,129.5L123.0,129.9L123.4,139.4L120.6,139.5L118.3,143.9L112.5,144.7Z",
    city: { x: 140, y: 105, name: "Tegucigalpa" },
    fill: "rgba(30,64,175,0.07)",
  },
  {
    id: "nicaragua",
    label: "NICARAGUA",
    d: "M142.5,181.3L136.0,175.2L127.3,167.4L123.2,160.9L115.3,154.9L105.9,146.2L108.0,143.2L111.1,146.1L112.5,144.7L118.3,143.9L120.6,139.5L123.4,139.4L123.0,129.9L127.4,129.5L131.3,129.6L135.3,124.4L140.8,128.3L142.7,126.0L146.2,123.7L152.7,118.4L153.0,114.4L154.8,114.6L157.2,110.0L159.2,109.4L162.4,112.3L166.1,113.2L170.3,110.8L175.0,110.8L181.5,108.2L184.1,105.6L190.5,106.0L188.9,107.9L187.9,112.2L189.8,119.2L185.5,125.8L183.5,133.5L182.9,142.0L183.9,147.0L184.4,155.6L181.5,157.5L179.8,165.8L181.1,170.8L177.2,175.8L178.1,181.0L181.0,184.1L176.5,188.2L171.0,186.9L167.9,183.0L161.9,181.4L157.6,183.9L145.3,178.8L142.5,181.3Z",
    city: { x: 160, y: 148, name: "Managua" },
    fill: "rgba(30,64,175,0.07)",
  },
  {
    id: "costa-rica",
    label: "COSTA RICA",
    d: "M193.9,236.4L183.7,232.1L179.9,228.1L182.1,224.7L181.4,220.5L176.2,215.9L168.8,212.1L162.4,209.6L161.2,204.0L156.3,200.6L157.5,206.2L153.7,210.8L149.5,205.4L143.5,203.5L140.9,199.6L141.0,193.8L143.5,187.7L138.2,185.0L142.5,181.3L145.3,178.8L157.6,183.9L161.9,181.4L167.9,183.0L171.0,186.9L176.5,188.2L181.0,184.1L185.7,194.6L192.9,202.4L201.7,210.6L194.5,212.3L194.6,220.0L198.5,222.9L195.7,225.2L196.4,228.7L194.9,232.6L193.9,236.4Z",
    city: { x: 171, y: 208, name: "San José" },
    fill: "rgba(30,64,175,0.07)",
  },
  {
    id: "panama",
    label: "PANAMÁ",
    d: "M289.0,255.7L282.7,250.1L278.7,239.7L283.4,234.6L278.6,233.3L275.1,226.9L265.8,221.6L257.6,222.8L253.8,229.5L246.3,234.3L242.2,235.0L240.4,239.0L249.3,249.5L244.2,251.9L241.5,254.8L232.8,255.8L229.5,244.2L227.1,247.5L220.9,246.4L217.2,238.6L209.5,237.4L204.6,235.1L196.6,235.1L196.0,239.3L193.9,236.4L194.9,232.6L196.4,228.7L195.7,225.2L198.5,222.9L194.6,220.0L194.5,212.3L201.7,210.6L208.4,217.5L208.1,221.6L215.5,222.4L217.3,220.9L222.4,225.6L231.6,224.2L239.6,219.3L251.0,215.5L257.3,209.7L267.7,210.8L267.0,212.7L277.4,213.4L285.7,216.7L291.8,222.5L298.9,227.8L296.6,230.6L300.9,242.0L297.4,247.7L291.4,246.3L289.0,255.7Z",
    city: { x: 248, y: 236, name: "Ciudad de Panamá" },
    fill: "rgba(30,64,175,0.07)",
  },
  {
    id: "rep-dominicana",
    label: "REP. DOMINICANA",
    d: "M404.4,15.1L406.7,11.8L421.3,11.9L432.4,16.9L437.3,16.4L440.7,23.2L451.0,22.9L450.4,28.6L458.7,29.3L467.9,36.4L460.9,44.2L452.0,40.0L443.5,40.8L437.3,39.9L433.9,43.4L426.8,44.6L423.9,39.9L417.7,42.7L410.2,55.9L405.4,52.8L404.5,47.3L404.9,42.0L400.0,36.3L404.6,33.0L406.0,25.6L404.4,15.1Z",
    city: { x: 432, y: 40, name: "Santo Domingo" },
    fill: "rgba(30,64,175,0.07)",
  },
];

// República Dominicana lives inside an inset <g> (translated). Render it
// separately so we can wrap it together with the Hispaniola context shape.
const RD = mapData.find((c) => c.id === "rep-dominicana")!;
// The other half of Hispaniola — moves with RD inside the inset group.
const haitiPath =
  "M376.8,11.3L388.2,12.1L404.4,15.1L406.0,25.6L404.6,33.0L400.0,36.3L404.9,42.0L404.5,47.3L392.0,44.0L383.2,45.3L371.8,44.0L363.0,47.6L353.0,41.6L354.7,35.3L371.9,38.0L386.0,39.6L392.7,35.3L384.2,26.9L384.3,19.6L372.5,16.6L376.8,11.3Z";

// Context shapes (non-interactive background countries)
const contextShapes = [
  { id: "belize", d: "M78.3,51.8L78.2,49.0L80.4,48.1L83.8,50.4L90.5,38.8L94.1,38.5L94.2,41.3L97.7,41.4L97.4,46.7L94.4,55.0L96.0,58.0L94.0,64.9L95.2,66.7L93.0,76.4L89.4,81.6L86.0,82.2L82.3,88.8L76.7,88.8L78.2,67.1L78.3,51.8Z" },
];

// Connection arcs from Guatemala City (HQ) to each country.
// Rep. Dominicana points to its TRANSFORMED inset coordinate
// (432 + RD_DX, 40 + RD_DY) = (282, 110) so the arc still connects.
const connections = [
  { to: { x: 30, y: 95 } },    // Chiapas
  { to: { x: 84, y: 133 } },   // El Salvador
  { to: { x: 140, y: 105 } },  // Honduras
  { to: { x: 160, y: 148 } },  // Nicaragua
  { to: { x: 171, y: 208 } },  // Costa Rica
  { to: { x: 248, y: 236 } },  // Panamá
  { to: { x: 432 + RD_DX, y: 40 + RD_DY } }, // Rep. Dominicana (inset)
];

const HQ = { x: 55, y: 92 };

export default function HeroMap() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      svgRef.current.style.opacity = "1";
      return;
    }

    const ctx = gsap.context(() => {
      // Draw country outlines with stagger
      const outlines = gsap.utils.toArray<SVGPathElement>(".map-outline");
      outlines.forEach((path, i) => {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.8,
          delay: 1 + i * 0.2,
          ease: "power2.inOut",
        });
      });

      // Fade in country fills
      gsap.fromTo(".map-fill",
        { opacity: 0 },
        { opacity: 1, duration: 1.2, delay: 2.2, stagger: 0.1, ease: "power2.out" }
      );

      // Draw connection arcs
      const arcs = gsap.utils.toArray<SVGPathElement>(".map-arc");
      arcs.forEach((arc, i) => {
        const len = arc.getTotalLength();
        gsap.set(arc, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(arc, {
          strokeDashoffset: 0,
          duration: 1.2,
          delay: 3 + i * 0.15,
          ease: "power1.inOut",
        });
      });

      // Pop city dots
      gsap.fromTo(".map-city",
        { scale: 0, transformOrigin: "center" },
        { scale: 1, duration: 0.5, delay: 3.5, stagger: 0.08, ease: "back.out(3)" }
      );

      // Fade labels
      gsap.fromTo(".map-label",
        { opacity: 0, y: 4 },
        { opacity: 1, y: 0, duration: 0.6, delay: 3.8, stagger: 0.06, ease: "power2.out" }
      );

      // HQ pulse — continuous
      gsap.to(".hq-ring", {
        scale: 3,
        opacity: 0,
        duration: 2.5,
        repeat: -1,
        ease: "power1.out",
        transformOrigin: "center",
      });
    }, svgRef);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="6 10 322 250"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Mapa de cobertura Innvestiga en Centroamérica"
    >
      <defs>
        <radialGradient id="hq-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1e40af" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#1e40af" stopOpacity="0" />
        </radialGradient>
        <filter id="svg-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Subtle grid */}
        <pattern id="map-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="12" cy="12" r="0.4" fill="rgba(30,64,175,0.12)" />
        </pattern>
      </defs>

      {/* Background grid */}
      <rect width="480" height="260" fill="url(#map-grid)" opacity="0.4" />

      {/* Subtle lat/lon lines */}
      {[80, 160, 240, 320, 400].map((x) => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="260" stroke="rgba(30,64,175,0.06)" strokeWidth="0.5" />
      ))}
      {[65, 130, 195].map((y) => (
        <line key={`h${y}`} x1="0" y1={y} x2="480" y2={y} stroke="rgba(30,64,175,0.06)" strokeWidth="0.5" />
      ))}

      {/* ─── Context countries (non-interactive background) ─── */}
      {contextShapes.map((c) => (
        <path key={`ctx-${c.id}`} d={c.d} fill="rgba(30,64,175,0.04)" stroke="rgba(30,64,175,0.18)" strokeWidth="0.5" />
      ))}

      {/* ─── Country fills ─── */}
      {mapData.filter((c) => c.id !== "rep-dominicana").map((c) => (
        <path key={`fill-${c.id}`} className="map-fill" d={c.d} fill={c.fill} opacity="0" />
      ))}

      {/* ─── Connection arcs from HQ ─── */}
      {connections.map((conn, i) => {
        const mx = (HQ.x + conn.to.x) / 2;
        const dist = Math.abs(conn.to.x - HQ.x) + Math.abs(conn.to.y - HQ.y);
        const my = Math.min(HQ.y, conn.to.y) - dist * 0.12 - 15;
        return (
          <path
            key={`arc-${i}`}
            className="map-arc"
            d={`M${HQ.x},${HQ.y} Q${mx},${my} ${conn.to.x},${conn.to.y}`}
            fill="none"
            stroke="rgba(30,64,175,0.3)"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
        );
      })}

      {/* ─── Country outlines ─── */}
      {mapData.filter((c) => c.id !== "rep-dominicana").map((c) => (
        <path
          key={`outline-${c.id}`}
          className="map-outline"
          d={c.d}
          fill="none"
          stroke="rgba(30,64,175,0.45)"
          strokeWidth="1.2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      ))}

      {/* ─── City markers ─── */}
      {mapData.filter((c) => c.id !== "rep-dominicana").map((c) => (
        <g key={`city-${c.id}`} className="map-city">
          {/* Outer ring */}
          <circle
            cx={c.city.x} cy={c.city.y}
            r={c.isHQ ? 8 : c.isOffice ? 6 : 4}
            fill="none"
            stroke={c.isHQ ? "rgba(30,64,175,0.7)" : "rgba(30,64,175,0.35)"}
            strokeWidth={c.isHQ ? 1 : 0.6}
          />
          {/* Inner filled dot */}
          <circle
            cx={c.city.x} cy={c.city.y}
            r={c.isHQ ? 3.5 : c.isOffice ? 2.5 : 2}
            fill={c.isHQ ? "#1e40af" : c.isOffice ? "rgba(30,64,175,0.6)" : "rgba(30,64,175,0.4)"}
          />
          {/* HQ glow */}
          {c.isHQ && (
            <>
              <circle cx={c.city.x} cy={c.city.y} r="14" fill="url(#hq-glow)" />
              <circle className="hq-ring" cx={c.city.x} cy={c.city.y} r="8" fill="none" stroke="rgba(30,64,175,0.35)" strokeWidth="0.6" />
            </>
          )}
        </g>
      ))}

      {/* Country name labels intentionally omitted — keep the map a clean,
          monochrome data graphic so it never competes with the hero headline. */}

      {/* ─── República Dominicana INSET (moved into the empty ocean gap) ─── */}
      <g transform={`translate(${RD_DX},${RD_DY})`}>
        {/* Inset frame + callout label */}
        <rect
          x="396" y="5" width="78" height="58" rx="4"
          fill="none"
          stroke="rgba(30,64,175,0.25)"
          strokeWidth="0.5"
          strokeDasharray="3 2"
        />
        <text
          x="396" y="2"
          fill="rgba(30,64,175,0.55)"
          fontSize="4"
          fontWeight="700"
          letterSpacing="0.1em"
        >
          R. DOMINICANA
        </text>

        {/* Hispaniola context (Haiti half) */}
        <path d={haitiPath} fill="rgba(30,64,175,0.04)" stroke="rgba(30,64,175,0.18)" strokeWidth="0.5" />

        {/* RD fill */}
        <path className="map-fill" d={RD.d} fill={RD.fill} opacity="0" />

        {/* RD outline */}
        <path
          className="map-outline"
          d={RD.d}
          fill="none"
          stroke="rgba(30,64,175,0.45)"
          strokeWidth="1.2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* RD city marker */}
        <g className="map-city">
          <circle cx={RD.city.x} cy={RD.city.y} r="4" fill="none" stroke="rgba(30,64,175,0.35)" strokeWidth="0.6" />
          <circle cx={RD.city.x} cy={RD.city.y} r="2" fill="rgba(30,64,175,0.4)" />
        </g>

      </g>

      {/* HQ badge */}
      <g className="map-label" opacity="0">
        <rect x={HQ.x - 18} y={HQ.y + 14} width="36" height="11" rx="5.5" fill="rgba(30,64,175,0.12)" stroke="rgba(30,64,175,0.3)" strokeWidth="0.5" />
        <text x={HQ.x} y={HQ.y + 22} textAnchor="middle" fill="#1e40af" fontSize="5" fontWeight="800" letterSpacing="0.15em">
          SEDE
        </text>
      </g>

    </svg>
  );
}
