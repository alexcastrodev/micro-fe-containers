import { Navigate } from 'react-router-dom'
import type { Role } from '@core/types'
import { useAuth } from './store'

export function ProtectedRoute({children,requiredRoles}:{children:React.ReactNode;requiredRoles?:Role[]}){
  const user=useAuth((s)=>s.user)
  const hasRole=useAuth((s)=>s.hasRole)
  if(!user) return <Navigate to="/login" replace />
  if(requiredRoles && !hasRole(requiredRoles)) return <div>403 - Forbidden</div>
  return <>{children}</>
}
