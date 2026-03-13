export function StatsStrip({
  stats,
}: {
  stats?: { value: string; label: string }[];
}) {
  if (!stats?.length) return null;
  return (
    <div
      className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
      data-testid="stats-strip"
    >
      {stats.map((s, index) => (
        <div
          key={s.label}
          className="bg-background border border-border rounded-2xl p-6 text-center hover:shadow-md transition-all"
          data-testid={`stat-item-${index}`}
        >
          <div
            className="text-4xl font-bold text-[hsl(38,92%,50%)] mb-2"
            data-testid={`stat-value-${index}`}
          >
            {s.value}
          </div>
          <div
            className="text-sm text-muted-foreground font-medium"
            data-testid={`stat-label-${index}`}
          >
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
