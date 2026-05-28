import type { NewsSource } from "./types";

export const SOURCES: Record<
  NewsSource,
  {
    label: string;
    shortLabel: string;
    badgeClass: string;
    borderClass: string;
    glowColor: string;
    feedUrl?: string;
    apiUrl?: string;
  }
> = {
  rsi: {
    label: "RSI Comm-Link",
    shortLabel: "RSI",
    badgeClass: "bg-cyan-500 text-black",
    borderClass: "border-cyan-500",
    glowColor: "rgba(0,212,255,0.3)",
    feedUrl: "https://leonick.se/feeds/rsi/atom",
  },
  reddit: {
    label: "r/starcitizen",
    shortLabel: "Reddit",
    badgeClass: "bg-orange-500 text-white",
    borderClass: "border-orange-500",
    glowColor: "rgba(249,115,22,0.3)",
    feedUrl: "https://www.reddit.com/r/starcitizen/.json",
  },
  wiki: {
    label: "SC Wiki",
    shortLabel: "Wiki",
    badgeClass: "bg-violet-600 text-white",
    borderClass: "border-violet-500",
    glowColor: "rgba(139,92,246,0.3)",
    apiUrl: "https://api.star-citizen.wiki/api/v2/comm-links",
  },
  youtube: {
    label: "YouTube",
    shortLabel: "YouTube",
    badgeClass: "bg-red-600 text-white",
    borderClass: "border-red-500",
    glowColor: "rgba(239,68,68,0.3)",
    feedUrl:
      "https://www.youtube.com/feeds/videos.xml?channel_id=UCTeLqJq1mXUX5WWoNXLmOIA",
  },
};

export const STATUS_URLS = {
  rss: "https://status.robertsspaceindustries.com/index.xml",
  status: "https://status.robertsspaceindustries.com/api/v2/status.json",
  components: "https://status.robertsspaceindustries.com/api/v2/components.json",
};

export const MAX_ITEMS_PER_SOURCE = 15;
export const EXCERPT_MAX_LENGTH = 220;
export const ISR_NEWS_SECONDS = 300;
export const ISR_STATUS_SECONDS = 120;
