import React, { useState } from 'react';

const API_URL = 'http://localhost:4000';

async function register(username, password) {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

async function login(username, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error('Login failed');
  const data = await res.json();
  return data.token; // guarda token
}

async function getDashboard(token) {
  const res = await fetch(`${API_URL}/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('No autorizado');
  return res.json();
}

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [dashboardMsg, setDashboardMsg] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    setError('');
    try {
      const data = await register(username, password);
      alert(data.message);
    } catch (e) {
      setError('Error en registro');
    }
  };

  const handleLogin = async () => {
    setError('');
    try {
      const t = await login(username, password);
      setToken(t);
      setDashboardMsg('');
    } catch (e) {
      setError('Login fallido');
    }
  };

  const fetchDashboard = async () => {
    setError('');
    try {
      const data = await getDashboard(token);
      setDashboardMsg(data.message);
    } catch (e) {
      setError('Acceso denegado al dashboard');
      setDashboardMsg('');
    }
  };

  const handleLogout = () => {
    setToken('');
    setDashboardMsg('');
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h1>Autenticación Prisma/Mongoose</h1>

      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <br />

      <button onClick={handleRegister}>Registrar</button>
      <button onClick={handleLogin} disabled={!!token}>Login</button>
      <button onClick={fetchDashboard} disabled={!token}>Dashboard</button>
      <button onClick={handleLogout} disabled={!token}>Logout</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {dashboardMsg && <p style={{ marginTop: 20 }}>{dashboardMsg}</p>}
    </div>
  );
}
