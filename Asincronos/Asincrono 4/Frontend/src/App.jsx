// src/App.jsx
import React, { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [dashboardMsg, setDashboardMsg] = useState('');

  const register = async () => {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    alert(data.message);
  };

  const login = async () => {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.token) {
      setToken(data.token);
      alert('Login correcto');
    } else {
      alert(data.message);
    }
  };

  const getDashboard = async () => {
    const res = await fetch(`${API_URL}/dashboard`, {
      headers: { Authorization: 'Bearer ' + token },
    });
    const data = await res.json();
    if (res.ok) {
      setDashboardMsg(data.message);
    } else {
      setDashboardMsg(data.message || 'Acceso denegado');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Registro / Login</h1>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={register}>Registrar</button>
      <button onClick={login}>Login</button>
      <hr />
      <button onClick={getDashboard} disabled={!token}>
        Ver Dashboard
      </button>
      <p>{dashboardMsg}</p>
    </div>
  );
}

export default App;
