import type { SourceError } from "@/lib/types";
import { SOURCES } from "@/lib/constants";
import { AlertTriangle } from "lucide-react";

interface Props {
  errors: SourceError[];
}

export default function ErrorBanner({ errors }: Props) {
  if (errors.length === 0) return null;

  const sourceNames = errors.map((e) => SOURCES[e.source].shortLabel).join(", ");

  return (
    <div className="flex items-start gap-2 rounded border border-amber-800/40 bg-amber-950/30 px-3 py-2 text-xs text-amber-300">
      <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
      <span>
        Einige Quellen konnten nicht geladen werden: <strong>{sourceNames}</strong>.
        Verfügbare Inhalte werden angezeigt.
      </span>
    </div>
  );
}
