// API configuration for different environments
const getApiUrl = () => {
  if (import.meta.env.DEV) {
    // Development - use local server
    return 'http://localhost:3001/api';
  } else {
    // Production - use Netlify functions
    return '/api';
  }
};

export const API_BASE_URL = getApiUrl();

// API endpoints
export const API_ENDPOINTS = {
  APPLICATIONS: `${API_BASE_URL}/applications`,
  HEALTH: `${API_BASE_URL}/health`
} as const;
