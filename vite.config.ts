import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimize chunk size - Set to 80KB limit for stricter control
    chunkSizeWarningLimit: 80,
    // Enable aggressive minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 2
      },
      mangle: {
        toplevel: true
      }
    },
    // Enable CSS code splitting
    cssCodeSplit: true,
    // CSS minification
    cssMinify: true,
    // Optimize assets - Inline more assets
    assetsInlineLimit: 8192, // Inline assets smaller than 8kb
    // Target modern browsers for smaller bundles
    target: 'es2020',
    // Enable tree shaking and code splitting
    rollupOptions: {
      treeshake: {
        moduleSideEffects: false
      },
      output: {
        manualChunks: (id) => {
          // More aggressive chunking to stay under 100KB
          if (id.includes('node_modules')) {
            // Split React into smaller chunks
            if (id.includes('react-dom/client')) {
              return 'vendor-react-dom-client';
            }
            if (id.includes('react-dom/')) {
              return 'vendor-react-dom';
            }
            if (id.includes('react/')) {
              return 'vendor-react-core';
            }
            if (id.includes('react-router')) {
              return 'vendor-router';
            }
            if (id.includes('@headlessui')) {
              return 'vendor-headlessui';
            }
            if (id.includes('@heroicons')) {
              return 'vendor-heroicons';
            }
            if (id.includes('react-hook-form')) {
              return 'vendor-hook-form';
            }
            if (id.includes('@hookform') || id.includes('zod')) {
              return 'vendor-form-utils';
            }
            if (id.includes('react-hot-toast')) {
              return 'vendor-toast';
            }
            if (id.includes('react-helmet')) {
              return 'vendor-helmet';
            }
            return 'vendor-other';
          }
          
          // Split pages more granularly
          if (id.includes('/pages/Home')) {
            return 'page-home';
          }
          if (id.includes('/pages/Products')) {
            return 'page-products';
          }
          if (id.includes('/pages/ProductDetail')) {
            return 'page-product-detail';
          }
          if (id.includes('/pages/About')) {
            return 'page-about';
          }
          if (id.includes('/pages/Contact')) {
            return 'page-contact';
          }
          if (id.includes('/pages/Blog')) {
            return 'page-blog';
          }
          if (id.includes('/pages/Careers')) {
            return 'page-careers';
          }
          // Split remaining pages more granularly
          if (id.includes('/pages/CaseStudies')) {
            return 'page-case-studies';
          }
          if (id.includes('/pages/CaseStudyDetail')) {
            return 'page-case-study-detail';
          }
          if (id.includes('/pages/ApplyJob')) {
            return 'page-apply-job';
          }
          if (id.includes('/pages/SendResume')) {
            return 'page-send-resume';
          }
          if (id.includes('/pages/JobDetails')) {
            return 'page-job-details';
          }
          if (id.includes('/pages/Support')) {
            return 'page-support';
          }
          if (id.includes('/pages/Status')) {
            return 'page-status';
          }
          if (id.includes('/pages/PrivacyPolicy')) {
            return 'page-privacy';
          }
          if (id.includes('/pages/TermsAndConditions')) {
            return 'page-terms';
          }
          if (id.includes('/pages/RefundPolicy')) {
            return 'page-refund';
          }
          if (id.includes('/pages/CookiePolicy')) {
            return 'page-cookie';
          }
          if (id.includes('/pages/ResourceCenter')) {
            return 'page-resources';
          }
          if (id.includes('/pages/')) {
            return 'pages-other';
          }
          
          // Split components
          if (id.includes('/components/Product')) {
            return 'components-product';
          }
          if (id.includes('/components/')) {
            return 'components-other';
          }
        }
      }
    },
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
