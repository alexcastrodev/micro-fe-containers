import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { AdminLayout } from './layout/AdminLayout'
import { ProtectedRoute } from './auth/ProtectedRoute'

const IotLoggers = lazy(() => import('iot/LoggersPage'))
const IotMap = lazy(() => import('iot/MapPage'))
const FinanceSummary = lazy(() => import('finance/SummaryPage'))
const FinanceTransactions = lazy(() => import('finance/TransactionsPage'))

export default function App(){
  return <BrowserRouter><Routes><Route path='/login' element={<Login/>}/><Route path='/*' element={<ProtectedRoute><AdminLayout><Suspense fallback={<div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm">Carregando remote...</div>}><Routes><Route path='/' element={<Dashboard/>}/><Route path='/iot/loggers' element={<ProtectedRoute requiredRoles={['iot-viewer']}><IotLoggers/></ProtectedRoute>}/><Route path='/iot/map' element={<ProtectedRoute requiredRoles={['iot-viewer']}><IotMap/></ProtectedRoute>}/><Route path='/finance/summary' element={<ProtectedRoute requiredRoles={['finance-viewer']}><FinanceSummary/></ProtectedRoute>}/><Route path='/finance/transactions' element={<ProtectedRoute requiredRoles={['finance-viewer']}><FinanceTransactions/></ProtectedRoute>}/></Routes></Suspense></AdminLayout></ProtectedRoute>} /></Routes></BrowserRouter>
}
