import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function getCurrentUser() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const usuario = getCurrentUser();
    setUser(usuario);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/login'; 
  };

  return (
    <div>

      <nav style={{ marginBottom: '1rem' }}>
        <Link to="/">Inicio</Link> |{' '}
        {!user && <Link to="/login">Iniciar Sesión</Link>}
        {user && (
          <>
            <Link to="/protegido">Zona Protegida</Link> |{' '}
            {user.isAdmin && <Link to="/admin">Admin Panel</Link>} |{' '}
            <button onClick={handleLogout}>Cerrar Sesión</button>
          </>
        )}
      </nav>
      <div>
        {user ? (
          <p>Bienvenido, {user.email} {user.isAdmin && '(Admin)'}</p>
        ) : (
          <p>No has iniciado sesión.</p>
        )}
      </div>
    </div>
  );
}
