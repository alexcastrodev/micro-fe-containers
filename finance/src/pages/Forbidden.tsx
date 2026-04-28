import React from 'react';
export default function Forbidden() {
  return (
    <section className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-rose-900">
      <h2 className="text-xl font-semibold">403 - Forbidden</h2>
      <p className="mt-2 text-sm">Voce nao tem permissao para acessar esta pagina.</p>
    </section>
  );
}
