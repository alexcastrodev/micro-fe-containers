import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/store'

export function AdminLayout({children}:{children:React.ReactNode}){
  const hasRole=useAuth((s)=>s.hasRole)
  const user=useAuth((s)=>s.user)
  const logout=useAuth((s)=>s.logout)
  const navigate=useNavigate()
  const navClass = ({ isActive }: { isActive: boolean }) =>
    `block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      isActive ? 'bg-blue-600 text-white' : 'text-slate-200 hover:bg-slate-800 hover:text-white'
    }`
  return (
    <div className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="bg-slate-900 p-4 lg:min-h-screen">
        <div className="mx-auto max-w-7xl lg:max-w-none">
          <h3 className="mb-4 text-lg font-semibold text-white">Kurz Panel</h3>
          <nav className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-1">
            <NavLink to="/" end className={navClass}>Dashboard</NavLink>
            {hasRole(['iot-viewer']) && (
              <>
                <NavLink to="/iot/loggers" className={navClass}>IoT Loggers</NavLink>
                <NavLink to="/iot/map" className={navClass}>IoT Map</NavLink>
              </>
            )}
            {hasRole(['finance-viewer']) && (
              <>
                <NavLink to="/finance/summary" className={navClass}>Finance Summary</NavLink>
                <NavLink to="/finance/transactions" className={navClass}>Finance Transactions</NavLink>
              </>
            )}
          </nav>
        </div>
      </aside>
      <div className="bg-slate-50">
        <header className="border-b border-slate-200 bg-white px-4 py-3 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm font-medium text-slate-700">{user?.name}</span>
            <button
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              onClick={() => {
                logout()
                navigate('/login', { replace: true })
              }}
            >
              Logout
            </button>
          </div>
        </header>
        <main className="px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
