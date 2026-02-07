import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@headlessui/react', '@heroicons/react'],
          forms: ['react-hook-form'],
          utils: ['react-hot-toast', 'react-meta-seo']
        }
      }
    },
    // Ensure public assets are copied correctly
    copyPublicDir: true
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@headlessui/react',
      '@heroicons/react',
      'react-hook-form',
      'react-hot-toast',
      'react-meta-seo'
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
