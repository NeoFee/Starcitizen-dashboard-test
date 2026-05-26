import { NextRequest, NextResponse } from "next/server";
import { fetchRSI } from "@/lib/fetchers/fetchRSI";
import { fetchReddit } from "@/lib/fetchers/fetchReddit";
import { fetchWiki } from "@/lib/fetchers/fetchWiki";
import { fetchYouTube } from "@/lib/fetchers/fetchYouTube";
import type { NewsItem, NewsSource, NewsResponse, SourceError } from "@/lib/types";

export const revalidate = 300;

const fetchers: Record<NewsSource, () => Promise<NewsItem[]>> = {
  rsi: fetchRSI,
  reddit: fetchReddit,
  wiki: fetchWiki,
  youtube: fetchYouTube,
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sourceParam = searchParams.get("source");

  const allSources: NewsSource[] = ["rsi", "reddit", "wiki", "youtube"];
  const activeSources =
    sourceParam && sourceParam !== "all" && allSources.includes(sourceParam as NewsSource)
      ? [sourceParam as NewsSource]
      : allSources;

  const results = await Promise.allSettled(
    activeSources.map((src) => fetchers[src]())
  );

  const items: NewsItem[] = [];
  const errors: SourceError[] = [];

  results.forEach((result, idx) => {
    if (result.status === "fulfilled") {
      items.push(...result.value);
    } else {
      errors.push({
        source: activeSources[idx],
        message:
          result.reason instanceof Error
            ? result.reason.message
            : "Fetch failed",
      });
    }
  });

  items.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const response: NewsResponse = {
    items,
    fetchedAt: new Date().toISOString(),
    errors,
  };

  return NextResponse.json(response);
}
