/**
 * Representative hiring outcomes for the TestimonialCarousel component.
 * Replace with named client quotes only after explicit approval.
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
      'Three senior backend profiles were ready for review within the first week, with screening notes detailed enough for engineering to move fast.',
    name: 'Engineering Leader',
    title: 'Representative outcome',
    company: 'FinTech scaleup',
  },
  {
    id: 't2',
    quote:
      'A founding GCC pod moved from role brief to interview slate without the usual cold-start delay across platform, QA, and data roles.',
    name: 'Talent Head',
    title: 'Representative outcome',
    company: 'US enterprise SaaS',
  },
  {
    id: 't3',
    quote:
      'Niche healthcare-compliant engineering requirements were translated into a focused shortlist instead of a high-volume resume dump.',
    name: 'Technology Director',
    title: 'Representative outcome',
    company: 'HealthTech platform',
  },
  {
    id: 't4',
    quote:
      'The useful difference was speed without spray-and-pray sourcing: fewer profiles, clearer fit, and faster interviewer alignment.',
    name: 'Hiring Manager',
    title: 'Representative outcome',
    company: 'E-commerce team',
  },
  {
    id: 't5',
    quote:
      'Contract staffing and leadership search stayed under one operating rhythm, which made approvals, communication, and replacement cover simpler.',
    name: 'People Leader',
    title: 'Representative outcome',
    company: 'Global media group',
  },
];
