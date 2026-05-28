import { ExternalLink } from "lucide-react";
import type { Tool } from "@/lib/tools";
import { TOOL_CATEGORIES } from "@/lib/tools";

export default function ToolCard({ tool }: { tool: Tool }) {
  const cat = TOOL_CATEGORIES[tool.category];

  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col gap-3 rounded-lg border border-[#1a2332] bg-[#0a0f1a] p-4 transition-all duration-200 hover:border-cyan-500/40 hover:bg-[#0d1420]"
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Monogram icon */}
          <div className="flex-shrink-0 w-9 h-9 rounded border border-[#1a2332] bg-[#060c18] flex items-center justify-center group-hover:border-cyan-500/30 transition-colors">
            <span className="text-sm font-bold text-cyan-400 font-mono">
              {tool.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="font-semibold text-slate-100 text-sm truncate group-hover:text-cyan-300 transition-colors">
            {tool.name}
          </span>
        </div>

        <div className="flex flex-shrink-0 items-center gap-1.5">
          {tool.badge && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-400 border border-cyan-500/25 tracking-wide">
              {tool.badge}
            </span>
          )}
          <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 flex-1">
        {tool.description}
      </p>

      {/* Category badge */}
      <span className={`self-start text-[10px] font-semibold px-2 py-0.5 rounded border tracking-wider uppercase ${cat.bg} ${cat.color}`}>
        {cat.label}
      </span>

      {/* Subtle left accent on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-lg bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
  );
}
