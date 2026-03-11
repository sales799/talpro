export function StatsStrip({
  stats
}: {
  stats?: { value: string; label: string }[];
}) {
  if (!stats?.length) return null;
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12" data-testid="stats-strip">
      {stats.map((s, index) => (
        <div
          key={s.label}
          className="group relative"
          data-testid={`stat-item-${index}`}
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-teal-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
          <div className="stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 relative text-center hover:scale-105 transition-all duration-300">
            <div 
              className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-2" 
              data-testid={`stat-value-${index}`}
            >
              {s.value}
            </div>
            <div className="text-sm text-muted-foreground font-medium" data-testid={`stat-label-${index}`}>
              {s.label}
            </div>
            <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-teal-500 rounded-full animate-progress-pulse" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
