import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { federation } from '@module-federation/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
    federation({
      name: 'kurz_panel',
      filename: 'remoteEntry.js',
      exposes: { './authStore': './src/auth/store.ts' },
      runtimePlugins: ['./src/mf-runtime-plugin.ts'],
      shareStrategy: 'loaded-first',
      remotes: {
        iot: {
          type: 'module',
          name: 'iot',
          entry: 'http://localhost:5174/remoteEntry.js',
          entryGlobalName: 'iot',
          shareScope: 'default',
        },
        finance: {
          type: 'module',
          name: 'finance',
          entry: 'http://localhost:5175/remoteEntry.js',
          entryGlobalName: 'finance',
          shareScope: 'default',
        },
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
        'react-router-dom': { singleton: true },
        '@tanstack/react-query': { singleton: true },
        zustand: { singleton: true },
      },
    }),
  ],
  server: { port: 5173, strictPort: true, origin: 'http://localhost:5173' },
  preview: { port: 5173, strictPort: true, cors: true },
  build: { target: 'esnext', modulePreload: false },
})
