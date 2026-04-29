import { lazy, Suspense, useMemo, useState, type ComponentType } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { AdminLayout } from './layout/AdminLayout'
import { ProtectedRoute } from './auth/ProtectedRoute'
import { RemoteErrorBoundary } from './layout/RemoteErrorBoundary'
import { loadRemoteComponent } from './mf-runtime-plugin'

function RemoteRoute({ name, remoteId }: { name: string; remoteId: string }) {
  const [attempt, setAttempt] = useState(0)
  const Component = useMemo(
    () => lazy(() => loadRemoteComponent<ComponentType>(remoteId)),
    [remoteId, attempt],
  )
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

const remote = (remoteId: string, name: string, roles: string[]) => (
  <ProtectedRoute requiredRoles={roles}>
    <RemoteRoute name={name} remoteId={remoteId} />
  </ProtectedRoute>
)

function AdminRoutes() {
  const location = useLocation()
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Dashboard />} />
      <Route
        path="/iot/loggers"
        element={remote('iot/LoggersPage', 'IoT Loggers', ['iot-viewer'])}
      />
      <Route
        path="/iot/map"
        element={remote('iot/MapPage', 'IoT Map', ['iot-viewer'])}
      />
      <Route
        path="/finance/summary"
        element={remote('finance/SummaryPage', 'Finance Summary', ['finance-viewer'])}
      />
      <Route
        path="/finance/transactions"
        element={remote('finance/TransactionsPage', 'Finance Transactions', ['finance-viewer'])}
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
