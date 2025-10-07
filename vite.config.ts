import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Enable aggressive code splitting and minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 3,
        unsafe: true,
        unsafe_comps: true,
        unsafe_math: true,
        unsafe_proto: true,
        unsafe_regexp: true,
        unsafe_undefined: true,
        conditionals: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        loops: true,
        reduce_vars: true,
        sequences: true,
        side_effects: false,
        unused: true
      },
      mangle: {
        toplevel: true,
        properties: {
          regex: /^_/
        }
      },
      format: {
        comments: false
      }
    },
    chunkSizeWarningLimit: 30,
    assetsInlineLimit: 2048,
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
    // Additional build optimizations
    reportCompressedSize: false,
    rollupOptions: {
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false
      },
      output: {
        manualChunks: (id) => {
          // Ultra-granular chunking for maximum tree shaking
          if (id.includes('node_modules')) {
            // React core - split by feature
            if (id.includes('react/')) {
              if (id.includes('react/index') || id.includes('react/cjs/')) {
                return 'vendor-react-core';
              }
              if (id.includes('react/jsx-runtime') || id.includes('react/jsx-dev-runtime')) {
                return 'vendor-react-jsx';
              }
              if (id.includes('react/hooks/')) {
                return 'vendor-react-hooks';
              }
              return 'vendor-react-utils';
            }
            
            // React DOM - ultra-granular splitting
            if (id.includes('react-dom')) {
              if (id.includes('client/index') || id.includes('client.js')) {
                return 'vendor-react-dom-client-core';
              }
              if (id.includes('client/') && id.includes('events')) {
                return 'vendor-react-dom-events';
              }
              if (id.includes('client/') && id.includes('scheduler')) {
                return 'vendor-react-dom-scheduler';
              }
              if (id.includes('client/') && id.includes('legacy')) {
                return 'vendor-react-dom-legacy';
              }
              if (id.includes('server')) {
                return 'vendor-react-dom-server';
              }
              if (id.includes('client/') && id.includes('shared')) {
                return 'vendor-react-dom-shared';
              }
              return 'vendor-react-dom';
            }
            
            // Router - split by feature
            if (id.includes('react-router')) {
              if (id.includes('dom')) {
                return 'vendor-router-dom';
              }
              if (id.includes('history')) {
                return 'vendor-router-history';
              }
              return 'vendor-router';
            }
            
            // Headless UI - split by component
            if (id.includes('@headlessui')) {
              if (id.includes('dialog') || id.includes('transition')) {
                return 'vendor-headlessui-dialog';
              }
              if (id.includes('menu') || id.includes('listbox')) {
                return 'vendor-headlessui-menu';
              }
              if (id.includes('disclosure') || id.includes('tabs')) {
                return 'vendor-headlessui-disclosure';
              }
              return 'vendor-headlessui';
            }
            
            // Heroicons - split by icon type
            if (id.includes('@heroicons')) {
              if (id.includes('outline')) {
                return 'vendor-heroicons-outline';
              }
              if (id.includes('solid')) {
                return 'vendor-heroicons-solid';
              }
              if (id.includes('mini')) {
                return 'vendor-heroicons-mini';
              }
              return 'vendor-heroicons';
            }
            
            // Forms - split by feature
            if (id.includes('react-hook-form')) {
              if (id.includes('controller') || id.includes('useController')) {
                return 'vendor-forms-controller';
              }
              if (id.includes('useForm') || id.includes('useFieldArray')) {
                return 'vendor-forms-core';
              }
              return 'vendor-forms';
            }
            
            // Validation
            if (id.includes('zod') || id.includes('@hookform/resolvers')) {
              return 'vendor-validation';
            }
            
            // Utils - split by library
            if (id.includes('react-hot-toast')) {
              return 'vendor-toast';
            }
            if (id.includes('react-helmet')) {
              return 'vendor-helmet';
            }
            if (id.includes('clsx') || id.includes('class-variance-authority')) {
              return 'vendor-class-utils';
            }
            
            // Other vendor libraries
            return 'vendor-other';
          }
          
          // Split pages
          if (id.includes('/pages/')) {
            if (id.includes('/pages/Home')) return 'page-home';
            if (id.includes('/pages/Products')) return 'page-products';
            if (id.includes('/pages/ProductDetail')) return 'page-product-detail';
            if (id.includes('/pages/About')) return 'page-about';
            if (id.includes('/pages/Contact')) return 'page-contact';
            if (id.includes('/pages/Blog')) return 'page-blog';
            if (id.includes('/pages/Careers')) return 'page-careers';
            if (id.includes('/pages/CaseStudies')) return 'page-case-studies';
            if (id.includes('/pages/ApplyJob')) return 'page-apply-job';
            if (id.includes('/pages/SendResume')) return 'page-send-resume';
            if (id.includes('/pages/JobDetails')) return 'page-job-details';
            if (id.includes('/pages/Support')) return 'page-support';
            if (id.includes('/pages/Status')) return 'page-status';
            if (id.includes('/pages/PrivacyPolicy')) return 'page-privacy';
            if (id.includes('/pages/TermsAndConditions')) return 'page-terms';
            if (id.includes('/pages/RefundPolicy')) return 'page-refund';
            if (id.includes('/pages/CookiePolicy')) return 'page-cookie';
            if (id.includes('/pages/ResourceCenter')) return 'page-resources';
            return 'pages-other';
          }
          
          // Split components
          if (id.includes('/components/')) {
            if (id.includes('/components/Product')) return 'components-product';
            if (id.includes('/components/SEO')) return 'components-seo';
            if (id.includes('/components/Testimonials')) return 'components-testimonials';
            return 'components-other';
          }
          
          // Split data
          if (id.includes('/data/')) {
            return 'data';
          }
        },
        // Additional output optimizations
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        // Optimize chunk loading
        experimentalMinChunkSize: 500,
        // Better compression
        compact: true,
        // Additional optimizations
        hoistTransitiveImports: false,
        interop: 'auto'
      }
    }
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
    ],
    exclude: [
      // Exclude heavy dependencies that are better loaded on-demand
      'react-dom/server',
      'react-dom/client'
    ],
    force: true
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
