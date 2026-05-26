"use client";

import { RefreshCw } from "lucide-react";

interface Props {
  onRefresh: () => void;
  isLoading: boolean;
  fetchedAt?: string;
}

export default function RefreshButton({ onRefresh, isLoading, fetchedAt }: Props) {
  return (
    <div className="flex items-center gap-3">
      {fetchedAt && (
        <span className="hidden sm:inline text-xs text-slate-600">
          Aktualisiert: {new Date(fetchedAt).toLocaleTimeString("de-DE")}
        </span>
      )}
      <button
        onClick={() => onRefresh()}
        disabled={isLoading}
        className="flex items-center gap-1.5 rounded border border-[#1a2332] bg-[#0a0f1a] px-3 py-1.5 text-xs text-slate-400 transition-all hover:border-cyan-500/40 hover:text-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
        <span>Aktualisieren</span>
      </button>
    </div>
  );
}
