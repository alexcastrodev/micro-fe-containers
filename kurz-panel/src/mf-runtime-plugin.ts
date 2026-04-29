import type { ModuleFederation, ModuleFederationRuntimePlugin } from '@module-federation/runtime'

export class RemoteUnavailableError extends Error {
  remoteId: string
  constructor(remoteId: string) {
    super(`Remote "${remoteId}" indisponível`)
    this.name = 'RemoteUnavailableError'
    this.remoteId = remoteId
  }
}

type ViteModuleCache = { share?: Record<string, unknown>; remote?: Record<string, unknown> }
type FederationGlobal = {
  __FEDERATION__?: { __INSTANCES__?: ModuleFederation[] }
  __VMOK__?: { __INSTANCES__?: ModuleFederation[] }
  __mf_module_cache__?: ViteModuleCache
}
type GlobalWithFederation = typeof globalThis & FederationGlobal

const HOST_NAME = 'kurz_panel'

function getFederationInstances(): ModuleFederation[] {
  const g = globalThis as GlobalWithFederation
  return g.__FEDERATION__?.__INSTANCES__ ?? g.__VMOK__?.__INSTANCES__ ?? []
}

function findHostInstance(): ModuleFederation | undefined {
  return getFederationInstances().find((ins) => ins.name === HOST_NAME) ?? getFederationInstances()[0]
}

/**
 * Waits for the host federation instance to be created by the Vite plugin's
 * auto-init (which calls createInstance asynchronously after the page loads).
 * Calling loadRemote before this throws RUNTIME-009 because @module-federation/runtime's
 * loadRemote uses a module-local FederationInstance that createInstance does NOT set —
 * only the deprecated init() does. So we must reach the instance via the global registry.
 */
async function waitForHostInstance(timeoutMs = 5000): Promise<ModuleFederation> {
  const existing = findHostInstance()
  if (existing) return existing
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    const instance = findHostInstance()
    if (instance) return instance
    await new Promise((resolve) => setTimeout(resolve, 25))
  }
  throw new Error('[mf] federation host instance was not initialized in time')
}

function withCacheBust(entry: string) {
  try {
    const url = new URL(entry)
    url.searchParams.set('mf_retry', String(Date.now()))
    return url.toString()
  } catch {
    const separator = entry.includes('?') ? '&' : '?'
    return `${entry}${separator}mf_retry=${Date.now()}`
  }
}

/**
 * Re-registers the remote so the next loadRemote() refetches everything.
 * registerRemotes({ force: true }) internally calls removeRemote, which clears
 * moduleCache, manifestCache, globalLoading and the entryGlobalName container,
 * so the next call goes to the network.
 */
export async function resetRemote(remoteId: string) {
  const remoteName = remoteId.split('/')[0]
  const instance = await waitForHostInstance().catch(() => undefined)
  const remote = instance?.options.remotes.find((r) => r.name === remoteName)
  if (instance && remote && 'entry' in remote) {
    instance.registerRemotes([{ ...remote, entry: withCacheBust(remote.entry) }], { force: true })
  }

  const viteCache = (globalThis as GlobalWithFederation).__mf_module_cache__?.remote
  if (viteCache) {
    for (const key of Object.keys(viteCache)) {
      if (
        key === remoteName ||
        key.startsWith(`${remoteName}/`) ||
        key.startsWith(`__mf_pending__${remoteName}`)
      ) {
        delete viteCache[key]
      }
    }
  }
}

/**
 * Loads a remote module via the runtime, bypassing Vite's virtual module
 * cache. This is the only reliable way to allow retry to actually refetch
 * after a previous failure: import('remote/X') in dev mode freezes its
 * default export to whatever errorLoadRemote returned and never re-evaluates.
 *
 * See: https://github.com/module-federation/vite/issues/207
 * and:  https://module-federation.io/blog/error-load-remote.html
 */
export async function loadRemoteComponent<T = unknown>(remoteId: string): Promise<{ default: T }> {
  const instance = await waitForHostInstance()
  const mod = (await instance.loadRemote(remoteId)) as
    | { default?: T; __esModule?: boolean }
    | T
    | null
  if (mod === null || mod === undefined) {
    throw new RemoteUnavailableError(remoteId)
  }
  const candidate = (mod as { default?: T }).default ?? (mod as T)
  return { default: candidate as T }
}

const plugin: () => ModuleFederationRuntimePlugin = () => ({
  name: 'remote-fallback-plugin',
  errorLoadRemote({ id, error, lifecycle }) {
    console.warn(`[mf] remote "${id}" failed at ${lifecycle}:`, error)
    throw new RemoteUnavailableError(id)
  },
})

export default plugin
