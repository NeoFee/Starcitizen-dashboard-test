"use client";

import { useState } from "react";
import { useNews } from "@/hooks/useNews";
import { useSourceFilter } from "@/hooks/useSourceFilter";
import NewsGrid from "./NewsGrid";
import SourceFilter from "./SourceFilter";
import RefreshButton from "./RefreshButton";
import ErrorBanner from "./ErrorBanner";
import VideoModal from "@/components/streaming/VideoModal";

interface ModalState { videoId: string; title: string }

export default function NewsDashboard() {
  const { filter, setFilter } = useSourceFilter("all");
  const { items, errors, isLoading, fetchedAt, refresh } = useNews(filter);
  const [modal, setModal] = useState<ModalState | null>(null);

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <SourceFilter
          active={filter}
          onChange={setFilter}
          unavailable={errors.map((e) => e.source)}
        />
        <RefreshButton onRefresh={() => refresh()} isLoading={isLoading} fetchedAt={fetchedAt} />
      </div>

      <ErrorBanner errors={errors} />

      <NewsGrid
        items={items}
        isLoading={isLoading}
        onVideoPlay={(videoId, title) => setModal({ videoId, title })}
      />

      {modal && (
        <VideoModal videoId={modal.videoId} title={modal.title} onClose={() => setModal(null)} />
      )}
    </section>
  );
}
