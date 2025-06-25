import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 600);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const styles = {
    navbar: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      color: '#333333',
      padding: '0.8rem 1rem',
      borderBottom: '1px solid #e0e0e0',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
      position: 'sticky',
      top: 0,
      zIndex: 10,
      overflowX: 'auto',
      whiteSpace: 'nowrap',
    },
    logo: {
      fontWeight: 'bold',
      color: '#333',
      textDecoration: 'none',
      flexShrink: 0,
      fontSize: isMobile ? '1rem' : '1.4rem',
      width: isMobile ? '40px' : 'auto',
      textAlign: 'center',
      display: 'block',
    },
    section: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '0.8rem',
      flexShrink: 0,
    },
    link: {
      color: '#333',
      textDecoration: 'none',
      fontWeight: '500',
      fontSize: '0.95rem',
      padding: '0.3rem 0.6rem',
      borderRadius: '6px',
      transition: 'color 0.3s ease, background-color 0.3s ease',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
    },
    linkHover: {
      color: '#1976d2',
      backgroundColor: '#e6f0ff',
    },
    user: {
      fontWeight: '500',
      color: '#1976d2',
      fontSize: '0.95rem',
      whiteSpace: 'nowrap',
    },
    button: {
      backgroundColor: '#ffe6e6',
      border: '1px solid #ff4d4d',
      color: '#cc0000',
      padding: '0.25rem 0.5rem',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.85rem',
      transition: 'background-color 0.3s ease, color 0.3s ease',
      whiteSpace: 'nowrap',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: isMobile ? '32px' : 'auto',
      paddingLeft: isMobile ? '0' : '0.5rem',
      paddingRight: isMobile ? '0' : '0.5rem',
    },
    buttonHover: {
      backgroundColor: '#ff4d4d',
      color: '#fff',
    },
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.section}>
        <Link to="/" style={styles.logo}>
          {isMobile ? 'Mp' : "Michael's Posts"}
        </Link>
      </div>
      <div style={styles.section}>
        {user ? (
          <>
            <Link
              to="/dashboard"
              style={styles.link}
              onMouseOver={e => {
                e.currentTarget.style.color = styles.linkHover.color;
                e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor;
              }}
              onMouseOut={e => {
                e.currentTarget.style.color = styles.link.color;
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Dashboard
            </Link>
            <span style={styles.user}>Hola, {user.username}</span>
            <button
              aria-label="Cerrar sesión"
              style={styles.button}
              onMouseOver={e => {
                e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor;
                e.currentTarget.style.color = styles.buttonHover.color;
              }}
              onMouseOut={e => {
                e.currentTarget.style.backgroundColor = styles.button.backgroundColor;
                e.currentTarget.style.color = styles.button.color;
              }}
              onClick={logout}
              title="Cerrar sesión"
            >
              {isMobile ? '❌' : 'Cerrar sesión'}
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={styles.link}
              onMouseOver={e => {
                e.currentTarget.style.color = styles.linkHover.color;
                e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor;
              }}
              onMouseOut={e => {
                e.currentTarget.style.color = styles.link.color;
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Iniciar sesión
            </Link>
            <Link
              to="/register"
              style={styles.link}
              onMouseOver={e => {
                e.currentTarget.style.color = styles.linkHover.color;
                e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor;
              }}
              onMouseOut={e => {
                e.currentTarget.style.color = styles.link.color;
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
