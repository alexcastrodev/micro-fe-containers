import type { ModuleFederationOptions } from '@module-federation/vite'

const IOT_ENTRY = process.env.VITE_IOT_ENTRY ?? 'http://localhost:5174/remoteEntry.js'
const FINANCE_ENTRY = process.env.VITE_FINANCE_ENTRY ?? 'http://localhost:5175/remoteEntry.js'

const config: ModuleFederationOptions = {
  name: 'kurz_panel',
  filename: 'remoteEntry.js',
  exposes: {
    './authStore': './src/auth/store.ts',
  },
  runtimePlugins: ['./src/mf-retry-plugin.ts', './src/mf-runtime-plugin.ts'],
  shareStrategy: 'loaded-first',
  remotes: {
    iot: {
      type: 'module',
      name: 'iot',
      entry: IOT_ENTRY,
      entryGlobalName: 'iot',
      shareScope: 'default',
    },
    finance: {
      type: 'module',
      name: 'finance',
      entry: FINANCE_ENTRY,
      entryGlobalName: 'finance',
      shareScope: 'default',
    },
  },
  shared: {
    react: { singleton: true, requiredVersion: '^19.0.0' },
    'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
    'react-router-dom': { singleton: true, requiredVersion: '^6.0.0' },
    '@tanstack/react-query': { singleton: true, requiredVersion: '^5.0.0' },
    zustand: { singleton: true, requiredVersion: '^5.0.0' },
  },
  dts: {
    generateTypes: {},
    consumeTypes: {},
  },
}

export default config
