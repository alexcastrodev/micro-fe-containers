import { Link, Navigate, Route, Routes } from 'react-router-dom'
import LoggersPage from './pages/LoggersPage'
import MapPage from './pages/MapPage'
export default function App(){
  const linkClass = "rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
  return <div className="min-h-screen bg-slate-50 px-4 py-4 sm:px-6 lg:px-8 lg:py-6"><div className="mx-auto max-w-7xl space-y-5"><h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">IoT Standalone</h1><nav className="flex flex-wrap gap-2"><Link className={linkClass} to='/iot/loggers'>Loggers</Link><Link className={linkClass} to='/iot/map'>Map</Link></nav><Routes><Route path='/' element={<Navigate to='/iot/loggers' replace />} /><Route path='/iot/loggers' element={<LoggersPage/>} /><Route path='/iot/map' element={<MapPage/>} /></Routes></div></div>
}
