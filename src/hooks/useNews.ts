"use client";

import useSWR from "swr";
import type { NewsResponse, FilterState } from "@/lib/types";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useNews(filter: FilterState) {
  const url = filter === "all" ? "/api/news" : `/api/news?source=${filter}`;

  const { data, error, isLoading, mutate } = useSWR<NewsResponse>(
    url,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60_000,
      refreshInterval: 5 * 60_000,
    }
  );

  return {
    items: data?.items ?? [],
    errors: data?.errors ?? [],
    fetchedAt: data?.fetchedAt,
    isLoading,
    hasError: !!error,
    refresh: mutate,
  };
}
