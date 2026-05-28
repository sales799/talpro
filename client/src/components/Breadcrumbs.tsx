import { Link } from 'wouter';
import { ChevronRight } from 'lucide-react';
import { useEffect } from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

/**
 * Breadcrumbs component with JSON-LD BreadcrumbList schema.
 *
 * Usage:
 * ```tsx
 * <Breadcrumbs items={[
 *   { label: 'Home', href: '/' },
 *   { label: 'Services', href: '/services' },
 *   { label: 'IT Staffing' },
 * ]} />
 * ```
 *
 * The last item (without href) is rendered as the current page.
 */
export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Inject JSON-LD BreadcrumbList schema
  useEffect(() => {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.label,
        ...(item.href ? { item: `https://nirantar.talpro.in${item.href}` } : {}),
      })),
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(jsonLd);
    script.id = 'breadcrumb-jsonld';
    document.head.appendChild(script);

    return () => {
      const existing = document.getElementById('breadcrumb-jsonld');
      if (existing) existing.remove();
    };
  }, [items]);

  return (
    <nav
      aria-label="Breadcrumb"
      className="bg-muted/30 border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <ol className="flex items-center gap-1.5 text-sm">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={i} className="flex items-center gap-1.5">
                {i > 0 && (
                  <ChevronRight className="h-3 w-3 text-muted-foreground/50 shrink-0" />
                )}
                {isLast || !item.href ? (
                  <span className="text-foreground font-medium truncate max-w-[200px]">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors truncate max-w-[200px]"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
