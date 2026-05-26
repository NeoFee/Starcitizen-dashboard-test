import type { NewsSource } from "@/lib/types";
import { SOURCES } from "@/lib/constants";

interface Props {
  source: NewsSource;
  className?: string;
}

export default function SourceBadge({ source, className = "" }: Props) {
  const cfg = SOURCES[source];
  return (
    <span
      className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase ${cfg.badgeClass} ${className}`}
    >
      {cfg.shortLabel}
    </span>
  );
}
