import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Google Analytics configuration
const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID || 'G-XXXXXXXXXX';

// Initialize Google Analytics
export const initializeAnalytics = () => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.gtag = window.gtag || function(...args: unknown[]) {
      (window.gtag.q = window.gtag.q || []).push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
      page_title: title || document.title,
    });
  }
};

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track conversions
export const trackConversion = (conversionId: string, value?: number, currency = 'USD') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: conversionId,
      value: value,
      currency: currency,
    });
  }
};

// Track user engagement
export const trackEngagement = (action: string, element: string) => {
  trackEvent(action, 'engagement', element);
};

// Track form submissions
export const trackFormSubmission = (formName: string, success = true) => {
  trackEvent(success ? 'form_submit_success' : 'form_submit_error', 'form', formName);
};

// Track button clicks
export const trackButtonClick = (buttonName: string, location: string) => {
  trackEvent('click', 'button', `${buttonName}_${location}`);
};

// Track search queries
export const trackSearch = (query: string, resultsCount: number) => {
  trackEvent('search', 'site_search', query, resultsCount);
};

// Track downloads
export const trackDownload = (fileName: string, fileType: string) => {
  trackEvent('file_download', 'download', `${fileName}.${fileType}`);
};

// Track outbound links
export const trackOutboundLink = (_url: string, linkText: string) => {
  trackEvent('click', 'outbound_link', linkText);
};

// Custom hook for automatic page view tracking
export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change
    trackPageView(location.pathname + location.search);
  }, [location]);

  return {
    trackEvent,
    trackConversion,
    trackEngagement,
    trackFormSubmission,
    trackButtonClick,
    trackSearch,
    trackDownload,
    trackOutboundLink,
  };
};

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: {
      (...args: unknown[]): void;
      q: unknown[][];
    };
  }
}
