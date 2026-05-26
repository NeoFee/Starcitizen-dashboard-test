"use client";

import { useNews } from "@/hooks/useNews";
import { useSourceFilter } from "@/hooks/useSourceFilter";
import NewsGrid from "./NewsGrid";
import SourceFilter from "./SourceFilter";
import RefreshButton from "./RefreshButton";
import ErrorBanner from "./ErrorBanner";

export default function NewsDashboard() {
  const { filter, setFilter } = useSourceFilter("all");
  const { items, errors, isLoading, fetchedAt, refresh } = useNews(filter);

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <SourceFilter active={filter} onChange={setFilter} />
        <RefreshButton
          onRefresh={() => refresh()}
          isLoading={isLoading}
          fetchedAt={fetchedAt}
        />
      </div>

      {/* Error banner */}
      <ErrorBanner errors={errors} />

      {/* News grid */}
      <NewsGrid items={items} isLoading={isLoading} />
    </section>
  );
}
