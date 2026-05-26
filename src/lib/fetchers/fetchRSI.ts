import Parser from "rss-parser";
import type { NewsItem } from "../types";
import { SOURCES, MAX_ITEMS_PER_SOURCE } from "../constants";
import { extractExcerpt, extractFirstImage } from "../utils/normalizeItem";

type RSSItem = {
  title?: string;
  link?: string;
  isoDate?: string;
  pubDate?: string;
  contentSnippet?: string;
  content?: string;
  author?: string;
  enclosure?: { url?: string };
};

const parser = new Parser<Record<string, unknown>, RSSItem>();

export async function fetchRSI(): Promise<NewsItem[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    const feed = await parser.parseURL(SOURCES.rsi.feedUrl!);
    return feed.items.slice(0, MAX_ITEMS_PER_SOURCE).map((item, idx) => ({
      id: `rsi-${encodeURIComponent(item.link ?? String(idx))}`,
      source: "rsi" as const,
      title: item.title ?? "Untitled",
      url: item.link ?? "https://robertsspaceindustries.com/comm-link",
      excerpt: extractExcerpt(item.contentSnippet ?? item.content),
      thumbnail:
        item.enclosure?.url ?? extractFirstImage(item.content) ?? null,
      publishedAt: item.isoDate ?? item.pubDate ?? new Date().toISOString(),
      author: item.author ?? null,
      meta: {},
    }));
  } finally {
    clearTimeout(timeout);
  }
}
