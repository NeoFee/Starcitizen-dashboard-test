import Image from "next/image";
import { Play, ArrowUpRight, MessageSquare, ThumbsUp } from "lucide-react";
import type { NewsItem } from "@/lib/types";
import { SOURCES } from "@/lib/constants";
import SourceBadge from "./SourceBadge";
import { relativeDate } from "@/lib/utils/formatDate";

interface Props {
  item: NewsItem;
}

const SOURCE_PLACEHOLDER_BG: Record<string, string> = {
  rsi: "from-cyan-950 to-blue-950",
  reddit: "from-orange-950 to-red-950",
  wiki: "from-violet-950 to-purple-950",
  youtube: "from-red-950 to-rose-950",
};

export default function NewsCard({ item }: Props) {
  const cfg = SOURCES[item.source];
  const placeholderBg = SOURCE_PLACEHOLDER_BG[item.source] ?? "from-slate-900 to-slate-950";

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex flex-col rounded-lg border border-[#1a2332] bg-[#0a0f1a] overflow-hidden transition-all duration-300 hover:border-opacity-70 hover:-translate-y-0.5 hover:shadow-lg`}
      style={{
        ["--tw-shadow-color" as string]: cfg.glowColor,
      }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-[#050810]">
        {item.thumbnail ? (
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div
            className={`w-full h-full bg-gradient-to-br ${placeholderBg} flex items-center justify-center`}
          >
            <span
              className="text-2xl font-bold tracking-widest text-white/10"
              style={{ fontFamily: "Orbitron, monospace" }}
            >
              {cfg.shortLabel}
            </span>
          </div>
        )}

        {/* YouTube play overlay */}
        {item.source === "youtube" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-red-600/80 flex items-center justify-center backdrop-blur-sm group-hover:bg-red-600 transition-colors">
              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
            </div>
          </div>
        )}

        {/* Source badge */}
        <div className="absolute top-2 right-2">
          <SourceBadge source={item.source} />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {/* Flair (Reddit) */}
        {item.meta?.flair && (
          <span className="text-[10px] text-orange-400/80 uppercase tracking-wider font-medium">
            {item.meta.flair}
          </span>
        )}

        {/* Title */}
        <h2 className="text-sm font-semibold text-slate-100 line-clamp-2 leading-snug group-hover:text-cyan-300 transition-colors">
          {item.title}
        </h2>

        {/* Excerpt */}
        {item.excerpt && (
          <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
            {item.excerpt}
          </p>
        )}

        {/* Footer */}
        <div className="mt-auto pt-2 flex items-center justify-between gap-2 border-t border-[#1a2332]">
          <div className="flex items-center gap-2 min-w-0">
            {item.author && (
              <span className="text-xs text-slate-600 truncate">
                {item.author}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Reddit meta */}
            {item.source === "reddit" && item.meta && (
              <>
                {item.meta.score !== undefined && (
                  <span className="flex items-center gap-0.5 text-xs text-slate-600">
                    <ThumbsUp className="w-3 h-3" />
                    {item.meta.score >= 1000
                      ? `${(item.meta.score / 1000).toFixed(1)}k`
                      : item.meta.score}
                  </span>
                )}
                {item.meta.numComments !== undefined && (
                  <span className="flex items-center gap-0.5 text-xs text-slate-600">
                    <MessageSquare className="w-3 h-3" />
                    {item.meta.numComments}
                  </span>
                )}
              </>
            )}

            <span className="text-xs text-slate-600">
              {relativeDate(item.publishedAt)}
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-700 group-hover:text-cyan-400 transition-colors" />
          </div>
        </div>
      </div>
    </a>
  );
}
