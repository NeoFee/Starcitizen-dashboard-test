"use client";

import { useState } from "react";
import useSWR from "swr";
import { Play as Youtube } from "lucide-react";
import { YOUTUBE_CHANNELS } from "@/lib/streamers";
import type { NewsResponse } from "@/lib/types";
import StreamerVideoCard from "./StreamerVideoCard";
import VideoModal from "./VideoModal";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

interface ModalState { videoId: string; title: string }

export default function StreamersSection() {
  const [activeChannel, setActiveChannel] = useState<string>("all");
  const [modal, setModal] = useState<ModalState | null>(null);

  const url =
    activeChannel === "all"
      ? "/api/streamers"
      : `/api/streamers?channel=${activeChannel}`;

  const { data, isLoading } = useSWR<NewsResponse>(url, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 120_000,
  });

  const items = data?.items ?? [];

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-8 h-8 rounded border border-red-500/30 bg-red-500/10">
          <Youtube className="w-4 h-4 text-red-400" />
        </div>
        <div>
          <h2
            className="text-base font-bold tracking-widest text-red-400 uppercase"
            style={{ fontFamily: "Orbitron, monospace" }}
          >
            Content Creator
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Neueste Videos aus der Star Citizen Community
          </p>
        </div>
      </div>

      {/* Channel filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
        <button
          onClick={() => setActiveChannel("all")}
          className={`flex-shrink-0 rounded px-3 py-1.5 text-xs font-medium border transition-all duration-200 ${
            activeChannel === "all"
              ? "bg-red-600 text-white border-red-600"
              : "bg-transparent text-slate-400 border-[#1a2332] hover:border-slate-600 hover:text-slate-200"
          }`}
        >
          Alle Kanäle
        </button>
        {YOUTUBE_CHANNELS.map((ch) => (
          <button
            key={ch.id}
            onClick={() => setActiveChannel(ch.channelId)}
            className={`flex-shrink-0 flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-medium border transition-all duration-200 ${
              activeChannel === ch.channelId
                ? "bg-[#1a0a0a] text-white border-red-500/60"
                : "bg-transparent text-slate-400 border-[#1a2332] hover:border-slate-600 hover:text-slate-200"
            }`}
          >
            <span
              className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold flex-shrink-0"
              style={{ backgroundColor: ch.accentColor + "33", color: ch.accentColor, border: `1px solid ${ch.accentColor}55` }}
            >
              {ch.avatarLetter.charAt(0)}
            </span>
            {ch.name}
          </button>
        ))}
      </div>

      {/* Video grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="rounded-lg bg-[#0a0f1a] border border-[#1a2332] overflow-hidden animate-pulse">
              <div className="aspect-video bg-[#141e2e]" />
              <div className="p-3 space-y-1.5">
                <div className="h-3 bg-[#141e2e] rounded w-full" />
                <div className="h-3 bg-[#141e2e] rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-slate-500 text-sm">
          Keine Videos geladen.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {items.map((item) => (
            <StreamerVideoCard
              key={item.id}
              item={item}
              onPlay={(videoId, title) => setModal({ videoId, title })}
            />
          ))}
        </div>
      )}

      {/* Video Modal */}
      {modal && (
        <VideoModal
          videoId={modal.videoId}
          title={modal.title}
          onClose={() => setModal(null)}
        />
      )}
    </section>
  );
}
