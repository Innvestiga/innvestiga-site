"use client";

interface IndustryFilterProps {
  industries: string[];
  active: string;
  onChange: (industry: string) => void;
}

export default function IndustryFilter({
  industries,
  active,
  onChange,
}: IndustryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-16">
      {industries.map((industry) => (
        <button
          key={industry}
          type="button"
          onClick={() => onChange(industry)}
          className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
            active === industry
              ? "bg-primary text-white"
              : "bg-surface-alt text-body hover:bg-border hover:text-ink"
          }`}
        >
          {industry}
        </button>
      ))}
    </div>
  );
}
