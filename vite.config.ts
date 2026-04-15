import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Make these available via `process.env.*` in the browser build.
      'process.env.VITE_CONTENTFUL_SPACE_ID': JSON.stringify(env.VITE_CONTENTFUL_SPACE_ID ?? ''),
      'process.env.VITE_CONTENTFUL_ACCESS_TOKEN': JSON.stringify(env.VITE_CONTENTFUL_ACCESS_TOKEN ?? ''),
    },
    build: {
      target: 'es2015',
      cssCodeSplit: true,
      chunkSizeWarningLimit: 500,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            'vendor-i18n': ['i18next', 'react-i18next', 'i18next-http-backend', 'i18next-browser-languagedetector'],
            'vendor-contentful': ['contentful', '@contentful/rich-text-react-renderer', '@contentful/rich-text-types'],
            'vendor-animation': ['framer-motion'],
            'vendor-swr': ['swr'],
          },
        },
      },
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'swr'],
    },
  };
});
