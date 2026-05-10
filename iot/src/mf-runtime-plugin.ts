import type { ModuleFederationRuntimePlugin } from '@module-federation/runtime'

const plugin: () => ModuleFederationRuntimePlugin = () => ({
  name: 'iot-remote-fallback-plugin',
  errorLoadRemote({ id, error, lifecycle }) {
    console.warn(`[iot/mf] remote "${id}" failed at ${lifecycle}:`, error)
    throw error
  },
})

export default plugin
