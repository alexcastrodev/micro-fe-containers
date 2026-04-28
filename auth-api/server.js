import jsonServer from 'json-server'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, 'db.json')
const server = jsonServer.create()
const router = jsonServer.router(dbPath)

server.use(jsonServer.defaults())
server.use(jsonServer.bodyParser)

server.post('/login', (req, res) => {
  const { username, password } = req.body ?? {}
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'))
  const user = db.users.find((u) => u.username === username && u.password === password)
  if (!user) return res.status(401).json({ error: 'invalid_credentials' })
  const token = Buffer.from(`${user.id}:${Date.now()}`).toString('base64')
  const { password: _pw, ...safeUser } = user
  res.json({ token, user: safeUser })
})

server.use(router)
server.listen(4000, () => console.log('auth-api running on :4000'))
