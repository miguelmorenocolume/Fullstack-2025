// Importa React y el hook useState para manejar estados locales
import React, { useState } from 'react';

// Componente principal de la aplicación
function App() {
  // Estados para token de autenticación, usuario, contraseña y mensaje del dashboard
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [dashboardMsg, setDashboardMsg] = useState('');

  // URL de la API, se obtiene desde las variables de entorno
  const API_URL = import.meta.env.VITE_API_URL;

  // Función para registrar un nuevo usuario
  const register = async () => {
    try {
      // Hace una petición POST a la ruta /register de la API
      const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }), // Envía los datos como JSON
      });

      const data = await res.json(); // Convierte la respuesta en JSON
      alert(data.message); // Muestra el mensaje recibido (éxito o error)
    } catch (error) {
      console.error('Error en registro:', error); // Log en consola para desarrollo
      alert('Error al registrar. Intenta más tarde.'); // Mensaje al usuario
    }
  };

  // Función para hacer login del usuario
  const login = async () => {
    try {
      // Hace una petición POST a la ruta /login
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      // Si la respuesta es OK y hay token, guarda el token en el estado
      if (res.ok && data.token) {
        setToken(data.token);
        alert('Login correcto');
      } else {
        alert(data.message || 'Error de login'); // Mensaje de error si algo falla
      }
    } catch (error) {
      console.error('Error en login:', error);
      alert('Error al iniciar sesión. Intenta más tarde.');
    }
  };

  // Función para obtener el dashboard protegido
  const getDashboard = async () => {
    try {
      // Hace una petición GET a /dashboard con el token en el header
      const res = await fetch(`${API_URL}/dashboard`, {
        headers: { Authorization: 'Bearer ' + token },
      });

      const data = await res.json();

      // Si la petición fue exitosa, muestra el mensaje recibido
      if (res.ok) {
        setDashboardMsg(data.message);
      } else {
        setDashboardMsg(data.message || 'Acceso denegado');
      }
    } catch (error) {
      console.error('Error al obtener dashboard:', error);
      setDashboardMsg('Error al cargar el dashboard.');
    }
  };

  // Renderiza el formulario de login/registro y el botón del dashboard
  return (
    <div style={{ padding: 20 }}>
      <h1>Registro / Login</h1>

      {/* Input para el nombre de usuario */}
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />

      {/* Input para la contraseña */}
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      {/* Botones para registrar y loguear */}
      <button onClick={register}>Registrar</button>
      <button onClick={login}>Login</button>

      <hr />

      {/* Botón para ver el dashboard, solo si hay token */}
      <button onClick={getDashboard} disabled={!token}>
        Ver Dashboard
      </button>

      {/* Muestra el mensaje del dashboard */}
      <p>{dashboardMsg}</p>
    </div>
  );
}

// Exporta el componente como default para que pueda ser usado en main.jsx
export default App;
