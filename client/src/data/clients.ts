/**
 * Client logos for the LogoTicker component on the homepage.
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
  { name: 'Flipkart' },
  { name: 'Swiggy' },
  { name: 'Razorpay' },
  { name: 'PhonePe' },
  { name: 'CRED' },
  { name: 'Zomato' },
  { name: 'Amazon' },
  { name: 'Airtel' },
  { name: 'OYO' },
  { name: 'Freshworks' },
  { name: 'Meesho' },
  { name: 'Zerodha' },
  { name: 'Postman' },
  { name: 'Groww' },
  { name: 'upGrad' },
];
