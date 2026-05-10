import type { ModuleFederationOptions } from '@module-federation/vite'

const HOST_ENTRY = process.env.VITE_HOST_ENTRY ?? 'http://localhost:5173/remoteEntry.js'

const config: ModuleFederationOptions = {
  name: 'finance',
  filename: 'remoteEntry.js',
  exposes: {
    './SummaryPage': './src/pages/SummaryPage.tsx',
    './TransactionsPage': './src/pages/TransactionsPage.tsx',
  },
  runtimePlugins: ['./src/mf-runtime-plugin.ts'],
  shareStrategy: 'loaded-first',
  remotes: {
    host: {
      type: 'module',
      name: 'host',
      entry: HOST_ENTRY,
      entryGlobalName: 'host',
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
