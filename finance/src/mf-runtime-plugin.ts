import type { ModuleFederationRuntimePlugin } from '@module-federation/runtime'

const plugin: () => ModuleFederationRuntimePlugin = () => ({
  name: 'finance-remote-fallback-plugin',
  errorLoadRemote({ id, error, lifecycle }) {
    console.warn(`[finance/mf] remote "${id}" failed at ${lifecycle}:`, error)
    throw error
  },
})

export default plugin
