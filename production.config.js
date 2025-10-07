// Production Configuration
// This file contains production-specific settings

export const productionConfig = {
  // Performance settings
  performance: {
    enableServiceWorker: true,
    enableImageOptimization: true,
    enableCodeSplitting: true,
    enableCompression: true,
  },

  // Analytics
  analytics: {
    googleAnalytics: {
      enabled: process.env.VITE_ENABLE_ANALYTICS === 'true',
      trackingId: process.env.VITE_GA_TRACKING_ID,
    },
  },

  // PWA settings
  pwa: {
    enabled: process.env.VITE_ENABLE_PWA === 'true',
    offline: process.env.VITE_ENABLE_OFFLINE === 'true',
  },

  // API configuration
  api: {
    baseUrl: process.env.VITE_API_BASE_URL || 'https://api.undash-cop.com',
    timeout: 10000,
    retries: 3,
  },

  // Security settings
  security: {
    enableCSP: true,
    enableHSTS: true,
    enableXSSProtection: true,
  },

  // Feature flags
  features: {
    jobApplications: true,
    contactForms: true,
    newsletter: true,
    blog: true,
    caseStudies: true,
  },

  // Error handling
  errorHandling: {
    enableErrorReporting: true,
    enablePerformanceMonitoring: true,
    logLevel: 'error',
  },
};

export default productionConfig;
