import Parser from "rss-parser";
import type { NewsItem } from "../types";
import { SOURCES, MAX_ITEMS_PER_SOURCE } from "../constants";
import { extractExcerpt } from "../utils/normalizeItem";

type YTItem = {
  title?: string;
  link?: string;
  isoDate?: string;
  author?: string;
  "yt:videoId"?: string;
  "media:group"?: {
    "media:thumbnail"?: [{ $: { url: string } }];
    "media:description"?: [{ _: string }];
  };
};

const parser = new Parser<Record<string, unknown>, YTItem>({
  customFields: {
    item: [
      ["yt:videoId", "yt:videoId"],
      ["media:group", "media:group"],
    ],
  },
});

export async function fetchYouTube(): Promise<NewsItem[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);
  let feed: Awaited<ReturnType<typeof parser.parseURL>>;
  try {
    feed = await parser.parseURL(SOURCES.youtube.feedUrl!);
  } finally {
    clearTimeout(timeout);
  }

  return feed.items.slice(0, MAX_ITEMS_PER_SOURCE).map((item) => {
    const videoId =
      (item["yt:videoId"] as string | undefined) ?? "";
    const mediaGroup = item["media:group"] as YTItem["media:group"] | undefined;
    const thumbnail = mediaGroup?.["media:thumbnail"]?.[0]?.$.url ?? null;
    const rawDesc = mediaGroup?.["media:description"]?.[0]?._ ?? null;

    return {
      id: `youtube-${videoId || encodeURIComponent(item.link ?? Math.random().toString())}`,
      source: "youtube" as const,
      title: item.title ?? "Untitled Video",
      url: videoId
        ? `https://www.youtube.com/watch?v=${videoId}`
        : (item.link ?? "https://youtube.com"),
      excerpt: extractExcerpt(rawDesc),
      thumbnail,
      publishedAt: item.isoDate ?? new Date().toISOString(),
      author: item.author ?? "Star Citizen",
      meta: { videoId: videoId || undefined },
    };
  });
}
