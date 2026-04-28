import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable, type ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'
export function DataTable<T>({ data, columns }: { data: T[]; columns: ColumnDef<T>[] }) {
const [sorting,setSorting]=useState([])
const table=useReactTable({data,columns,state:{sorting},onSortingChange:setSorting,getCoreRowModel:getCoreRowModel(),getSortedRowModel:getSortedRowModel()})
return (
  <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50">
          {table.getHeaderGroups().map((g)=><tr key={g.id}>{g.headers.map((h)=><th key={h.id} onClick={h.column.getToggleSortingHandler()} className="cursor-pointer px-4 py-3 text-left font-semibold text-slate-700">{flexRender(h.column.columnDef.header,h.getContext())}</th>)}</tr>)}
        </thead>
        <tbody className="divide-y divide-slate-100">
          {table.getRowModel().rows.map((r)=><tr key={r.id} className="hover:bg-slate-50/80">{r.getVisibleCells().map((c)=><td key={c.id} className="px-4 py-3 text-slate-700">{flexRender(c.column.columnDef.cell,c.getContext())}</td>)}</tr>)}
        </tbody>
      </table>
    </div>
  </div>
)
}
