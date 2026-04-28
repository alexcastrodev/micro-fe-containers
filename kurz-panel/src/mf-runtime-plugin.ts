import type { ModuleFederationRuntimePlugin } from '@module-federation/runtime'

export class RemoteUnavailableError extends Error {
  remoteId: string
  constructor(remoteId: string) {
    super(`Remote "${remoteId}" indisponível`)
    this.name = 'RemoteUnavailableError'
    this.remoteId = remoteId
  }
}

const plugin: () => ModuleFederationRuntimePlugin = () => ({
  name: 'remote-fallback-plugin',
  errorLoadRemote({ id, error, lifecycle }) {
    console.warn(`[mf] remote "${id}" failed at ${lifecycle}:`, error)
    if (lifecycle === 'onLoad') {
      return {
        __esModule: true,
        default: () => {
          throw new RemoteUnavailableError(id)
        },
      }
    }
    if (lifecycle === 'afterResolve') {
      throw new RemoteUnavailableError(id)
    }
    return null
  },
})

export default plugin
