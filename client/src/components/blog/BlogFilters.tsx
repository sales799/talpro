import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface BlogFiltersProps {
  categories: string[];
  tags: string[];
  selectedCategory: string | null;
  selectedTags: string[];
  onCategorySelect: (category: string | null) => void;
  onTagToggle: (tag: string) => void;
  onClearAll: () => void;
}

export default function BlogFilters({
  categories,
  tags,
  selectedCategory,
  selectedTags,
  onCategorySelect,
  onTagToggle,
  onClearAll,
}: BlogFiltersProps) {
  const hasFilters = selectedCategory || selectedTags.length > 0;

  return (
    <div className="mb-8 space-y-6">
      {categories.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 text-foreground">Categories</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={!selectedCategory ? "default" : "outline"}
              size="sm"
              onClick={() => onCategorySelect(null)}
              data-testid="button-category-all"
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => onCategorySelect(category)}
                data-testid={`button-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      )}

      {tags.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 text-foreground">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => onTagToggle(tag)}
                data-testid={`badge-tag-${tag.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="flex items-center gap-2"
          data-testid="button-clear-filters"
        >
          <X className="w-4 h-4" />
          Clear all filters
        </Button>
      )}
    </div>
  );
}
