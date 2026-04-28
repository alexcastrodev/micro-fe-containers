
// Windows temporarily needs this file, https://github.com/module-federation/vite/issues/68

    import {loadShare} from "@module-federation/runtime";
    const importMap = {
      
        "@tanstack/react-query": async () => {
          let pkg = await import("__mf__virtual/__mfe_internal__finance__prebuild___mf_0_tanstack_mf_1_react_mf_2_query__prebuild__.js");
            return pkg;
        }
      ,
        "react": async () => {
          let pkg = await import("__mf__virtual/__mfe_internal__finance__prebuild__react__prebuild__.js");
            return pkg;
        }
      ,
        "react-dom": async () => {
          let pkg = await import("__mf__virtual/__mfe_internal__finance__prebuild__react_mf_2_dom__prebuild__.js");
            return pkg;
        }
      ,
        "react-dom/client": async () => {
          let pkg = await import("__mf__virtual/__mfe_internal__finance__prebuild__react_mf_2_dom_mf_1_client__prebuild__.js");
            return pkg;
        }
      ,
        "react-router-dom": async () => {
          let pkg = await import("__mf__virtual/__mfe_internal__finance__prebuild__react_mf_2_router_mf_2_dom__prebuild__.js");
            return pkg;
        }
      ,
        "react/jsx-dev-runtime": async () => {
          let pkg = await import("__mf__virtual/__mfe_internal__finance__prebuild__react_mf_1_jsx_mf_2_dev_mf_2_runtime__prebuild__.js");
            return pkg;
        }
      ,
        "react/jsx-runtime": async () => {
          let pkg = await import("__mf__virtual/__mfe_internal__finance__prebuild__react_mf_1_jsx_mf_2_runtime__prebuild__.js");
            return pkg;
        }
      ,
        "zustand": async () => {
          let pkg = await import("__mf__virtual/__mfe_internal__finance__prebuild__zustand__prebuild__.js");
            return pkg;
        }
      
    }
      const usedShared = {
      
          "@tanstack/react-query": {
            name: "@tanstack/react-query",
            version: "5.100.6",
            scope: ["default"],
            loaded: false,
            from: "__mfe_internal__finance",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"@tanstack/react-query"}' must be provided by host`);
              }
              usedShared["@tanstack/react-query"].loaded = true
              const {"@tanstack/react-query": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "@tanstack/react-query" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^5.100.6",
              
            }
          }
        ,
          "react": {
            name: "react",
            version: "19.2.5",
            scope: ["default"],
            loaded: false,
            from: "__mfe_internal__finance",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"react"}' must be provided by host`);
              }
              usedShared["react"].loaded = true
              const {"react": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "react" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^19.2.5",
              
            }
          }
        ,
          "react-dom": {
            name: "react-dom",
            version: "19.2.5",
            scope: ["default"],
            loaded: false,
            from: "__mfe_internal__finance",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"react-dom"}' must be provided by host`);
              }
              usedShared["react-dom"].loaded = true
              const {"react-dom": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "react-dom" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^19.2.5",
              
            }
          }
        ,
          "react-dom/client": {
            name: "react-dom/client",
            version: "19.2.5",
            scope: ["default"],
            loaded: false,
            from: "__mfe_internal__finance",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"react-dom/client"}' must be provided by host`);
              }
              usedShared["react-dom/client"].loaded = true
              const {"react-dom/client": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "react-dom/client" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^19.2.5",
              
            }
          }
        ,
          "react-router-dom": {
            name: "react-router-dom",
            version: "6.30.3",
            scope: ["default"],
            loaded: false,
            from: "__mfe_internal__finance",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"react-router-dom"}' must be provided by host`);
              }
              usedShared["react-router-dom"].loaded = true
              const {"react-router-dom": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "react-router-dom" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^6.30.3",
              
            }
          }
        ,
          "react/jsx-dev-runtime": {
            name: "react/jsx-dev-runtime",
            version: "19.2.5",
            scope: ["default"],
            loaded: false,
            from: "__mfe_internal__finance",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"react/jsx-dev-runtime"}' must be provided by host`);
              }
              usedShared["react/jsx-dev-runtime"].loaded = true
              const {"react/jsx-dev-runtime": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "react/jsx-dev-runtime" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^19.2.5",
              
            }
          }
        ,
          "react/jsx-runtime": {
            name: "react/jsx-runtime",
            version: "19.2.5",
            scope: ["default"],
            loaded: false,
            from: "__mfe_internal__finance",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"react/jsx-runtime"}' must be provided by host`);
              }
              usedShared["react/jsx-runtime"].loaded = true
              const {"react/jsx-runtime": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "react/jsx-runtime" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^19.2.5",
              
            }
          }
        ,
          "zustand": {
            name: "zustand",
            version: "5.0.12",
            scope: ["default"],
            loaded: false,
            from: "__mfe_internal__finance",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"zustand"}' must be provided by host`);
              }
              usedShared["zustand"].loaded = true
              const {"zustand": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "zustand" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^5.0.12",
              
            }
          }
        
    }
      const usedRemotes = [
                {
                  entryGlobalName: "host",
                  name: "host",
                  type: "module",
                  entry: "http://localhost:5173/remoteEntry.js",
                  shareScope: "default",
                }
          
      ]
      export {
        usedShared,
        usedRemotes
      }
      