import type { ModuleFederationRuntimePlugin } from '@module-federation/runtime'

const plugin: () => ModuleFederationRuntimePlugin = () => ({
  name: 'remote-fallback-plugin',
  errorLoadRemote({ id, error, lifecycle }) {
    console.warn(`[mf] remote "${id}" failed at ${lifecycle}:`, error)
    const message = `Remote "${id}" indisponível`
    if (lifecycle === 'onLoad') {
      return {
        __esModule: true,
        default: () => {
          throw new Error(message)
        },
      }
    }
    if (lifecycle === 'afterResolve') {
      throw new Error(message)
    }
    return null
  },
})

export default plugin
