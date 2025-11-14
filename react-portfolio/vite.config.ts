import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Kha Van Hoang - Portfolio',
        short_name: 'KVH Portfolio',
        description: 'Solutions Architect | AWS, Azure, GCP | Cloud Architecture, AI/ML, DevSecOps',
        theme_color: '#FF9900',
        background_color: '#0a0a0a',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
      '@store': path.resolve(__dirname, './src/store'),
      '@assets': path.resolve(__dirname, './src/assets')
    }
  },
  build: {
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2, // Multiple passes for better optimization
      },
      mangle: {
        safari10: true, // Fix Safari 10 issues
      },
    },
    rollupOptions: {
      output: {
        // Intelligent chunk splitting strategy
        manualChunks: (id) => {
          // React core libraries
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router')) {
            return 'react-vendor';
          }

          // Animation library
          if (id.includes('node_modules/framer-motion')) {
            return 'animation';
          }

          // i18n libraries
          if (id.includes('node_modules/i18next') || id.includes('node_modules/react-i18next')) {
            return 'i18n';
          }

          // Form libraries
          if (id.includes('node_modules/react-hook-form') || id.includes('node_modules/zod') || id.includes('node_modules/@hookform')) {
            return 'forms';
          }

          // Data fetching
          if (id.includes('node_modules/@tanstack/react-query') || id.includes('node_modules/axios')) {
            return 'data-fetching';
          }

          // Charts (large library, already lazy loaded)
          if (id.includes('node_modules/recharts')) {
            return 'charts';
          }

          // Markdown rendering (already lazy loaded)
          if (id.includes('node_modules/react-markdown') || id.includes('node_modules/remark-')) {
            return 'markdown';
          }

          // Search library
          if (id.includes('node_modules/fuse.js')) {
            return 'search';
          }

          // UI components
          if (id.includes('node_modules/@headlessui')) {
            return 'ui-components';
          }

          // Date utilities
          if (id.includes('node_modules/date-fns')) {
            return 'date-utils';
          }

          // SEO and meta
          if (id.includes('node_modules/react-helmet')) {
            return 'seo';
          }

          // Utilities
          if (id.includes('node_modules/zustand') || id.includes('node_modules/clsx')) {
            return 'utils';
          }

          // Other node_modules
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        // Optimize chunk file names
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split('/').pop()?.replace(/\.[^.]*$/, '')
            : 'chunk';
          return `js/${facadeModuleId}-[hash].js`;
        },
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `images/[name]-[hash][extname]`;
          }
          if (/woff2?|eot|ttf|otf/i.test(ext)) {
            return `fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        // Better code splitting
        experimentalMinChunkSize: 20000, // Minimum chunk size: 20KB
      },
      // Tree shaking optimization
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
      },
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 1000, // 1MB warning threshold
    // Source maps for production debugging (optional, can disable for smaller builds)
    sourcemap: false,
    // CSS code splitting
    cssCodeSplit: true,
    // Optimize asset inlining threshold
    assetsInlineLimit: 4096, // 4KB - inline smaller assets
  },
  server: {
    port: 3000,
    open: true
  }
});
