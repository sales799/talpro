import { useEffect, useState } from 'react';
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
  const CLARITY_ID = import.meta.env.VITE_CLARITY_ID;
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);

  useEffect(() => {
    const storedConsent = localStorage.getItem('talpro_cookie_consent');
    setAnalyticsAllowed(storedConsent === 'accepted');

    const onConsent = (event: Event) => {
      const consentEvent = event as CustomEvent<{ accepted: boolean }>;
      setAnalyticsAllowed(consentEvent.detail.accepted);
    };

    window.addEventListener('talpro:consent', onConsent);
    return () => window.removeEventListener('talpro:consent', onConsent);
  }, []);

  useEffect(() => {
    if (!analyticsAllowed || !GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
      return;
    }

    if (document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"]`)) {
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

    // ── Microsoft Clarity ─────────────────────────────────
    if (CLARITY_ID) {
      const clarityScript = document.createElement('script');
      clarityScript.type = 'text/javascript';
      clarityScript.innerHTML = `
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${CLARITY_ID}");
      `;
      document.head.appendChild(clarityScript);
    }

    return () => {
      const scripts = document.querySelectorAll(`script[src*="googletagmanager"], script[src*="clarity.ms"]`);
      scripts.forEach((s) => s.remove());
    };
  }, [analyticsAllowed, GA_MEASUREMENT_ID, CLARITY_ID]);

  useEffect(() => {
    if (!analyticsAllowed || !window.gtag || !GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') return;

    window.gtag('event', 'page_view', {
      page_path: location,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [analyticsAllowed, location, GA_MEASUREMENT_ID]);

  return null;
}
