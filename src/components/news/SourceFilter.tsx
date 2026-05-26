"use client";

import type { FilterState, NewsSource } from "@/lib/types";
import { SOURCES } from "@/lib/constants";

interface Props {
  active: FilterState;
  onChange: (f: FilterState) => void;
}

const FILTERS: { id: FilterState; label: string }[] = [
  { id: "all", label: "Alle Quellen" },
  ...Object.entries(SOURCES).map(([id, cfg]) => ({
    id: id as NewsSource,
    label: cfg.label,
  })),
];

export default function SourceFilter({ active, onChange }: Props) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
      {FILTERS.map(({ id, label }) => {
        const isActive = active === id;
        const src = id !== "all" ? SOURCES[id as NewsSource] : null;

        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`flex-shrink-0 rounded px-3 py-1.5 text-xs font-medium tracking-wide transition-all duration-200 border ${
              isActive
                ? src
                  ? `${src.badgeClass} ${src.borderClass} shadow-sm`
                  : "bg-cyan-500 text-black border-cyan-500"
                : "bg-transparent text-slate-400 border-[#1a2332] hover:border-slate-600 hover:text-slate-200"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
