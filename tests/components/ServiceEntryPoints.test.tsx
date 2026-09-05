import { createElement } from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import BentoGrid from '@/components/BentoGrid';
import Employers from '@/pages/Employers';

vi.mock('framer-motion', async (importOriginal) => ({
  ...await importOriginal<typeof import('framer-motion')>(),
  useInView: () => true,
}));

afterEach(cleanup);

const expectedOffers = [
  ['Technology Talent Solutions', '/services/it-staffing'],
  ['Contract Staffing & Staff Augmentation', '/services/contract-staffing'],
  ['Permanent Hiring', '/services/permanent-hiring'],
  ['Executive Search', '/services/executive-search'],
  ['RPO & Managed Talent Capability', '/services/rpo-managed-talent'],
  ['GCC Advisory & Workforce Launch', '/services/gcc-accelerator'],
] as const;

describe('public service entry points', () => {
  it('names homepage cards for their actual service destinations', () => {
    render(createElement(BentoGrid));

    for (const [name, href] of expectedOffers) {
      expect(screen.getByRole('heading', { name }).closest('a'))
        .toHaveAttribute('href', href);
    }
    expect(screen.getAllByRole('link')).toHaveLength(expectedOffers.length);
  });

  it('uses the same service names on employer links and sends hiring intent as a canonical slug', () => {
    render(createElement(Employers));

    for (const [name, href] of expectedOffers) {
      expect(screen.getByRole('link', { name }))
        .toHaveAttribute('href', href);
    }
    expect(screen.getByRole('link', { name: 'Hire Talent' }))
      .toHaveAttribute('href', '/contact?service=it-staffing');
  });
});
