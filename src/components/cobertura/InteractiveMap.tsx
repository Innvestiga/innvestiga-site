"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { countries } from "@/data/countries";
import type { Country } from "@/types";

interface InteractiveMapProps {
  onCountrySelect: (country: Country | null) => void;
  selectedCountry: Country | null;
}

// Shared transform for the República Dominicana inset callout — moves the RD
// island and its Hispaniola context shape ("haiti") LEFT/UP into the empty
// ocean gap so it renders near Central America instead of the far corner.
const RD_DX = -150;
const RD_DY = 70;

// Geographically accurate Central America SVG paths
// Source: Natural Earth (public domain) via github.com/johan/world.geo.json
// Projection: equirectangular, bbox [-93,7] to [-68,20.5], viewBox 0 0 480 260
const countryPaths: Record<string, string> = {
  "mexico-chiapas":
    "M-71.3,-103.4L-78.5,-86.5L-81.8,-72.7L-83.2,-46.8L-85.0,-37.4L-81.7,-26.9L-75.9,-17.5L-72.2,-2.6L-59.8,11.7L-55.4,22.7L-48.1,32.2L-28.2,37.3L-20.5,45.4L-4.1,40.0L10.2,38.0L24.2,34.6L35.9,31.3L47.8,23.4L52.3,12.2L53.8,-4.0L57.1,-9.6L69.7,-14.7L89.5,-19.1L106.1,-18.5L117.4,-20.1L121.9,-16.0L121.3,-6.7L111.2,4.7L106.8,16.4L110.2,19.8L107.4,28.1L102.7,43.1L98.0,38.2L94.1,38.5L90.5,38.8L83.8,50.4L80.4,48.1L78.2,49.0L78.3,51.8L61.0,51.6L43.5,51.7L43.5,62.5L35.1,62.6L42.0,69.0L49.0,73.4L51.0,77.6L54.1,78.8L53.6,85.3L29.6,85.4L20.6,101.1L23.2,104.7L21.1,109.2L20.6,114.8L-0.6,94.1L-10.2,87.8L-25.5,82.8L-35.9,84.2L-51.0,91.4L-60.4,93.3L-73.6,88.3L-87.6,84.6L-105.1,75.8L-119.1,73.1L-140.3,64.1L-156.0,54.9L-160.7,49.8L-171.2,48.6L-190.3,42.5L-198.1,33.7L-218.2,22.8L-227.6,10.7L-232.0,1.3L-225.8,-0.6L-227.7,-6.1L-223.4,-11.1L-223.3,-17.8L-229.6,-26.4L-231.3,-34.1L-237.6,-43.8L-254.1,-62.9L-272.9,-78.0L-282.0,-90.0L-298.0,-97.8L-301.5,-102.6L-298.6,-114.5L-308.2,-118.9L-319.2,-128.3L-323.9,-141.7L-333.9,-143.3L-344.8,-153.5L-353.6,-162.8L-354.4,-168.8L-364.4,-183.4L-371.1,-198.1L-370.8,-205.5L-384.3,-213.2L-390.5,-212.3L-401.2,-217.6L-404.2,-209.8L-401.1,-200.6L-399.3,-186.1L-392.9,-178.2L-379.0,-164.9L-375.9,-160.4L-373.1,-159.0L-370.6,-152.4L-367.3,-152.6L-363.5,-140.2L-357.8,-135.3L-353.9,-128.5L-342.1,-118.7L-335.9,-100.8L-330.3,-92.3L-325.1,-83.3L-324.1,-73.2L-315.1,-72.5L-307.6,-63.8L-300.8,-55.2L-301.3,-51.7L-309.1,-44.6L-312.5,-44.7L-317.4,-56.4L-329.6,-67.4L-343.1,-76.7L-352.7,-81.6L-352.1,-95.7L-354.9,-106.2L-363.8,-112.1L-376.7,-120.7L-379.2,-118.2L-383.9,-123.3L-395.4,-127.9L-406.4,-139.1L-405.1,-140.6L-397.4,-139.5L-390.4,-146.7L-389.7,-155.3L-404.1,-169.1L-415.1,-174.4L-422.0,-186.4L-428.9,-199.1L-437.6,-214.5L-445.2,-231.8L-423.9,-233.3L-400.2,-235.4L-401.9,-231.6L-373.7,-222.2L-331.0,-208.7L-293.8,-208.8L-279.0,-208.8L-278.9,-216.8L-246.5,-216.8L-239.7,-209.9L-230.1,-203.8L-219.0,-195.4L-212.8,-185.3L-208.2,-174.7L-198.5,-168.9L-183.0,-163.1L-171.2,-178.3L-155.9,-178.7L-142.7,-171.0L-133.3,-157.9L-126.9,-146.6L-115.8,-135.6L-111.7,-122.1L-106.5,-113.1L-91.9,-107.1L-78.6,-102.8L-71.3,-103.4Z",
  guatemala:
    "M60.5,130.3L50.9,126.9L39.2,126.6L30.7,122.8L20.6,114.8L21.1,109.2L23.2,104.7L20.6,101.1L29.6,85.4L53.6,85.3L54.1,78.8L51.0,77.6L49.0,73.4L42.0,69.0L35.1,62.6L43.5,62.5L43.5,51.7L61.0,51.6L78.3,51.8L78.2,67.1L76.7,88.8L82.3,88.8L88.4,92.3L90.0,89.5L95.5,91.9L87.0,99.3L78.1,104.6L76.8,108.3L78.3,112.1L74.4,117.0L70.0,118.2L71.0,120.5L67.5,122.6L61.1,127.5L60.5,130.3Z",
  "el-salvador":
    "M103.6,137.0L101.5,141.6L90.7,141.3L83.9,139.4L76.2,135.6L65.8,134.4L60.5,130.3L61.1,127.5L67.5,122.6L71.0,120.5L70.0,118.2L74.4,117.0L79.9,118.6L83.9,122.5L89.6,125.6L90.3,128.2L98.5,125.9L102.3,127.2L104.9,129.3L103.6,137.0Z",
  honduras:
    "M112.5,144.7L109.2,138.7L103.6,137.0L104.9,129.3L102.3,127.2L98.5,125.9L90.3,128.2L89.6,125.6L83.9,122.5L79.9,118.6L74.4,117.0L78.3,112.1L76.8,108.3L78.1,104.6L87.0,99.3L95.5,91.9L97.4,92.7L101.5,89.3L106.9,89.0L108.6,90.6L111.5,89.6L120.2,91.4L128.9,90.8L134.9,88.7L137.1,86.6L143.0,87.6L147.5,88.9L152.4,88.4L156.1,86.7L164.7,89.4L167.6,89.8L173.3,93.4L178.8,97.8L185.6,100.7L190.5,106.0L184.1,105.6L181.5,108.2L175.0,110.8L170.3,110.8L166.1,113.2L162.4,112.3L159.2,109.4L157.2,110.0L154.8,114.6L153.0,114.4L152.7,118.4L146.2,123.7L142.7,126.0L140.8,128.3L135.3,124.4L131.3,129.6L127.4,129.5L123.0,129.9L123.4,139.4L120.6,139.5L118.3,143.9L112.5,144.7Z",
  nicaragua:
    "M142.5,181.3L136.0,175.2L127.3,167.4L123.2,160.9L115.3,154.9L105.9,146.2L108.0,143.2L111.1,146.1L112.5,144.7L118.3,143.9L120.6,139.5L123.4,139.4L123.0,129.9L127.4,129.5L131.3,129.6L135.3,124.4L140.8,128.3L142.7,126.0L146.2,123.7L152.7,118.4L153.0,114.4L154.8,114.6L157.2,110.0L159.2,109.4L162.4,112.3L166.1,113.2L170.3,110.8L175.0,110.8L181.5,108.2L184.1,105.6L190.5,106.0L188.9,107.9L187.9,112.2L189.8,119.2L185.5,125.8L183.5,133.5L182.9,142.0L183.9,147.0L184.4,155.6L181.5,157.5L179.8,165.8L181.1,170.8L177.2,175.8L178.1,181.0L181.0,184.1L176.5,188.2L171.0,186.9L167.9,183.0L161.9,181.4L157.6,183.9L145.3,178.8L142.5,181.3Z",
  "costa-rica":
    "M193.9,236.4L183.7,232.1L179.9,228.1L182.1,224.7L181.4,220.5L176.2,215.9L168.8,212.1L162.4,209.6L161.2,204.0L156.3,200.6L157.5,206.2L153.7,210.8L149.5,205.4L143.5,203.5L140.9,199.6L141.0,193.8L143.5,187.7L138.2,185.0L142.5,181.3L145.3,178.8L157.6,183.9L161.9,181.4L167.9,183.0L171.0,186.9L176.5,188.2L181.0,184.1L185.7,194.6L192.9,202.4L201.7,210.6L194.5,212.3L194.6,220.0L198.5,222.9L195.7,225.2L196.4,228.7L194.9,232.6L193.9,236.4Z",
  panama:
    "M289.0,255.7L282.7,250.1L278.7,239.7L283.4,234.6L278.6,233.3L275.1,226.9L265.8,221.6L257.6,222.8L253.8,229.5L246.3,234.3L242.2,235.0L240.4,239.0L249.3,249.5L244.2,251.9L241.5,254.8L232.8,255.8L229.5,244.2L227.1,247.5L220.9,246.4L217.2,238.6L209.5,237.4L204.6,235.1L196.6,235.1L196.0,239.3L193.9,236.4L194.9,232.6L196.4,228.7L195.7,225.2L198.5,222.9L194.6,220.0L194.5,212.3L201.7,210.6L208.4,217.5L208.1,221.6L215.5,222.4L217.3,220.9L222.4,225.6L231.6,224.2L239.6,219.3L251.0,215.5L257.3,209.7L267.7,210.8L267.0,212.7L277.4,213.4L285.7,216.7L291.8,222.5L298.9,227.8L296.6,230.6L300.9,242.0L297.4,247.7L291.4,246.3L289.0,255.7Z",
  "republica-dominicana":
    "M404.4,15.1L406.7,11.8L421.3,11.9L432.4,16.9L437.3,16.4L440.7,23.2L451.0,22.9L450.4,28.6L458.7,29.3L467.9,36.4L460.9,44.2L452.0,40.0L443.5,40.8L437.3,39.9L433.9,43.4L426.8,44.6L423.9,39.9L417.7,42.7L410.2,55.9L405.4,52.8L404.5,47.3L404.9,42.0L400.0,36.3L404.6,33.0L406.0,25.6L404.4,15.1Z",
};

