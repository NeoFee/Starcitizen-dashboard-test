"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { relativeDate } from "@/lib/utils/formatDate";
import type { NewsItem } from "@/lib/types";

interface Props {
  item: NewsItem;
  onPlay: (videoId: string, title: string) => void;
}

export default function StreamerVideoCard({ item, onPlay }: Props) {
  const videoId = item.meta?.videoId;

  return (
    <div className="group flex flex-col rounded-lg border border-[#1a2332] bg-[#0a0f1a] overflow-hidden hover:border-red-500/40 transition-all duration-200">
      {/* Thumbnail */}
      <div
        className="relative aspect-video bg-[#060c18] cursor-pointer overflow-hidden"
        onClick={() => videoId && onPlay(videoId, item.title)}
      >
        {item.thumbnail ? (
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-[#060c18] flex items-center justify-center">
            <Play className="w-10 h-10 text-red-500/40" />
          </div>
        )}

        {/* Play overlay */}
        {videoId && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors">
            <div className="w-12 h-12 rounded-full bg-red-600/90 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-200 shadow-lg">
              <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
            </div>
          </div>
        )}

        {/* Channel badge */}
        <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm rounded px-2 py-0.5 text-[10px] text-slate-300">
          {item.author}
        </div>
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-1">
        <p className="text-xs font-medium text-slate-200 line-clamp-2 leading-snug">
          {item.title}
        </p>
        <p className="text-[10px] text-slate-500">{relativeDate(item.publishedAt)}</p>
      </div>
    </div>
  );
}
