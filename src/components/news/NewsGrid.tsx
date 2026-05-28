import type { NewsItem } from "@/lib/types";
import NewsCard from "./NewsCard";
import SkeletonCard from "./SkeletonCard";

interface Props {
  items: NewsItem[];
  isLoading: boolean;
  onVideoPlay?: (videoId: string, title: string) => void;
}

export default function NewsGrid({ items, isLoading, onVideoPlay }: Props) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-slate-600">
        <svg
          viewBox="0 0 24 24"
          className="w-10 h-10 mb-3 opacity-30"
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
          />
        </svg>
        <p className="text-sm">Keine Nachrichten gefunden</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map((item) => (
        <NewsCard key={item.id} item={item} onVideoPlay={onVideoPlay} />
      ))}
    </div>
  );
}
