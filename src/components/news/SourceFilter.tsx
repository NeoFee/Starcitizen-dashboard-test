"use client";

import type { FilterState, NewsSource } from "@/lib/types";
import { SOURCES } from "@/lib/constants";

interface Props {
  active: FilterState;
  onChange: (f: FilterState) => void;
  unavailable?: NewsSource[];
}

const FILTERS: { id: FilterState; label: string }[] = [
  { id: "all", label: "Alle Quellen" },
  ...Object.entries(SOURCES).map(([id, cfg]) => ({
    id: id as NewsSource,
    label: cfg.label,
  })),
];

export default function SourceFilter({ active, onChange, unavailable = [] }: Props) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
      {FILTERS.map(({ id, label }) => {
        const isActive = active === id;
        const src = id !== "all" ? SOURCES[id as NewsSource] : null;
        const isUnavailable = id !== "all" && unavailable.includes(id as NewsSource);

        return (
          <button
            key={id}
            onClick={() => !isUnavailable && onChange(id)}
            disabled={isUnavailable}
            title={isUnavailable ? "Quelle aktuell nicht verfügbar" : undefined}
            className={`flex-shrink-0 rounded px-3 py-1.5 text-xs font-medium tracking-wide transition-all duration-200 border ${
              isUnavailable
                ? "bg-transparent text-slate-600 border-[#1a2332] line-through cursor-not-allowed opacity-50"
                : isActive
                ? src
                  ? `${src.badgeClass} ${src.borderClass} shadow-sm`
                  : "bg-cyan-500 text-black border-cyan-500"
                : "bg-transparent text-slate-400 border-[#1a2332] hover:border-slate-600 hover:text-slate-200"
            }`}
          >
            {label}
            {isUnavailable && <span className="ml-1 not-italic no-underline">✕</span>}
          </button>
        );
      })}
    </div>
  );
}
