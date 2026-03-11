# Analytics Implementation Guide

## Overview

TalPro website uses Google Analytics 4 (GA4) for comprehensive tracking of user behavior, conversions, and performance metrics.

## Setup

### Environment Variable

Add to `.env`:
```
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual GA4 Measurement ID.

### Where to Find GA4 Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your property
3. Go to Admin (gear icon)
4. Under Property column, click "Data Streams"
5. Click your web stream
6. Copy the "Measurement ID" (starts with G-)

## Features Implemented

### 1. Automatic Page View Tracking
- Tracks all page navigations automatically
- Captures page path, location, and title

### 2. Custom Event Tracking

Available tracking functions in `client/src/lib/analytics.ts`:

- `trackContactFormSubmit()` - Contact form submissions
- `trackBlogView()` - Blog post views
- `trackCaseStudyView()` - Case study views
- `trackServiceInterest()` - Service page engagement
- `trackNavigation()` - Navigation clicks
- `trackPWAInstall()` - PWA installation events
- `trackSearch()` - Site search queries
- `trackSocialShare()` - Social media shares
- `trackConversion()` - Conversion events
- `trackOutboundLink()` - External link clicks
- `trackDownload()` - File downloads
- `trackEngagement()` - User engagement time

### 3. Performance Monitoring

Web Vitals tracked:
- **CLS** (Cumulative Layout Shift)
- **LCP** (Largest Contentful Paint)
- **FID** (First Input Delay)

### 4. Conversion Tracking

Predefined conversion values:
- Contact Form: $100
- Newsletter Signup: $25
- Case Study View: $10
- Blog Post View: $5
- Service CTA Click: $50
- Careers Application: $150

## Usage Examples

### Track Contact Form Submission

```typescript
import { analytics } from '@/lib/analytics';

analytics.trackContactFormSubmit({
  name: 'John Doe',
  email: 'john@example.com',
  company: 'Acme Inc',
  service: 'Mobile App',
});
```

### Track Custom Event

```typescript
import { analytics } from '@/lib/analytics';

analytics.event('custom_event_name', {
  event_category: 'engagement',
  event_label: 'custom_label',
  custom_param: 'value',
});
```

### Track Conversion

```typescript
import { trackConversionWithValue } from '@/lib/conversionTracking';

trackConversionWithValue('CONTACT_FORM', {
  service_interest: 'Mobile Development',
});
```

## Testing

### Development Mode

In development (without VITE_GA_MEASUREMENT_ID), analytics will log to console instead of sending to GA.

### Production Testing

1. Set up GA4 property
2. Add VITE_GA_MEASUREMENT_ID to environment
3. Use GA4 DebugView to see real-time events
4. Use browser extensions (Google Analytics Debugger) to verify tracking

## GA4 Dashboard Setup

### Recommended Custom Reports

1. **Conversion Funnel**:
   - Page view → Service interest → Contact form → Conversion

2. **Content Performance**:
   - Blog views, case study views, engagement time

3. **User Journey**:
   - Entry pages, navigation paths, exit pages

4. **Performance Metrics**:
   - Web Vitals (CLS, LCP, FID) over time

### Recommended Events to Monitor

- `contact_form_submit` - Lead generation
- `service_interest` - Service page engagement
- `pwa_install` - App installation rate
- `blog_view` - Content engagement
- `conversion` - Goal completions

## Privacy Considerations

- GA4 data collection complies with GDPR
- No PII (Personally Identifiable Information) is sent
- Users can opt-out via browser Do Not Track
- Consider adding cookie consent banner if required

## Troubleshooting

### Events Not Appearing

1. Check browser console for tracking logs
2. Verify VITE_GA_MEASUREMENT_ID is set correctly
3. Check GA4 DebugView (Admin → DebugView)
4. Ensure gtag.js script loaded (Network tab)

### Page Views Not Tracking

1. Verify Analytics component is mounted in App.tsx
2. Check console for "Page view tracked" logs
3. Verify wouter router is working correctly

## Next Steps

1. Set up custom audiences in GA4
2. Create conversion goals in GA4
3. Set up ecommerce tracking (if applicable)
4. Configure BigQuery export for advanced analysis
5. Add cookie consent banner for EU compliance
