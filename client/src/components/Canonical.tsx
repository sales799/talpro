import { useLocation } from 'wouter';
import { useCanonicalHead } from './DocumentHead';

const BASE_URL = 'https://talproindia.com';
const ENFORCE_TRAILING_SLASH = false;

export default function Canonical() {
  const [location] = useLocation();
  
  // Strip query strings and fragments
  let pathname = location.split('?')[0].split('#')[0] || '/';
  
  // Enforce trailing slash if needed (currently disabled)
  if (ENFORCE_TRAILING_SLASH && pathname !== '/' && !pathname.endsWith('/')) {
    pathname += '/';
  }
  
  // Build absolute canonical URL
  const href = new URL(pathname, BASE_URL).toString();
  useCanonicalHead(href);
  return null;
}
