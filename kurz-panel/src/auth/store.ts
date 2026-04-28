import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Role } from '@core/types'

export interface AuthUser { id:number; username:string; name:string; roles:Role[] }
interface AuthState { user:AuthUser|null; token:string|null; roles:Role[]; login:(u:string,p:string)=>Promise<void>; logout:()=>void; hasRole:(roles:Role[])=>boolean }

export const useAuth = create<AuthState>()(persist((set,get)=>({
  user:null,token:null,roles:[],
  login: async (username,password)=>{
    const res=await fetch('http://localhost:4000/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username,password})})
    if(!res.ok) throw new Error('invalid_credentials')
    const data=await res.json() as {token:string;user:AuthUser}
    set({user:data.user,token:data.token,roles:data.user.roles})
  },
  logout:()=>set({user:null,token:null,roles:[]}),
  hasRole:(required)=> get().roles.includes('admin') || required.some((r)=>get().roles.includes(r)),
}),{name:'kurz-panel-auth'}))
