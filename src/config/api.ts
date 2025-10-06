// API configuration for different environments
const getApiUrl = () => {
  if (import.meta.env.DEV) {
    // Development - use FastAPI server
    const port = import.meta.env.VITE_SERVER_PORT || '8000';
    return `http://localhost:${port}/api`;
  } else {
    // Production - use Netlify functions (fallback)
    return '/api';
  }
};

export const API_BASE_URL = getApiUrl();

// API endpoints
export const API_ENDPOINTS = {
  APPLICATIONS: `${API_BASE_URL}/applications`,
  HEALTH: `${API_BASE_URL}/health`
} as const;
