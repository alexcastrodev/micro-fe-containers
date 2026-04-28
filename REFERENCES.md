# Referências — Module Federation

Links úteis da documentação oficial e do código-fonte do Module Federation, com foco nos pontos relevantes para este projeto (host `kurz-panel` + remotes `iot` e `finance`).

## Documentação oficial

- [Site oficial](https://module-federation.io/) — landing page com visão geral.
- [Guia — Conceitos básicos](https://module-federation.io/guide/start/index.html)
- [Guia — Runtime](https://module-federation.io/guide/basic/runtime.html) — API `init`, `loadRemote`, `registerRemotes`, `registerPlugins`.
- [Guia — Runtime Hooks](https://module-federation.io/guide/basic/runtime/runtime-hooks.html) — lista completa de hooks (`beforeRequest`, `afterResolve`, `onLoad`, `errorLoadRemote`, `loadShare`, etc.).
- [Plugin System — Dev](https://module-federation.io/plugin/dev/index.html) — como escrever runtime plugins.
- [Configuração](https://module-federation.io/configure/index.html) — referência completa das opções (`exposes`, `remotes`, `shared`, `shareScope`, `runtimePlugins`).

## Integrações

- [Vite plugin (`@module-federation/vite`)](https://module-federation.io/guide/basic/vite.html) — usado por este projeto.
- [Webpack plugin](https://module-federation.io/guide/basic/webpack.html)
- [Rspack plugin](https://module-federation.io/guide/basic/rspack.html)
- [Next.js](https://module-federation.io/guide/framework/nextjs.html)

## Tópicos avançados (relevantes aqui)

- [Error handling / Fallback de remotes](https://module-federation.io/guide/basic/runtime/runtime-hooks.html#errorloadremote) — hook `errorLoadRemote` para tratar falhas de fetch (ex.: `ERR_CONNECTION_REFUSED`) sem derrubar o host.
- [Dynamic Remotes](https://module-federation.io/guide/basic/runtime.html#registerremotes) — registrar remotes em runtime via `registerRemotes`.
- [Shared modules / Singletons](https://module-federation.io/configure/shared.html) — `react`, `react-dom`, `react-router-dom`, `zustand`, `@tanstack/react-query` estão como singletons no host.
- [`shareStrategy` (`version-first` vs `loaded-first`)](https://module-federation.io/configure/sharestrategy.html) — `version-first` (default no `@module-federation/vite`) força o fetch de **todos os `remoteEntry.js`** no boot para resolver versões dos singletons; se um remote estiver down, isolamento entre remotes fica comprometido. `loaded-first` carrega o entry do remote só quando ele é realmente importado — preferível para tolerância a falhas.
- [Type Hints / DTS](https://module-federation.io/guide/basic/type-prompt.html) — geração automática de tipos para os módulos expostos (gera o diretório `@mf-types`).

## Repositórios

- [module-federation/core (monorepo)](https://github.com/module-federation/core) — código-fonte de runtime, runtime-core, vite, webpack, rspack.
- [module-federation/module-federation-examples](https://github.com/module-federation/module-federation-examples) — exemplos práticos.

## Onde olhar no `node_modules` deste projeto

Quando a documentação online estiver incompleta, vale ler o pacote instalado:

- `node_modules/@module-federation/runtime/dist/index.d.ts` — API pública (`createInstance`, `loadRemote`, `registerRemotes`, `registerPlugins`, etc.).
- `node_modules/@module-federation/runtime-core/dist/remote/index.d.ts` — assinaturas dos hooks (`onLoad`, `errorLoadRemote`, ...).
- `node_modules/@module-federation/vite/lib/index.d.mts` — opções aceitas pelo plugin Vite (`runtimePlugins`, `dts`, `manifest`, etc.).

## Notas deste projeto

- Host: [kurz-panel/vite.config.ts](kurz-panel/vite.config.ts) — define `remotes: { iot, finance }`.
- Remotes:
  - `iot` em `http://localhost:5174/remoteEntry.js`
  - `finance` em `http://localhost:5175/remoteEntry.js`
- Auth store é exposto pelo host via `./authStore` e consumido pelos remotes.
- Para falhas de carregamento de um remote, ver [kurz-panel/src/mf-runtime-plugin.ts](kurz-panel/src/mf-runtime-plugin.ts) (hook `errorLoadRemote`) e [kurz-panel/src/layout/RemoteErrorBoundary.tsx](kurz-panel/src/layout/RemoteErrorBoundary.tsx) (boundary React).
