"use client";

import { useState } from "react";
import { Tv, ExternalLink, X } from "lucide-react";
const Twitch = Tv;
import { TWITCH_STREAMERS } from "@/lib/streamers";

interface EmbedState { login: string; displayName: string }

export default function TwitchSection() {
  const [embed, setEmbed] = useState<EmbedState | null>(null);

  const parentDomain =
    typeof window !== "undefined" ? window.location.hostname : "localhost";

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded border border-purple-500/30 bg-purple-500/10">
            <Twitch className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <h2
              className="text-base font-bold tracking-widest text-purple-400 uppercase"
              style={{ fontFamily: "Orbitron, monospace" }}
            >
              Live Streams
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Star Citizen auf Twitch — beliebte Streamer
            </p>
          </div>
        </div>

        <a
          href="https://www.twitch.tv/directory/game/Star%20Citizen"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 border border-purple-700/40 rounded px-3 py-1.5 hover:border-purple-500/60 transition-colors bg-purple-900/20"
        >
          <Twitch className="w-3.5 h-3.5" />
          Alle SC Streams
          <ExternalLink className="w-3 h-3 opacity-60" />
        </a>
      </div>

      {/* Embedded player */}
      {embed && (
        <div className="mb-6 rounded-lg border border-purple-700/40 bg-[#0a0414] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-purple-700/30">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-sm font-medium text-slate-200">{embed.displayName}</span>
              <span className="text-xs text-slate-500">live auf Twitch</span>
            </div>
            <button
              onClick={() => setEmbed(null)}
              className="p-1 text-slate-500 hover:text-white hover:bg-white/10 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://player.twitch.tv/?channel=${embed.login}&parent=${parentDomain}`}
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Streamer grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {TWITCH_STREAMERS.map((streamer) => (
          <div
            key={streamer.id}
            className="group flex flex-col items-center gap-2.5 rounded-lg border border-[#1a2332] bg-[#0a0f1a] p-4 hover:border-purple-500/40 hover:bg-[#0d0a18] transition-all duration-200 text-center"
          >
            {/* Avatar */}
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold border transition-all duration-200 group-hover:scale-105"
              style={{
                backgroundColor: streamer.accentColor + "22",
                color: streamer.accentColor,
                borderColor: streamer.accentColor + "44",
              }}
            >
              {streamer.avatarLetter}
            </div>

            <div className="min-w-0 w-full">
              <p className="text-xs font-semibold text-slate-200 truncate group-hover:text-white">
                {streamer.displayName}
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-2 leading-snug">
                {streamer.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-1.5 w-full mt-auto">
              <button
                onClick={() => setEmbed({ login: streamer.login, displayName: streamer.displayName })}
                className="flex-1 flex items-center justify-center gap-1 rounded py-1 text-[10px] font-medium bg-purple-900/40 text-purple-300 border border-purple-700/40 hover:bg-purple-900/70 hover:text-purple-200 transition-colors"
              >
                <Twitch className="w-3 h-3" /> Einbetten
              </button>
              <a
                href={`https://www.twitch.tv/${streamer.login}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 rounded border border-[#1a2332] text-slate-500 hover:text-slate-300 hover:border-slate-600 transition-colors"
                title="Auf Twitch öffnen"
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
