/**
 * Proof-category labels for the LogoTicker component on the homepage.
 *
 * Each entry uses the company name as alt text. Logo images should be
 * placed in `client/src/assets/clients/` as transparent PNGs (or SVGs).
 * Until real logos are added, the ticker renders text-only placeholders.
 */

export interface ClientLogo {
  name: string;
  /** Path to logo image. Leave empty to render a text placeholder. */
  logo?: string;
}

export const clients: ClientLogo[] = [
  { name: 'FinTech engineering' },
  { name: 'Enterprise SaaS' },
  { name: 'India GCCs' },
  { name: 'Cloud platforms' },
  { name: 'Data teams' },
  { name: 'Healthcare tech' },
  { name: 'E-commerce scaleups' },
  { name: 'Sales technology' },
  { name: 'Manufacturing IT' },
  { name: 'Executive search' },
];
