import { authFetch } from './http'
import type { Logger } from './types'
const base = typeof window !== 'undefined' && window.location.port === '5173' ? 'http://localhost:5174' : ''
export async function fetchLoggers(): Promise<Logger[]> { const r = await authFetch(`${base}/mocks/loggers.json`); if(!r.ok) throw new Error('loggers_fetch_error'); return r.json() }
