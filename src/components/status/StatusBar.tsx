"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, AlertTriangle, CheckCircle, XCircle, Wrench } from "lucide-react";
import { useStatus } from "@/hooks/useStatus";
import type { StatusLevel } from "@/lib/types";
import { relativeDate } from "@/lib/utils/formatDate";

const STATUS_CONFIG: Record<
  StatusLevel,
  { label: string; bg: string; border: string; text: string; icon: React.ReactNode }
> = {
  operational: {
    label: "Alle Systeme Betriebsbereit",
    bg: "bg-emerald-950/40",
    border: "border-emerald-700/50",
    text: "text-emerald-400",
    icon: <CheckCircle className="w-4 h-4" />,
  },
  degraded_performance: {
    label: "Leistungsbeeinträchtigungen",
    bg: "bg-amber-950/40",
    border: "border-amber-700/50",
    text: "text-amber-400",
    icon: <AlertTriangle className="w-4 h-4" />,
  },
  partial_outage: {
    label: "Teilweiser Ausfall",
    bg: "bg-amber-950/40",
    border: "border-amber-700/50",
    text: "text-amber-400",
    icon: <AlertTriangle className="w-4 h-4" />,
  },
  major_outage: {
    label: "Größerer Ausfall",
    bg: "bg-red-950/40",
    border: "border-red-700/50",
    text: "text-red-400",
    icon: <XCircle className="w-4 h-4" />,
  },
  under_maintenance: {
    label: "Wartungsarbeiten",
    bg: "bg-blue-950/40",
    border: "border-blue-700/50",
    text: "text-blue-400",
    icon: <Wrench className="w-4 h-4" />,
  },
  unknown: {
    label: "Status Unbekannt",
    bg: "bg-slate-900/40",
    border: "border-slate-700/50",
    text: "text-slate-400",
    icon: <AlertTriangle className="w-4 h-4" />,
  },
};

const COMPONENT_STATUS_COLORS: Record<StatusLevel, string> = {
  operational: "text-emerald-400",
  degraded_performance: "text-amber-400",
  partial_outage: "text-amber-400",
  major_outage: "text-red-400",
  under_maintenance: "text-blue-400",
  unknown: "text-slate-400",
};

const COMPONENT_STATUS_DOT: Record<StatusLevel, string> = {
  operational: "bg-emerald-400",
  degraded_performance: "bg-amber-400",
  partial_outage: "bg-amber-400",
  major_outage: "bg-red-400",
  under_maintenance: "bg-blue-400",
  unknown: "bg-slate-400",
};

export default function StatusBar() {
  const { status, isLoading } = useStatus();
  const [expanded, setExpanded] = useState(false);

  if (isLoading) {
    return (
      <div className="border-b border-[#1a2332] bg-[#050810] px-4 py-2">
        <div className="mx-auto max-w-7xl flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-slate-700 animate-pulse" />
          <div className="h-3 w-40 bg-slate-800 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  if (!status) return null;

  const cfg = STATUS_CONFIG[status.overall] ?? STATUS_CONFIG.unknown;
  const visibleComponents = status.components.filter((c) => !c.group);

  return (
    <div className={`border-b ${cfg.border} ${cfg.bg}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Summary row */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="w-full flex items-center justify-between gap-3 py-2 text-left"
        >
          <div className="flex items-center gap-2">
            <span className={`${cfg.text} flex-shrink-0`}>{cfg.icon}</span>
            <span className={`text-xs font-semibold tracking-wider uppercase ${cfg.text}`}>
              {cfg.label}
            </span>
            {status.activeIncidents.length > 0 && (
              <span className="ml-2 text-xs bg-red-900/60 text-red-300 border border-red-700/50 rounded px-1.5 py-0.5">
                {status.activeIncidents.length} aktive{" "}
                {status.activeIncidents.length === 1 ? "Störung" : "Störungen"}
              </span>
            )}
          </div>
          <span className={`flex-shrink-0 ${cfg.text}`}>
            {expanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </span>
        </button>

        {/* Expanded detail */}
        {expanded && (
          <div className="pb-3 space-y-3">
            {/* Components grid */}
            {visibleComponents.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-1.5">
                {visibleComponents.map((comp) => (
                  <div key={comp.id} className="flex items-center gap-1.5">
                    <div
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        COMPONENT_STATUS_DOT[comp.status] ?? "bg-slate-400"
                      }`}
                    />
                    <span className="text-xs text-slate-300 truncate">
                      {comp.name}
                    </span>
                    <span
                      className={`text-xs ml-auto flex-shrink-0 ${
                        COMPONENT_STATUS_COLORS[comp.status] ?? "text-slate-400"
                      }`}
                    >
                      {comp.status === "operational"
                        ? "OK"
                        : comp.status === "under_maintenance"
                        ? "Wartung"
                        : comp.status === "major_outage"
                        ? "Ausfall"
                        : "Beeintr."}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Active incidents */}
            {status.activeIncidents.length > 0 && (
              <div className="space-y-2">
                {status.activeIncidents.map((inc) => (
                  <div
                    key={inc.id}
                    className="rounded border border-red-800/40 bg-red-950/30 p-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-medium text-red-300">
                        {inc.name}
                      </p>
                      <span className="text-xs text-slate-500 flex-shrink-0">
                        {relativeDate(inc.updatedAt)}
                      </span>
                    </div>
                    {inc.latestUpdate && (
                      <p className="mt-1 text-xs text-slate-400 line-clamp-2">
                        {inc.latestUpdate}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            <p className="text-xs text-slate-600">
              Aktualisiert {relativeDate(status.fetchedAt)} ·{" "}
              <a
                href="https://status.robertsspaceindustries.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition-colors"
              >
                Statusseite öffnen ↗
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
