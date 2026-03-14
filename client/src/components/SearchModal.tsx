import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'wouter';
import { Search, ArrowRight, FileText, Briefcase, Building2, BookOpen, X } from 'lucide-react';
import { search, type SearchItem } from '@/lib/searchIndex';

/**
 * Site-wide search modal triggered by Cmd+K / Ctrl+K.
 *
 * Features:
 * - Fuzzy search via Fuse.js across all pages, services, industries
 * - Keyboard navigation (arrow keys + Enter)
 * - Auto-focus on open, closes on Escape or outside click
 * - Category icons for visual scanning
 */

const categoryIcons: Record<SearchItem['category'], React.ElementType> = {
  page: FileText,
  service: Briefcase,
  industry: Building2,
  resource: BookOpen,
};

const categoryLabels: Record<SearchItem['category'], string> = {
  page: 'Page',
  service: 'Service',
  industry: 'Industry',
  resource: 'Resource',
};

export default function SearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [, navigate] = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  // ─── Global keyboard shortcut ─────────────
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // ─── Auto-focus input on open ─────────────
  useEffect(() => {
    if (open) {
      // Small delay to let animation start
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      setQuery('');
      setResults([]);
      setActiveIndex(0);
    }
  }, [open]);

  // ─── Search as user types ────────────────
  useEffect(() => {
    const r = search(query);
    setResults(r);
    setActiveIndex(0);
  }, [query]);

  // ─── Navigate to result ──────────────────
  const goTo = useCallback(
    (href: string) => {
      setOpen(false);
      navigate(href);
    },
    [navigate],
  );

  // ─── Keyboard navigation ─────────────────
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter' && results[activeIndex]) {
        goTo(results[activeIndex].href);
      }
    },
    [results, activeIndex, goTo],
  );

  // ─── Click outside to close ──────────────
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === backdropRef.current) {
        setOpen(false);
      }
    },
    [],
  );

  if (!open) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-[15vh]"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* ── Search input ── */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search pages, services, industries..."
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-sm outline-none"
          />
          <button
            onClick={() => setOpen(false)}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close search"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ── Results ── */}
        <div className="max-h-[50vh] overflow-y-auto">
          {query.length > 0 && results.length === 0 && (
            <div className="px-4 py-8 text-center text-muted-foreground text-sm">
              No results for "{query}"
            </div>
          )}

          {results.length > 0 && (
            <ul className="py-2" role="listbox">
              {results.map((item, index) => {
                const Icon = categoryIcons[item.category];
                const isActive = index === activeIndex;
                return (
                  <li key={item.href} role="option" aria-selected={isActive}>
                    <button
                      className={`flex items-center gap-3 w-full px-4 py-3 text-left transition-colors ${
                        isActive
                          ? 'bg-accent/10 text-foreground'
                          : 'text-foreground/80 hover:bg-muted/50'
                      }`}
                      onClick={() => goTo(item.href)}
                      onMouseEnter={() => setActiveIndex(index)}
                    >
                      <div
                        className={`p-2 rounded-lg flex-shrink-0 ${
                          isActive
                            ? 'bg-accent text-accent-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {item.title}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {item.description}
                        </p>
                      </div>
                      <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider flex-shrink-0">
                        {categoryLabels[item.category]}
                      </span>
                      {isActive && (
                        <ArrowRight className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          {query.length === 0 && (
            <div className="px-4 py-6 text-center text-muted-foreground text-sm">
              <p>Type to search across the entire site</p>
              <div className="flex items-center justify-center gap-1.5 mt-2 text-xs">
                <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">↑↓</kbd>
                <span>navigate</span>
                <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono ml-2">↵</kbd>
                <span>open</span>
                <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono ml-2">esc</kbd>
                <span>close</span>
              </div>
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="px-4 py-2 border-t border-border flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground">
            {results.length > 0 ? `${results.length} result${results.length !== 1 ? 's' : ''}` : 'Powered by Fuse.js'}
          </span>
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <kbd className="px-1.5 py-0.5 bg-muted rounded font-mono">⌘K</kbd>
            <span>to toggle</span>
          </div>
        </div>
      </div>
    </div>
  );
}
