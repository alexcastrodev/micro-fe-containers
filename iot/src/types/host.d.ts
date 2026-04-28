declare module 'host/authStore' {
  export type Role = 'admin' | 'iot-viewer' | 'finance-viewer'
  export interface AuthUser { id:number; username:string; name:string; roles:Role[] }
  interface AuthState { user:AuthUser|null; token:string|null; roles:Role[]; login:(u:string,p:string)=>Promise<void>; logout:()=>void; hasRole:(roles:Role[])=>boolean }
  export const useAuth: ((selector: (state: AuthState) => any) => any) & { getState: () => AuthState }
}
