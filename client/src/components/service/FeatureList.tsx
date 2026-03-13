import { Check } from "lucide-react";

export function FeatureList({ items }: { items: string[] }) {
  if (!items?.length) return null;
  return (
    <ul className="space-y-4" data-testid="feature-list">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-3 group cursor-pointer"
          data-testid={`feature-item-${i}`}
        >
          <div className="mt-0.5 w-6 h-6 bg-[hsl(160,84%,39%)] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
            <Check className="h-4 w-4 text-white" />
          </div>
          <span className="text-base leading-6 group-hover:text-foreground transition-colors">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
