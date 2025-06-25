import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{ padding: '10px 20px', borderBottom: '1px solid #ccc', marginBottom: 20 }}>
      <Link to="/" style={{ marginRight: 15 }}>
        Home
      </Link>

      <Link to="/dashboard" style={{ marginRight: 15 }}>
        Dashboard
      </Link>

      {user ? (
        <>
          <span style={{ marginRight: 15 }}>Hola, {user.username}</span>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginRight: 15 }}>
            Login
          </Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
