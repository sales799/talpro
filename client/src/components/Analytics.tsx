import { useEffect } from 'react';
import { useLocation } from 'wouter';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export default function Analytics() {
  const [location] = useLocation();
  const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) {
      console.log('[Analytics] GA4 not configured (no VITE_GA_MEASUREMENT_ID)');
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      send_page_view: false,
    });

    console.log('[Analytics] GA4 initialized:', GA_MEASUREMENT_ID);

    return () => {
      const scripts = document.querySelectorAll(`script[src*="googletagmanager"]`);
      scripts.forEach((s) => s.remove());
    };
  }, [GA_MEASUREMENT_ID]);

  useEffect(() => {
    if (!window.gtag || !GA_MEASUREMENT_ID) return;

    window.gtag('event', 'page_view', {
      page_path: location,
      page_location: window.location.href,
      page_title: document.title,
    });

    console.log('[Analytics] Page view tracked:', location);
  }, [location, GA_MEASUREMENT_ID]);

  return null;
}
