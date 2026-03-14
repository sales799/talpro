import Fuse from 'fuse.js';
import { services } from '@/config/services';
import { getIndustrySlugs, getIndustryConfig } from '@/pages/industries/config';

/**
 * Unified search index for site-wide Cmd+K search.
 *
 * Each entry has a title, description, href, and category.
 * Fuse.js performs fuzzy matching on title + description.
 */

export interface SearchItem {
  title: string;
  description: string;
  href: string;
  category: 'page' | 'service' | 'industry' | 'resource';
}

function buildSearchItems(): SearchItem[] {
  const items: SearchItem[] = [];

  // ── Static pages ──
  items.push(
    { title: 'Home', description: 'TalPro India homepage — IT staffing partner', href: '/', category: 'page' },
    { title: 'About Us', description: 'Our story, mission, and leadership team', href: '/about', category: 'page' },
    { title: 'Services', description: 'All staffing and recruitment services', href: '/services', category: 'page' },
    { title: 'Industries', description: 'Industries we serve across India', href: '/industries', category: 'page' },
    { title: 'Case Studies', description: 'Client success stories and results', href: '/case-studies', category: 'page' },
    { title: 'Blog & Insights', description: 'IT hiring trends, salary data, and recruitment tips', href: '/blog', category: 'page' },
    { title: 'Contact', description: 'Get in touch — free consultation', href: '/contact', category: 'page' },
    { title: 'Careers', description: 'Join the TalPro team', href: '/careers', category: 'page' },
    { title: 'How We Work', description: 'Our recruitment process and methodology', href: '/how-we-work', category: 'page' },
    { title: 'For Candidates', description: 'Find your next tech role — submit your CV', href: '/for-candidates', category: 'page' },
  );

  // ── Services ──
  for (const svc of services) {
    items.push({
      title: svc.name,
      description: svc.overview,
      href: `/services/${svc.slug}`,
      category: 'service',
    });
  }

  // ── Industries ──
  for (const slug of getIndustrySlugs()) {
    const config = getIndustryConfig(slug);
    if (config) {
      items.push({
        title: config.name,
        description: config.tagline,
        href: `/industries/${slug}`,
        category: 'industry',
      });
    }
  }

  // ── Resources ──
  items.push(
    { title: 'Salary Guide', description: 'IT salary benchmarks across Indian cities', href: '/salary-guide', category: 'resource' },
    { title: 'Privacy Policy', description: 'How we handle your data', href: '/privacy-policy', category: 'resource' },
    { title: 'Terms of Service', description: 'Terms and conditions', href: '/terms-of-service', category: 'resource' },
  );

  return items;
}

// Singleton Fuse instance — built once, reused across searches
let fuseInstance: Fuse<SearchItem> | null = null;
let searchItems: SearchItem[] = [];

function getFuse(): Fuse<SearchItem> {
  if (!fuseInstance) {
    searchItems = buildSearchItems();
    fuseInstance = new Fuse(searchItems, {
      keys: [
        { name: 'title', weight: 0.7 },
        { name: 'description', weight: 0.3 },
      ],
      threshold: 0.35,
      includeScore: true,
      minMatchCharLength: 2,
    });
  }
  return fuseInstance;
}

export function search(query: string): SearchItem[] {
  if (!query.trim()) return [];
  const fuse = getFuse();
  return fuse.search(query, { limit: 8 }).map((r) => r.item);
}

export function getAllItems(): SearchItem[] {
  getFuse(); // ensure built
  return searchItems;
}
