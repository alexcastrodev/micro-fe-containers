import { useQuery } from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'
import { useAuth } from 'host/authStore'
import { fetchSummary, fetchTransactions } from '@core/finance.api'
import type { Transaction } from '@core/types'
import { KpiCard } from '@ui/KpiCard'
import { DataTable } from '@ui/DataTable'
import Forbidden from '../Forbidden'
const columns: ColumnDef<Transaction>[]=[{accessorKey:'id',header:'ID'},{accessorKey:'description',header:'Description'},{accessorKey:'amount',header:'Amount'},{accessorKey:'status',header:'Status'}]
export default function SummaryPage(){
  const hasRole=useAuth((s)=>s.hasRole)
  if(!hasRole(['admin', 'finance-viewer'])) return <Forbidden />
  const {data:summary}=useQuery({queryKey:['finance','summary'],queryFn:fetchSummary})
  const {data=[]}=useQuery({queryKey:['finance','transactions'],queryFn:fetchTransactions})
  const top=[...data].sort((a,b)=>b.amount-a.amount).slice(0,10)
  return (
    <section className="max-w-7xl space-y-6">
      <header className="space-y-1">
        <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">Finance Summary</h1>
        <p className="text-sm text-slate-500">Visao geral dos principais indicadores financeiros.</p>
      </header>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label='Receita' value={summary?.revenue??0}/>
        <KpiCard label='Despesa' value={summary?.expense??0}/>
        <KpiCard label='Saldo' value={summary?.balance??0}/>
        <KpiCard label='Count' value={summary?.count??0}/>
      </section>
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-800">Top transacoes por valor</h2>
        <DataTable data={top} columns={columns} />
      </section>
    </section>
  )
}
