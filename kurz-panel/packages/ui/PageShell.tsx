export function PageShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="max-w-7xl space-y-3">
      <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">{title}</h1>
      <div className="rounded-xl border border-slate-200 bg-white p-4 text-slate-700 shadow-sm sm:p-6">
        {children}
      </div>
    </section>
  )
}
