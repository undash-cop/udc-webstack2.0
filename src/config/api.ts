// API configuration for different environments
const getApiUrl = () => {
  if (import.meta.env.DEV) {
    // Development - use Cloudflare Worker dev server
    return 'http://localhost:8787/api';
  } else {
    // Production - use Cloudflare Worker
    // Replace with your actual worker URL after deployment
    return 'https://udc-applications-worker.your-subdomain.workers.dev/api';
  }
};

export const API_BASE_URL = getApiUrl();

// API endpoints
export const API_ENDPOINTS = {
  APPLICATIONS: `${API_BASE_URL}/applications`,
  HEALTH: `${API_BASE_URL}/health`
} as const;
