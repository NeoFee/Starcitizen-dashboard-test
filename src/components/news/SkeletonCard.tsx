export default function SkeletonCard() {
  return (
    <div className="rounded-lg border border-[#1a2332] bg-[#0a0f1a] overflow-hidden animate-pulse">
      <div className="aspect-video bg-[#111827]" />
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-4 w-12 rounded bg-[#1a2332]" />
          <div className="h-3 w-20 rounded bg-[#1a2332]" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-[#1a2332]" />
          <div className="h-4 w-4/5 rounded bg-[#1a2332]" />
        </div>
        <div className="space-y-1.5">
          <div className="h-3 w-full rounded bg-[#111827]" />
          <div className="h-3 w-3/4 rounded bg-[#111827]" />
        </div>
      </div>
    </div>
  );
}
