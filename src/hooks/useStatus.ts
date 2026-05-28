"use client";

import useSWR from "swr";
import type { StatusData } from "@/lib/types";

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error(`Status ${r.status}`);
    return r.json();
  });

export function useStatus() {
  const { data, error, isLoading } = useSWR<StatusData>(
    "/api/status",
    fetcher,
    {
      revalidateOnFocus: false,
      refreshInterval: 2 * 60_000,
      dedupingInterval: 60_000,
    }
  );

  return {
    status: data ?? null,
    isLoading,
    hasError: !!error,
  };
}
