// API configuration for different environments
const getApiUrl = () => {
  if (import.meta.env.DEV) {
    // Development - use local server with configurable port
    const port = import.meta.env.VITE_SERVER_PORT || '3001';
    return `http://localhost:${port}/api`;
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
