"use client";

import { useState } from "react";
import { Wrench } from "lucide-react";
import { TOOLS, TOOL_CATEGORIES, type ToolCategory } from "@/lib/tools";
import ToolCard from "./ToolCard";

type Filter = ToolCategory | "all";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "Alle Tools" },
  ...Object.entries(TOOL_CATEGORIES).map(([id, cfg]) => ({
    id: id as ToolCategory,
    label: cfg.label,
  })),
];

export default function ToolsSection() {
  const [active, setActive] = useState<Filter>("all");

  const visible = active === "all" ? TOOLS : TOOLS.filter((t) => t.category === active);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-8 h-8 rounded border border-cyan-500/30 bg-cyan-500/10">
          <Wrench className="w-4 h-4 text-cyan-400" />
        </div>
        <div>
          <h2
            className="text-base font-bold tracking-widest text-cyan-400 uppercase"
            style={{ fontFamily: "Orbitron, monospace" }}
          >
            Community Tools
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Nützliche Werkzeuge für jeden Citizen — Handel, Kampf, Schiffe & mehr
          </p>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
        {FILTERS.map(({ id, label }) => {
          const isActive = active === id;
          const cfg = id !== "all" ? TOOL_CATEGORIES[id as ToolCategory] : null;
          return (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`flex-shrink-0 rounded px-3 py-1.5 text-xs font-medium tracking-wide transition-all duration-200 border ${
                isActive
                  ? cfg
                    ? `${cfg.bg} ${cfg.color} border-current`
                    : "bg-cyan-500 text-black border-cyan-500"
                  : "bg-transparent text-slate-400 border-[#1a2332] hover:border-slate-600 hover:text-slate-200"
              }`}
            >
              {label}
              {isActive && id !== "all" && (
                <span className="ml-1.5 opacity-70">{visible.length}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {visible.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  );
}
