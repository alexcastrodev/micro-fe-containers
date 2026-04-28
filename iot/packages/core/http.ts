import { useAuth } from 'host/authStore'
export async function authFetch(input: RequestInfo | URL, init: RequestInit = {}) {
  const token = useAuth.getState().token
  const headers = new Headers(init.headers)
  if (token) headers.set('Authorization', `Bearer ${token}`)
  return fetch(input, { ...init, headers })
}
