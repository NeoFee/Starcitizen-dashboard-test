import type { NewsItem } from "../types";
import { SOURCES, MAX_ITEMS_PER_SOURCE } from "../constants";

interface WikiCommLink {
  id: number;
  title: string;
  url: string;
  images?: Array<{ url: string }>;
  created_at: string;
  category?: { name: string };
  series?: { name: string };
}

export async function fetchWiki(): Promise<NewsItem[]> {
  const res = await fetch(
    `${SOURCES.wiki.apiUrl}?limit=${MAX_ITEMS_PER_SOURCE}&page=1`,
    { next: { revalidate: 300 } }
  );

  if (!res.ok) throw new Error(`Wiki fetch failed: ${res.status}`);

  const json = await res.json();
  const items: WikiCommLink[] = json?.data ?? [];

  return items.map((item): NewsItem => {
    const seriesName = item.series?.name;
    const categoryName = item.category?.name;
    const excerpt = seriesName
      ? `${seriesName}${categoryName ? ` · ${categoryName}` : ""}`
      : (categoryName ?? null);

    return {
      id: `wiki-${item.id}`,
      source: "wiki",
      title: item.title,
      url: item.url,
      excerpt,
      thumbnail: item.images?.[0]?.url ?? null,
      publishedAt: item.created_at,
      author: null,
      meta: {
        wikiCategory: categoryName,
      },
    };
  });
}
