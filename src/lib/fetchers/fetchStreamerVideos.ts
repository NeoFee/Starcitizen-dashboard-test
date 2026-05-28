import Parser from "rss-parser";
import { YOUTUBE_CHANNELS } from "../streamers";
import type { NewsItem } from "../types";
import { MAX_ITEMS_PER_SOURCE } from "../constants";

type YTItem = {
  title?: string;
  link?: string;
  isoDate?: string;
  author?: string;
  "yt:videoId"?: string;
  "media:group"?: {
    "media:thumbnail"?: Array<{ $: { url: string } }>;
    "media:description"?: Array<{ _: string }>;
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

export async function fetchStreamerVideos(channelId?: string): Promise<NewsItem[]> {
  const channels = channelId
    ? YOUTUBE_CHANNELS.filter((c) => c.channelId === channelId)
    : YOUTUBE_CHANNELS;

  const results = await Promise.allSettled(
    channels.map(async (ch) => {
      const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${ch.channelId}`;
      const feed = await parser.parseURL(url);
      return feed.items.slice(0, 6).map((item): NewsItem => {
        const videoId = item["yt:videoId"] ?? "";
        const mediaGroup = item["media:group"];
        const thumbnail =
          mediaGroup?.["media:thumbnail"]?.[0]?.$.url ??
          (videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : null);
        const description = mediaGroup?.["media:description"]?.[0]?._ ?? null;

        return {
          id: `yt-streamer-${ch.id}-${videoId}`,
          source: "youtube",
          title: item.title ?? "Untitled",
          url: videoId
            ? `https://www.youtube.com/watch?v=${videoId}`
            : item.link ?? "",
          excerpt: description ? description.slice(0, 200) : null,
          thumbnail,
          publishedAt: item.isoDate ?? new Date().toISOString(),
          author: ch.name,
          meta: {
            videoId: videoId || undefined,
          },
        };
      });
    })
  );

  const items: NewsItem[] = [];
  for (const r of results) {
    if (r.status === "fulfilled") items.push(...r.value);
  }

  return items
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, MAX_ITEMS_PER_SOURCE * 2);
}
