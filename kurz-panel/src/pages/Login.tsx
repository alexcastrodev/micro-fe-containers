import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/store'

type MockUser = {
  id: number
  username: string
  password: string
}

export default function Login(){
  const user=useAuth((s)=>s.user)
  const login=useAuth((s)=>s.login)
  const navigate=useNavigate()
  const [username,setUsername]=useState('admin')
  const [password,setPassword]=useState('admin123')
  const [error,setError]=useState('')
  const [mockUsers, setMockUsers] = useState<MockUser[]>([])

  useEffect(() => {
    fetch('http://localhost:4000/users')
      .then((res) => res.json())
      .then((data) => setMockUsers(Array.isArray(data) ? data : []))
      .catch(() => setMockUsers([]))
  }, [])

  if(user) return <Navigate to="/" replace />
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 px-4 py-10 sm:px-6">
      <div className="mx-auto flex w-full max-w-sm flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-slate-900">Login</h2>
          <p className="text-sm text-slate-500">Acesse o painel com seu usuario do mock server.</p>
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            try {
              await login(username, password)
              navigate('/')
            } catch {
              setError('Credenciais invalidas')
            }
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium text-slate-700">
              Login
            </label>
            <input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-slate-500 focus:ring-2 focus:ring-slate-300"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-slate-700">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-slate-500 focus:ring-2 focus:ring-slate-300"
            />
          </div>
          {error && <small className="block text-sm text-red-600">{error}</small>}
          <button
            type="submit"
            className="w-full rounded-md bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
          >
            Entrar
          </button>
        </form>
        {mockUsers.length > 0 && (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <strong className="text-xs font-semibold uppercase tracking-wide text-slate-600">
              Usuarios do mock server (clique para preencher)
            </strong>
            <ul className="mt-2 space-y-1.5">
              {mockUsers.map((mockUser) => (
                <li key={mockUser.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setUsername(mockUser.username)
                      setPassword(mockUser.password)
                      setError('')
                    }}
                    className="w-full rounded-md border border-transparent px-2 py-1.5 text-left text-xs text-slate-700 transition-colors hover:border-slate-200 hover:bg-white focus:outline-none focus:ring-2 focus:ring-slate-300"
                  >
                    login: <code className="font-semibold text-slate-900">{mockUser.username}</code> | senha:{' '}
                    <code className="font-semibold text-slate-900">{mockUser.password}</code>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
