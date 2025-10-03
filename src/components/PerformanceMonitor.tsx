import { useEffect } from 'react';
import { trackEvent } from '../hooks/useAnalytics';

const PerformanceMonitor = () => {
  useEffect(() => {
    // Track Core Web Vitals
    const trackWebVitals = () => {
      // Largest Contentful Paint (LCP)
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        const lcp = lastEntry.startTime;
        
        trackEvent('performance', 'lcp', `LCP: ${Math.round(lcp)}ms`);
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay (FID)
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const fidEntry = entry as any;
          const fid = fidEntry.processingStart - fidEntry.startTime;
          
          trackEvent('performance', 'fid', `FID: ${Math.round(fid)}ms`);
        });
      }).observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const clsEntry = entry as any;
          if (!clsEntry.hadRecentInput) {
            clsValue += clsEntry.value;
          }
        });
        
        trackEvent('performance', 'cls', `CLS: ${Math.round(clsValue * 1000) / 1000}`);
      }).observe({ entryTypes: ['layout-shift'] });

      // First Contentful Paint (FCP)
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const fcp = entry.startTime;
          
          trackEvent('performance', 'fcp', `FCP: ${Math.round(fcp)}ms`);
        });
      }).observe({ entryTypes: ['paint'] });
    };

    // Track page load performance
    const trackPageLoad = () => {
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        if (navigation) {
          const loadTime = navigation.loadEventEnd - navigation.fetchStart;
          const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
          const firstByte = navigation.responseStart - navigation.fetchStart;
          
          trackEvent('performance', 'page_load', `Load: ${Math.round(loadTime)}ms, DOM: ${Math.round(domContentLoaded)}ms, TTFB: ${Math.round(firstByte)}ms - ${window.location.pathname}`);
        }
      });
    };

    // Track resource loading performance
    const trackResourcePerformance = () => {
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.duration > 1000) { // Track resources taking more than 1 second
            const resourceEntry = entry as any;
            trackEvent('performance', 'slow_resource', `Slow: ${resourceEntry.name} (${Math.round(entry.duration)}ms, ${resourceEntry.initiatorType})`);
          }
        });
      }).observe({ entryTypes: ['resource'] });
    };

    // Initialize performance tracking
    if ('PerformanceObserver' in window) {
      trackWebVitals();
      trackPageLoad();
      trackResourcePerformance();
    }

    // Track memory usage (if available)
    const trackMemoryUsage = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const used = Math.round(memory.usedJSHeapSize / 1024 / 1024);
        const total = Math.round(memory.totalJSHeapSize / 1024 / 1024);
        const limit = Math.round(memory.jsHeapSizeLimit / 1024 / 1024);
        trackEvent('performance', 'memory_usage', `Memory: ${used}MB/${total}MB (limit: ${limit}MB)`);
      }
    };

    // Track memory usage every 30 seconds
    const memoryInterval = setInterval(trackMemoryUsage, 30000);

    return () => {
      clearInterval(memoryInterval);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceMonitor;
