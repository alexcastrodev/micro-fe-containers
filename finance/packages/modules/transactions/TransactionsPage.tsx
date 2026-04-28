import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'
import { useAuth } from 'host/authStore'
import { fetchTransactions } from '@core/finance.api'
import type { Transaction } from '@core/types'
import { DataTable } from '@ui/DataTable'
import Forbidden from '../Forbidden'
const columns: ColumnDef<Transaction>[]=[{accessorKey:'id',header:'ID'},{accessorKey:'description',header:'Description'},{accessorKey:'category',header:'Category'},{accessorKey:'amount',header:'Amount'},{accessorKey:'status',header:'Status'},{accessorKey:'date',header:'Date'}]
export default function TransactionsPage(){
  const hasRole=useAuth((s)=>s.hasRole)
  if(!hasRole(['admin', 'finance-viewer'])) return <Forbidden />
  const [status,setStatus]=useState<'all'|'paid'|'pending'|'failed'>('all')
  const {data=[]}=useQuery({queryKey:['finance','transactions'],queryFn:fetchTransactions})
  const filtered=useMemo(()=>status==='all'?data:data.filter((d)=>d.status===status),[data,status])
  return (
    <section className="max-w-7xl space-y-6">
      <header className="space-y-1">
        <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">Finance Transactions</h1>
        <p className="text-sm text-slate-500">Filtre e acompanhe o status das transacoes.</p>
      </header>
      <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:max-w-xs">
        <label className="text-sm font-medium text-slate-700">Status</label>
        <select
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          value={status}
          onChange={(e)=>setStatus(e.target.value as typeof status)}
        >
          <option value='all'>All</option>
          <option value='paid'>Paid</option>
          <option value='pending'>Pending</option>
          <option value='failed'>Failed</option>
        </select>
      </div>
      <DataTable data={filtered} columns={columns} />
    </section>
  )
}
