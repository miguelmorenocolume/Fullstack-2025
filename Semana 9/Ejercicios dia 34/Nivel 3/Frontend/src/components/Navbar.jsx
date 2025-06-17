import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav style={{ marginBottom: '1rem' }}>
      <Link to="/">Inicio</Link> |{' '}
      {!user && <Link to="/login">Iniciar Sesión</Link>}
      {user && (
        <>
          <Link to="/protegido">Zona Protegida</Link> |{' '}
          {user.isAdmin && <Link to="/admin/users">Admin Panel</Link>} |{' '}
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </>
      )}
    </nav>
  );
}
