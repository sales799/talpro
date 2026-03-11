import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface BlogSearchProps {
  value: string;
  onChange: (query: string) => void;
}

export default function BlogSearch({ value, onChange }: BlogSearchProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-xl mx-auto mb-8">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search blog posts..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-12 pr-12 h-12 text-lg"
          data-testid="input-blog-search"
        />
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2"
            data-testid="button-clear-search"
          >
            <X className="w-5 h-5" />
          </Button>
        )}
      </div>
    </form>
  );
}
