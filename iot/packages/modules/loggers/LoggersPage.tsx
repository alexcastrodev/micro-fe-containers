import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useAuth } from 'host/authStore'
import { fetchLoggers } from '@core/loggers.api'
import type { Logger } from '@core/types'
import { DataTable } from '@ui/DataTable'
import { ChartCard } from '@ui/ChartCard'
import Forbidden from '../Forbidden'
const columns: ColumnDef<Logger>[] = [{accessorKey:'id',header:'ID'},{accessorKey:'deviceId',header:'Device'},{accessorKey:'watts',header:'Watts'},{accessorKey:'timestamp',header:'Timestamp'},{accessorKey:'status',header:'Status'}]
export default function LoggersPage(){
  const hasRole=useAuth((s)=>s.hasRole)
  if(!hasRole(['admin', 'iot-viewer'])) return <Forbidden />
  const { data=[] } = useQuery({queryKey:['iot','loggers'],queryFn:fetchLoggers})
  const lineData=useMemo(()=>data.map((r)=>({name:r.deviceId,watts:r.watts})),[data])
  const barData=useMemo(()=>{const m=new Map<string,number>();for(const r of data)m.set(r.deviceId,(m.get(r.deviceId)??0)+r.watts);return [...m.entries()].map(([device,watts])=>({device,watts}))},[data])
  return (
    <section className="max-w-7xl space-y-6">
      <header className="space-y-1">
        <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">IoT Loggers</h1>
        <p className="text-sm text-slate-500">Consumo energetico por dispositivo e historico de leituras.</p>
      </header>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <ChartCard title='Watts timeline'>
          <ResponsiveContainer width='100%' height={220}><LineChart data={lineData}><CartesianGrid strokeDasharray='3 3'/><XAxis dataKey='name'/><YAxis/><Tooltip/><Line type='monotone' dataKey='watts' stroke='#2563eb'/></LineChart></ResponsiveContainer>
        </ChartCard>
        <ChartCard title='Watts by device'>
          <ResponsiveContainer width='100%' height={220}><BarChart data={barData}><CartesianGrid strokeDasharray='3 3'/><XAxis dataKey='device'/><YAxis/><Tooltip/><Legend/><Bar dataKey='watts' fill='#10b981'/></BarChart></ResponsiveContainer>
        </ChartCard>
      </section>
      <DataTable data={data} columns={columns} />
    </section>
  )
}
