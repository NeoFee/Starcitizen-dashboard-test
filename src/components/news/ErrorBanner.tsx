import type { SourceError } from "@/lib/types";
import { SOURCES } from "@/lib/constants";
import { AlertTriangle } from "lucide-react";

const REASON_HINTS: Partial<Record<string, string>> = {
  reddit: "Reddit blockiert Server-Anfragen (403). Funktioniert nur im Browser direkt.",
};

interface Props {
  errors: SourceError[];
}

export default function ErrorBanner({ errors }: Props) {
  if (errors.length === 0) return null;

  return (
    <div className="flex items-start gap-2 rounded border border-amber-800/40 bg-amber-950/30 px-3 py-2 text-xs text-amber-300">
      <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
      <div className="space-y-0.5">
        {errors.map((e) => (
          <p key={e.source}>
            <strong>{SOURCES[e.source].shortLabel}</strong> nicht verfügbar.{" "}
            {REASON_HINTS[e.source] ?? "Verfügbare Inhalte werden angezeigt."}
          </p>
        ))}
      </div>
    </div>
  );
}
