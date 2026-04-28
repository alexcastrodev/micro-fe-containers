import { authFetch } from './http'
import type { Zone } from './types'
const base = typeof window !== 'undefined' && window.location.port === '5173' ? 'http://localhost:5174' : ''
export async function fetchZones(): Promise<Zone[]> { const r = await authFetch(`${base}/mocks/zones.json`); if(!r.ok) throw new Error('zones_fetch_error'); return r.json() }
