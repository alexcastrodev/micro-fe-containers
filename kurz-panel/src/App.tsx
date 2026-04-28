import { lazy, Suspense, useMemo, useState, type ComponentType } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { AdminLayout } from './layout/AdminLayout'
import { ProtectedRoute } from './auth/ProtectedRoute'
import { RemoteErrorBoundary } from './layout/RemoteErrorBoundary'

type RemoteImport = () => Promise<{ default: ComponentType }>

function RemoteRoute({ name, load }: { name: string; load: RemoteImport }) {
  const [attempt, setAttempt] = useState(0)
  const Component = useMemo(() => lazy(load), [load, attempt])
  return (
    <RemoteErrorBoundary name={name} onReset={() => setAttempt((n) => n + 1)} resetKey={attempt}>
      <Suspense
        fallback={
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm">
            Carregando {name}...
          </div>
        }
      >
        <Component />
      </Suspense>
    </RemoteErrorBoundary>
  )
}

const remote = (load: RemoteImport, name: string, roles: string[]) => (
  <ProtectedRoute requiredRoles={roles}>
    <RemoteRoute name={name} load={load} />
  </ProtectedRoute>
)

function AdminRoutes() {
  const location = useLocation()
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Dashboard />} />
      <Route
        path="/iot/loggers"
        element={remote(() => import('iot/LoggersPage'), 'IoT Loggers', ['iot-viewer'])}
      />
      <Route
        path="/iot/map"
        element={remote(() => import('iot/MapPage'), 'IoT Map', ['iot-viewer'])}
      />
      <Route
        path="/finance/summary"
        element={remote(() => import('finance/SummaryPage'), 'Finance Summary', ['finance-viewer'])}
      />
      <Route
        path="/finance/transactions"
        element={remote(
          () => import('finance/TransactionsPage'),
          'Finance Transactions',
          ['finance-viewer'],
        )}
      />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminRoutes />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
