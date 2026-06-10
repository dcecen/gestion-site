import React, { useState } from 'react'
import Landing from './landing'
import Dashboard from './dashboard'

export default function App() {
  const [user, setUser] = useState(null)

  function login(userData) { setUser(userData) }
  function logout() { setUser(null) }

  if (!user) return <Landing onLogin={login} />
  return <Dashboard user={user} onLogout={logout} />
}