// Context countries (not interactive, rendered as background shapes)
const contextPaths: Record<string, string> = {
  belize:
    "M78.3,51.8L78.2,49.0L80.4,48.1L83.8,50.4L90.5,38.8L94.1,38.5L94.2,41.3L97.7,41.4L97.4,46.7L94.4,55.0L96.0,58.0L94.0,64.9L95.2,66.7L93.0,76.4L89.4,81.6L86.0,82.2L82.3,88.8L76.7,88.8L78.2,67.1L78.3,51.8Z",
};

// Hispaniola context (Haiti half) — rendered inside the RD inset group.
const haitiPath =
  "M376.8,11.3L388.2,12.1L404.4,15.1L406.0,25.6L404.6,33.0L400.0,36.3L404.9,42.0L404.5,47.3L392.0,44.0L383.2,45.3L371.8,44.0L363.0,47.6L353.0,41.6L354.7,35.3L371.9,38.0L386.0,39.6L392.7,35.3L384.2,26.9L384.3,19.6L372.5,16.6L376.8,11.3Z";

const RD_ID = "republica-dominicana";

export default function InteractiveMap({
  onCountrySelect,
  selectedCountry,
}: InteractiveMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const paths = svgRef.current.querySelectorAll("path[data-country]");

    // Draw-in animation
    paths.forEach((path, i) => {
      const el = path as SVGPathElement;
      const length = el.getTotalLength();
      gsap.set(el, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
      gsap.to(el, {
        strokeDashoffset: 0,
        duration: 1.5,
        delay: i * 0.15,
        ease: "power2.inOut",
      });
    });
  }, []);

  const renderCountryPath = (id: string, d: string) => {
    const country = countries.find((c) => c.id === id);
    const isSelected = selectedCountry?.id === id;

    return (
      <path
        key={id}
        data-country={id}
        d={d}
        fill={isSelected ? "rgba(30,64,175,0.3)" : "rgba(30,64,175,0.08)"}
        stroke="rgba(30,64,175,0.45)"
        strokeWidth={isSelected ? 2 : 1}
        className="cursor-pointer transition-all duration-300 hover:fill-[rgba(30,64,175,0.2)] hover:stroke-[rgba(30,64,175,0.7)]"
        onClick={() =>
          onCountrySelect(isSelected ? null : country || null)
        }
        style={{ transformOrigin: "center" }}
      />
    );
  };

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 480 260"
      className="w-full h-auto max-w-2xl"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Context countries (non-interactive background) */}
      {Object.entries(contextPaths).map(([id, d]) => (
        <path
          key={id}
          d={d}
          fill="rgba(30,64,175,0.04)"
          stroke="rgba(30,64,175,0.18)"
          strokeWidth={0.5}
        />
      ))}

      {/* Interactive countries (RD handled separately in the inset group) */}
      {Object.entries(countryPaths)
        .filter(([id]) => id !== RD_ID)
        .map(([id, d]) => renderCountryPath(id, d))}

      {/* Country labels (DO handled in the inset group) */}
      {[
        { id: "mexico-chiapas", x: 30, y: 95, label: "MX" },
        { id: "guatemala", x: 58, y: 96, label: "GT" },
        { id: "el-salvador", x: 84, y: 133, label: "SV" },
        { id: "honduras", x: 135, y: 111, label: "HN" },
        { id: "nicaragua", x: 155, y: 148, label: "NI" },
        { id: "costa-rica", x: 171, y: 210, label: "CR" },
        { id: "panama", x: 248, y: 236, label: "PA" },
      ].map((label) => (
        <text
          key={label.id}
          x={label.x}
          y={label.y}
          textAnchor="middle"
          className="text-[8px] font-bold fill-primary/70 pointer-events-none select-none"
        >
          {label.label}
        </text>
      ))}

      {/* ─── República Dominicana INSET (moved into the empty ocean gap) ─── */}
      <g transform={`translate(${RD_DX},${RD_DY})`}>
        {/* Inset frame + callout label */}
        <rect
          x="396" y="5" width="78" height="58" rx="4"
          fill="none"
          stroke="rgba(30,64,175,0.25)"
          strokeWidth={0.5}
          strokeDasharray="3 2"
        />
        <text
          x="396" y="2"
          className="fill-muted"
          fontSize={4}
          fontWeight={700}
          letterSpacing="0.08em"
        >
          INSET · REP. DOMINICANA
        </text>

        {/* Hispaniola context (Haiti half) */}
        <path
          d={haitiPath}
          fill="rgba(30,64,175,0.04)"
          stroke="rgba(30,64,175,0.18)"
          strokeWidth={0.5}
        />

        {/* RD interactive path */}
        {renderCountryPath(RD_ID, countryPaths[RD_ID])}

        {/* RD label */}
        <text
          x={432}
          y={33}
          textAnchor="middle"
          className="text-[8px] font-bold fill-primary/70 pointer-events-none select-none"
        >
          DO
        </text>
      </g>
    </svg>
  );
}
