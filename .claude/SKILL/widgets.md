---
name: packages-structure
author: Alex Castro
description: Explains the packages/ workspace architecture (core, ui, modules) used in this repo. Modules act as widgets — Next.js only imports modules; modules consume core and ui. Use when adding/editing anything inside packages/ or wiring a feature from a Next.js app/page.
---

# packages/ architecture

The repo is a workspace with three packages. Imports flow in one direction:

```
Next.js app  ──imports──▶  modules  ──imports──▶  core
                                    ──imports──▶  ui
```

- **Next.js (apps)** imports **only** from `modules`. Pages are just composition + layout.
- **`modules`** are widgets (UI + logic). They may import from `core` and `ui`.
- **`ui`** is pure presentational. No business logic, no data fetching.
- **`core`** is framework-agnostic logic: actions, entities, api client, state, i18n.
- **`core` and `ui` never import from `modules`.** **`ui` never imports from `core`.**

## Folder layout

```
packages/
├── core/                    # logic, data, domain
│   ├── actions/             # server/client actions (see actions/GUIDELINES.md)
│   │   └── <action-name>/
│   │       ├── <action>.action.ts
│   │       ├── <action>.request.ts
│   │       ├── <action>.hook.ts
│   │       ├── <action>.types.ts
│   │       └── _specs/      # vitest specs + json fixtures
│   ├── api/                 # http + graphql clients, interceptors
│   ├── entities/            # domain types (device, logger-event, stats…)
│   ├── states/              # zustand stores
│   ├── providers/           # react-query, sentry, i18n providers
│   ├── serializers/
│   ├── utils/
│   ├── common/
│   ├── i18n/
│   ├── types/
│   └── constants.ts
│
├── ui/                      # pure presentational components (see ui/GUIDELINES.md)
│   ├── <component>/
│   │   ├── index.tsx        # re-export only
│   │   ├── <component>.tsx  # one function per file
│   │   ├── <component>.types.ts
│   │   ├── _partials/       # compound parts
│   │   └── _tests/          # vitest specs
│   ├── mantine-provider.tsx
│   └── mantine-theme.ts
│
└── modules/                 # widgets = UI + logic (see modules/GUIDELINES.md)
    ├── auth/
    │   └── login/
    └── dashboard/
        ├── device/
        ├── devices-client/
        ├── iot-events-client/
        └── …
```

## The rules (from GUIDELINES.md files)

### `packages/modules/GUIDELINES.md`
- Modules are widgets, **not entire pages**.
- Modules are pieces of UI **with logic** (datatables, forms…).
- Page structure and pure UI live at the **application level** (Next.js app).

### `packages/ui/GUIDELINES.md`
- `index.tsx` must **only** re-export the component.
- Complex components use the **Compound Components** pattern.
- Providers / hooks / constants / interfaces are split out from the component file (providers may stay co-located).
- Use `export function` (helps code splitting) — no default exports.
- One function per `.tsx` file.
- Compound/partial parts go in `<component>/_partials/`.
- Hand-written components/functions need a Vitest spec in `<component>/_tests/`.

### `packages/core/actions/GUIDELINES.md`
- Specs live in `<action>/_specs/`.
- Mocks are JSON fixture files.

## Quick decision guide

| You're adding…                          | Where it goes                          |
| --------------------------------------- | -------------------------------------- |
| A page/route/layout                     | Next.js app (consumes a module)        |
| A widget with data + UI                 | `packages/modules/<area>/<widget>/`    |
| A pure visual component                 | `packages/ui/<component>/`             |
| A data fetch / mutation / domain logic  | `packages/core/actions/<action>/`      |
| A shared domain type                    | `packages/core/entities/`              |
| Global state                            | `packages/core/states/`                |

## Examples in the repo

- Module widget: [packages/modules/dashboard/iot-events-client/](packages/modules/dashboard/iot-events-client/)
- UI compound: [packages/ui/sensor-card/](packages/ui/sensor-card/)
- Core action: [packages/core/actions/get-devices/](packages/core/actions/get-devices/)

## Before writing code

1. Decide the layer (Next app / module / ui / core) using the table above.
2. Re-read the GUIDELINES.md of that layer.
3. Match the file naming + folder convention of an existing sibling.
4. Respect the import direction — never import "upward".
