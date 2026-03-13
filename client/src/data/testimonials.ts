/**
 * Client testimonials for the TestimonialCarousel component.
 *
 * Replace placeholder data with real quotes once available.
 * Photo URLs can point to `/assets/testimonials/` or external CDN.
 */

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  company: string;
  /** URL to headshot — optional */
  photo?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'TALPRO delivered three senior backend engineers within a week. Their screening quality saved us months of internal effort.',
    name: 'Arjun Mehta',
    title: 'VP Engineering',
    company: 'FinTech Startup',
  },
  {
    id: 't2',
    quote:
      'We scaled our India GCC from 5 to 45 engineers in under six months. TALPRO handled sourcing, screening, and onboarding end-to-end.',
    name: 'Sarah Chen',
    title: 'Head of Global Talent',
    company: 'US Enterprise SaaS',
  },
  {
    id: 't3',
    quote:
      'The team understood our niche requirement for healthcare-compliant developers and presented spot-on candidates on the first shortlist.',
    name: 'Dr. Priya Sharma',
    title: 'CTO',
    company: 'HealthTech Platform',
  },
  {
    id: 't4',
    quote:
      "What sets TALPRO apart is their speed without compromising quality. Every candidate they've sent us has been interview-ready.",
    name: 'Rohan Kapoor',
    title: 'Director of Engineering',
    company: 'E-commerce Unicorn',
  },
  {
    id: 't5',
    quote:
      'From executive search to contract staffing, TALPRO is our single point of contact for all tech hiring in India. Reliable and fast.',
    name: 'Michael Torres',
    title: 'CHRO',
    company: 'Global Media Corp',
  },
];
