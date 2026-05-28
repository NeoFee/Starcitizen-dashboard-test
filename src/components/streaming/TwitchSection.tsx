"use client";

import { useState } from "react";
import Image from "next/image";
import { Tv, ExternalLink, X, Eye, Radio, Settings } from "lucide-react";
const Twitch = Tv;
import { useTwitchLive } from "@/hooks/useTwitchLive";

interface EmbedState { login: string; displayName: string }

function SkeletonCard() {
  return (
    <div className="rounded-lg border border-[#1a2332] bg-[#0a0f1a] overflow-hidden animate-pulse">
      <div className="aspect-video bg-slate-800/40" />
      <div className="p-3 flex flex-col gap-2">
        <div className="h-3 bg-slate-700/50 rounded w-3/4" />
        <div className="h-2.5 bg-slate-800/50 rounded w-full" />
        <div className="h-2.5 bg-slate-800/50 rounded w-2/3" />
      </div>
    </div>
  );
}

function SetupNotice() {
  return (
    <div className="rounded-lg border border-purple-700/30 bg-purple-900/10 p-6 text-center">
      <Settings className="w-8 h-8 text-purple-400/40 mx-auto mb-3" />
      <h3 className="text-sm font-semibold text-slate-300 mb-2">
        Twitch API-Zugangsdaten fehlen
      </h3>
      <p className="text-xs text-slate-500 mb-4 max-w-md mx-auto leading-relaxed">
        Für Live-Stream-Daten werden Twitch-API-Zugangsdaten benötigt.
        Erstelle eine App auf{" "}
        <a
          href="https://dev.twitch.tv/console"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-400 hover:text-purple-300 underline"
        >
          dev.twitch.tv
        </a>{" "}
        und setze die Umgebungsvariablen:
      </p>
      <div className="inline-block text-left bg-[#0a0f1a] border border-[#1a2332] rounded-lg p-3 text-xs font-mono text-slate-400">
        <div>
          TWITCH_CLIENT_ID=<span className="text-purple-400">dein_client_id</span>
        </div>
        <div>
          TWITCH_CLIENT_SECRET=<span className="text-purple-400">dein_client_secret</span>
        </div>
      </div>
    </div>
  );
}

function formatViewers(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

export default function TwitchSection() {
  const [embed, setEmbed] = useState<EmbedState | null>(null);
  const { streams, configured, isLoading } = useTwitchLive();

  const parentDomain =
    typeof window !== "undefined" ? window.location.hostname : "localhost";

  const subtitle = !configured
    ? "API nicht konfiguriert"
    : isLoading
    ? "Lade Live-Streams …"
    : streams.length > 0
    ? `${streams.length} Streams gerade live`
    : "Aktuell keine Streams live";

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
            <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
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
              <span className="text-sm font-medium text-slate-200">
                {embed.displayName}
              </span>
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
              sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Main content */}
      {!configured ? (
        <SetupNotice />
      ) : isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : streams.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-slate-600">
          <Radio className="w-8 h-8 mb-3 opacity-30" />
          <p className="text-sm">Aktuell keine Star Citizen Streams live</p>
          <a
            href="https://www.twitch.tv/directory/game/Star%20Citizen"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 text-xs text-purple-400 hover:text-purple-300 underline"
          >
            Alle SC Streams auf Twitch ansehen
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {streams.map((stream) => (
            <div
              key={stream.login}
              className="group flex flex-col rounded-lg border border-[#1a2332] bg-[#0a0f1a] overflow-hidden hover:border-purple-500/40 transition-all duration-200"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-slate-900 overflow-hidden">
                <Image
                  src={stream.thumbnailUrl}
                  alt={stream.displayName}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
                {/* Live badge */}
                <div className="absolute top-2 left-2 flex items-center gap-1 bg-red-600 rounded px-1.5 py-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span className="text-[9px] font-bold text-white uppercase tracking-wider">
                    Live
                  </span>
                </div>
                {/* Viewer count */}
                <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/70 rounded px-1.5 py-0.5 backdrop-blur-sm">
                  <Eye className="w-2.5 h-2.5 text-slate-300" />
                  <span className="text-[10px] text-slate-300">
                    {formatViewers(stream.viewerCount)}
                  </span>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>

              {/* Info */}
              <div className="p-2.5 flex flex-col gap-1 flex-1">
                <p className="text-xs font-semibold text-slate-200 truncate group-hover:text-white">
                  {stream.displayName}
                </p>
                <p className="text-[10px] text-slate-500 line-clamp-2 leading-snug">
                  {stream.title}
                </p>
              </div>

              {/* Actions */}
              <div className="px-2.5 pb-2.5 flex gap-1.5">
                <button
                  onClick={() =>
                    setEmbed({ login: stream.login, displayName: stream.displayName })
                  }
                  className="flex-1 flex items-center justify-center gap-1 rounded py-1 text-[10px] font-medium bg-purple-900/40 text-purple-300 border border-purple-700/40 hover:bg-purple-900/70 hover:text-purple-200 transition-colors"
                >
                  <Twitch className="w-3 h-3" /> Einbetten
                </button>
                <a
                  href={`https://www.twitch.tv/${stream.login}`}
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
      )}
    </section>
  );
}
