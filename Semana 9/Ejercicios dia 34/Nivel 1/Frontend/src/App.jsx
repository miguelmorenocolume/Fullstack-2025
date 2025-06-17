import { Link } from 'react-router-dom';

export default function App() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Sesión cerrada');
  };

  return (
    <div>
      <nav>
        <Link to="/login">Iniciar Sesión</Link> |{' '}
        <Link to="/protegido">Ir a Ruta Protegida</Link> |{' '}
        <button onClick={handleLogout}>Cerrar Sesión</button>
      </nav>
    </div>
  );
}
