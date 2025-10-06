import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allow external connections
    port: 5173,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '.netlify.app', // Allow all Netlify preview URLs
      'devserver-main--udc-webstack.netlify.app', // Specific Netlify URL
      '.netlify.com', // Allow Netlify domains
    ],
    cors: {
      origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:5173',
        'https://devserver-main--udc-webstack.netlify.app',
        'https://*.netlify.app',
        'https://*.netlify.com'
      ],
      credentials: true
    }
  },
  preview: {
    host: true,
    port: 4173,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '.netlify.app',
      '.netlify.com'
    ]
  }
})
