import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { federation } from '@module-federation/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import mfConfig from './module-federation.config'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
    federation(mfConfig),
  ],
  server: { port: 5175, strictPort: true, origin: 'http://localhost:5175' },
  preview: { port: 5175, strictPort: true, cors: true },
  build: { target: 'esnext', modulePreload: false },
})
