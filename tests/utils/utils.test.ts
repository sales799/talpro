import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('Utils', () => {
  describe('cn (className merger)', () => {
    it('should merge class names correctly', () => {
      const result = cn('class1', 'class2');
      expect(result).toBe('class1 class2');
    });

    it('should handle conditional classes', () => {
      const result = cn('base', true && 'conditional', false && 'excluded');
      expect(result).toBe('base conditional');
    });

    it('should merge tailwind classes without conflicts', () => {
      const result = cn('px-4 py-2', 'px-6');
      expect(result).toBe('py-2 px-6');
    });

    it('should handle empty inputs', () => {
      const result = cn();
      expect(result).toBe('');
    });

    it('should handle undefined and null values', () => {
      const result = cn('class1', undefined, null, 'class2');
      expect(result).toBe('class1 class2');
    });
  });
});
