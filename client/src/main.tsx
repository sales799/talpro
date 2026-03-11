import { createRoot } from "react-dom/client";
import { HelmetProvider } from 'react-helmet-async';
import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';
import { sendWebVitalsToGA } from '@/lib/performanceMonitoring';
import App from "./App";
import "./index.css";

// Performance monitoring with Web Vitals
if (import.meta.env.DEV) {
  // Log Core Web Vitals metrics to console in development
  const logMetric = ({ name, value, rating }: any) => {
    console.log(`[Web Vitals] ${name}:`, {
      value: Math.round(value),
      rating,
      unit: name === 'CLS' ? 'score' : 'ms'
    });
  };

  onCLS(logMetric);  // Cumulative Layout Shift
  onINP(logMetric);  // Interaction to Next Paint (replaces FID)
  onFCP(logMetric);  // First Contentful Paint
  onLCP(logMetric);  // Largest Contentful Paint
  onTTFB(logMetric); // Time to First Byte
}

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    sendWebVitalsToGA();
    
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('ServiceWorker registered:', registration.scope);
        
        setInterval(() => {
          registration.update();
        }, 60000);
      })
      .catch((error) => {
        console.log('ServiceWorker registration failed:', error);
      });
  });
}
