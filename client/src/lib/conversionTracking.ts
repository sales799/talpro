import { analytics } from './analytics';

export const CONVERSION_VALUES = {
  CONTACT_FORM: 100,
  NEWSLETTER_SIGNUP: 25,
  CASE_STUDY_VIEW: 10,
  BLOG_POST_VIEW: 5,
  SERVICE_CTA_CLICK: 50,
  CAREERS_APPLICATION: 150,
};

export function trackConversionWithValue(
  type: keyof typeof CONVERSION_VALUES,
  additionalParams?: Record<string, any>
) {
  const value = CONVERSION_VALUES[type];
  
  analytics.trackConversion(
    type.toLowerCase().replace(/_/g, '-') as 'contact' | 'newsletter' | 'download',
    value
  );

  if (window.gtag && import.meta.env.VITE_GA_MEASUREMENT_ID) {
    window.gtag('event', 'conversion', {
      send_to: `${import.meta.env.VITE_GA_MEASUREMENT_ID}`,
      value: value,
      currency: 'USD',
      transaction_id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...additionalParams,
    });
  }
}
