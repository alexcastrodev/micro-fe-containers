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
      name: 'iot',
      filename: 'remoteEntry.js',
      exposes: {
        './LoggersPage': './src/pages/LoggersPage.tsx',
        './MapPage': './src/pages/MapPage.tsx',
      },
      remotes: {
        host: {
          type: 'module',
          name: 'host',
          entry: 'http://localhost:5173/remoteEntry.js',
          entryGlobalName: 'host',
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
  server: { port: 5174, strictPort: true, origin: 'http://localhost:5174' },
  preview: { port: 5174, strictPort: true, cors: true },
  build: { target: 'esnext', modulePreload: false },
})
