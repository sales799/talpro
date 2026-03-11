export function sendWebVitalsToGA() {
  if (typeof window === 'undefined' || !window.gtag) return;

  if ('PerformanceObserver' in window) {
    try {
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
            window.gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: 'CLS',
              value: Math.round((entry as any).value * 1000),
              non_interaction: true,
            });
          }
        }
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch (e) {
      console.warn('[Performance] CLS observer not supported:', e);
    }

    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        window.gtag('event', 'web_vitals', {
          event_category: 'Web Vitals',
          event_label: 'LCP',
          value: Math.round(lastEntry.startTime),
          non_interaction: true,
        });
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
      console.warn('[Performance] LCP observer not supported:', e);
    }

    try {
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          window.gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'FID',
            value: Math.round((entry as any).processingStart - entry.startTime),
            non_interaction: true,
          });
        }
      });
      fidObserver.observe({ type: 'first-input', buffered: true });
    } catch (e) {
      console.warn('[Performance] FID observer not supported:', e);
    }
  }
}
