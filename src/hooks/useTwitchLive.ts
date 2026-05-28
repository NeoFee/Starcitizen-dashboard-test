"use client";

import useSWR from "swr";
import type { TwitchLiveResponse } from "@/app/api/twitch/live/route";

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json() as Promise<TwitchLiveResponse>;
  });

export function useTwitchLive() {
  const { data, error, isLoading, mutate } = useSWR<TwitchLiveResponse>(
    "/api/twitch/live",
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60_000,
      refreshInterval: 2 * 60_000,
    }
  );

  return {
    streams: data?.streams ?? [],
    configured: data ? data.configured : true,
    isLoading,
    hasError: !!error,
    refresh: mutate,
  };
}
