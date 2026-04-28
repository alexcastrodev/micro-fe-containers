import { authFetch } from './http'
import type { KpiSet, Transaction } from './types'
const base = typeof window !== 'undefined' && window.location.port === '5173' ? 'http://localhost:5175' : ''
export async function fetchSummary(): Promise<KpiSet> { const r = await authFetch(`${base}/mocks/summary.json`); if(!r.ok) throw new Error('summary_fetch_error'); return r.json() }
export async function fetchTransactions(): Promise<Transaction[]> { const r = await authFetch(`${base}/mocks/transactions.json`); if(!r.ok) throw new Error('transactions_fetch_error'); return r.json() }
