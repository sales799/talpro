import { Building2 } from "lucide-react";

export function IndustriesGrid({ items }: { items: string[] }) {
  if (!items?.length) return null;
  
  return (
    <div className="grid grid-cols-2 gap-3" data-testid="industries-grid">
      {items.map((i, index) => (
        <div 
          key={i} 
          className="group relative cursor-pointer" 
          data-testid={`industry-item-${index}`}
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-teal-600/20 to-green-600/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
          <div className="relative bg-white/50 dark:bg-slate-700/50 backdrop-blur rounded-xl p-3 border border-slate-200/50 dark:border-slate-600/50 hover:bg-white/80 dark:hover:bg-slate-700/80 transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-green-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium">{i}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
