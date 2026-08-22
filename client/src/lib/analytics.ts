declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

function analyticsPath(value: string): string {
  const path = value.split(/[?#]/, 1)[0] || '/';
  return path.startsWith('/') ? path : `/${path}`;
}

export const analytics = {
  event: async (eventName: string, params?: Record<string, unknown>) => {
    const { sanitizeGovernedAnalyticsEvent } = await import("@shared/analytics-governance");
    const governed = sanitizeGovernedAnalyticsEvent(eventName, params);
    if (governed && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', governed.eventName, governed.params);
    }
  },

  trackContactFormSubmit: (params: {
    service?: string;
    source?: string;
  }) => {
    analytics.event('contact_form_submit', {
      service: params.service || 'not-specified',
      source: params.source || 'website',
    });
  },

  trackBlogView: (params: { postId: number; postTitle: string; postSlug?: string }) => {
    analytics.event('blog_view', {
      event_category: 'content',
      event_label: 'blog_post',
      post_id: params.postId,
      post_title: params.postTitle,
      post_slug: params.postSlug || '',
    });
  },

  trackCaseStudyView: (caseStudyTitle: string, caseStudyId?: number) => {
    analytics.event('case_study_view', {
      event_category: 'content',
      event_label: 'case_study',
      case_study: caseStudyTitle,
      case_study_id: caseStudyId,
    });
  },

  trackServiceInterest: (serviceName: string, actionType: 'view' | 'click_cta') => {
    analytics.event('service_interest', {
      service: serviceName,
      action: actionType,
    });
  },

  trackNavigation: (destination: string, source: 'header' | 'footer' | 'cta') => {
    analytics.event('navigation_click', {
      event_category: 'navigation',
      event_label: destination,
      source: source,
    });
  },

  trackPWAInstall: (outcome: 'accepted' | 'dismissed') => {
    analytics.event('pwa_install', {
      event_category: 'engagement',
      event_label: outcome,
    });
  },

  trackSearch: (searchTerm: string, resultsCount: number) => {
    analytics.event('search', {
      search_term: searchTerm,
      event_category: 'engagement',
      event_label: 'site_search',
      results_count: resultsCount,
    });
  },

  trackSocialShare: (platform: string, contentType: 'blog' | 'case_study', contentTitle: string) => {
    analytics.event('share', {
      method: platform,
      content_type: contentType,
      item_id: contentTitle,
      event_category: 'engagement',
    });
  },

  trackConversion: (conversionType: 'contact' | 'newsletter' | 'download', value?: number) => {
    analytics.event('conversion', {
      event_category: 'conversion',
      event_label: conversionType,
      value: value || 0,
      currency: 'USD',
    });
  },

  trackOutboundLink: (url: string, label?: string) => {
    analytics.event('click', {
      event_category: 'outbound',
      event_label: label || 'outbound-link',
      destination_path: analyticsPath(url),
    });
  },

  trackDownload: (fileName: string, fileType: string) => {
    analytics.event('file_download', {
      event_category: 'engagement',
      event_label: fileName,
      file_type: fileType,
    });
  },

  trackEngagement: (pageType: string, timeSeconds: number) => {
    analytics.event('user_engagement', {
      event_category: 'engagement',
      event_label: pageType,
      value: Math.round(timeSeconds),
    });
  },
};
