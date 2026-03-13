import { Building2 } from "lucide-react";

export function IndustriesGrid({ items }: { items: string[] }) {
  if (!items?.length) return null;
  return (
    <div className="grid grid-cols-2 gap-3" data-testid="industries-grid">
      {items.map((item, index) => (
        <div
          key={item}
          className="group cursor-pointer"
          data-testid={`industry-item-${index}`}
        >
          <div className="bg-muted/50 rounded-xl p-3 border border-border hover:bg-muted transition-all">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[hsl(222,47%,11%)] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium">{item}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
