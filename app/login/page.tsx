'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      if (email === 'admin@gmail.com' && password === 'admin123') {
        const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString()
        document.cookie = `admin_auth=true; Path=/; SameSite=Lax; Expires=${expires}`
        router.replace('/dashboard')
      } else {
        setError('Invalid credentials')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: 16 }}>
      <form onSubmit={onSubmit} style={{ width: 360, display: 'flex', flexDirection: 'column', gap: 12, border: '1px solid #e5e7eb', borderRadius: 8, padding: 16 }}>
        <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Admin Login</h1>
        <label htmlFor="email" style={{ fontSize: 14 }}>Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@gmail.com"
          required
          style={{ padding: 10, border: '1px solid #d1d5db', borderRadius: 6 }}
        />
        <label htmlFor="password" style={{ fontSize: 14 }}>Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          style={{ padding: 10, border: '1px solid #d1d5db', borderRadius: 6 }}
        />
        {error ? (
          <div style={{ color: '#b91c1c', fontSize: 13 }}>{error}</div>
        ) : null}
        <button type="submit" disabled={loading} style={{ marginTop: 8, padding: 10, background: '#111827', color: 'white', borderRadius: 6, cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
        <div style={{ fontSize: 12, color: '#6b7280' }}>Use admin@gmail.com / admin123</div>
      </form>
    </div>
  )
}


