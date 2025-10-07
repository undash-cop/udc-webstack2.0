import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Enable code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@headlessui/react', '@heroicons/react'],
          forms: ['react-hook-form', '@hookform/resolvers', 'zod'],
          utils: ['react-hot-toast', 'react-helmet-async']
        }
      }
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Enable minification
    minify: 'terser',
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Optimize assets
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@headlessui/react',
      '@heroicons/react',
      'react-hook-form',
      'react-hot-toast',
      'react-helmet-async'
    ]
  },
  server: {
    host: true, // Allow external connections
    port: 5173,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '.workers.dev', // Allow Cloudflare Workers domains
      '.cloudflare.com', // Allow Cloudflare domains
    ],
    cors: {
      origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:5173',
        'http://localhost:8787', // Cloudflare Worker dev server
        'https://*.workers.dev',
        'https://*.cloudflare.com'
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
      '.workers.dev',
      '.cloudflare.com'
    ]
  }
})
