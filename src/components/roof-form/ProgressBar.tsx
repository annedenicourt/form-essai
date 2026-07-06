export function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[11px] font-medium uppercase tracking-wider text-white/70">
          Étape {current}/{total}
        </span>
        <span className="text-[11px] text-white/60">{Math.round((current / total) * 100)}%</span>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i < current ? "bg-brand-orange" : "bg-white/15"}`} />
        ))}
      </div>
    </div>
  );
}
