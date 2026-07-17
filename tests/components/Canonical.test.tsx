import { vi, describe, it, expect, beforeEach } from 'vitest';
import { createElement } from 'react';
import { render, waitFor } from '@testing-library/react';

// Mock wouter BEFORE importing component
vi.mock('wouter', () => ({
  useLocation: vi.fn(),
}));

import Canonical from '@/components/Canonical';
import { useLocation } from 'wouter';

describe('Canonical Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Clear any existing canonical tags
    document.querySelectorAll('link[rel="canonical"]').forEach(el => el.remove());
  });

  it('should render canonical link with base URL', async () => {
    (useLocation as any).mockReturnValue(['/']);
    
    render(createElement(Canonical));
    
    await waitFor(() => {
      const canonicalLink = document.querySelector('link[rel="canonical"]');
      expect(canonicalLink).toBeTruthy();
      expect(canonicalLink?.getAttribute('href')).toBe('https://talproindia.com/');
    });
  });

  it('should strip query strings from canonical URL', async () => {
    (useLocation as any).mockReturnValue(['/about?foo=bar']);
    
    render(createElement(Canonical));
    
    await waitFor(() => {
      const canonicalLink = document.querySelector('link[rel="canonical"]');
      expect(canonicalLink).toBeTruthy();
      expect(canonicalLink?.getAttribute('href')).toBe('https://talproindia.com/about');
    });
  });

  it('should strip hash fragments from canonical URL', async () => {
    (useLocation as any).mockReturnValue(['/services#pricing']);
    
    render(createElement(Canonical));
    
    await waitFor(() => {
      const canonicalLink = document.querySelector('link[rel="canonical"]');
      expect(canonicalLink).toBeTruthy();
      expect(canonicalLink?.getAttribute('href')).toBe('https://talproindia.com/services');
    });
  });

  it('should render only one canonical link', async () => {
    (useLocation as any).mockReturnValue(['/']);
    
    render(createElement(Canonical));
    
    await waitFor(() => {
      const canonicalLinks = document.querySelectorAll('link[rel="canonical"]');
      expect(canonicalLinks.length).toBe(1);
    });
  });
});
