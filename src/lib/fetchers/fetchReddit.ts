import type { NewsItem } from "../types";
import { SOURCES, MAX_ITEMS_PER_SOURCE } from "../constants";
import { extractExcerpt } from "../utils/normalizeItem";

interface RedditChild {
  data: {
    id: string;
    title: string;
    permalink: string;
    url: string;
    selftext: string;
    created_utc: number;
    author: string;
    score: number;
    num_comments: number;
    thumbnail: string;
    link_flair_text: string | null;
    preview?: {
      images: Array<{ source: { url: string } }>;
    };
    is_video: boolean;
  };
}

export async function fetchReddit(): Promise<NewsItem[]> {
  const res = await fetch(
    `${SOURCES.reddit.feedUrl}?limit=${MAX_ITEMS_PER_SOURCE}&raw_json=1`,
    {
      headers: {
        "User-Agent": "StarCitizenDashboard/1.0",
        Accept: "application/json",
      },
      next: { revalidate: 300 },
    }
  );

  if (!res.ok) throw new Error(`Reddit fetch failed: ${res.status}`);

  const json = await res.json();
  const children: RedditChild[] = json?.data?.children ?? [];

  return children.map((child): NewsItem => {
    const d = child.data;
    const previewUrl = d.preview?.images?.[0]?.source?.url?.replace(
      /&amp;/g,
      "&"
    );
    const isValidThumb =
      d.thumbnail &&
      !["self", "default", "nsfw", "spoiler", "", "image"].includes(
        d.thumbnail
      );
    const thumbnail = previewUrl ?? (isValidThumb ? d.thumbnail : null);

    return {
      id: `reddit-${d.id}`,
      source: "reddit",
      title: d.title,
      url: `https://reddit.com${d.permalink}`,
      excerpt: d.selftext ? extractExcerpt(d.selftext) : null,
      thumbnail,
      publishedAt: new Date(d.created_utc * 1000).toISOString(),
      author: d.author,
      meta: {
        score: d.score,
        numComments: d.num_comments,
        flair: d.link_flair_text ?? undefined,
      },
    };
  });
}
