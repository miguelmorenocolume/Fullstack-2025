import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser, setToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        email,
        password,
      });

      setUser(res.data.user);
      setToken(res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem('token', res.data.token);

      navigate('/');
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Inicio de sesión fallido');
    }
  };

  const styles = {
    container: {
      maxWidth: '400px',
      margin: '4rem auto',
      padding: '2.5rem 2rem',
      border: '1px solid #ddd',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      backgroundColor: '#fff',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    title: {
      textAlign: 'center',
      marginBottom: '2rem',
      color: '#222',
      fontWeight: '700',
      fontSize: '1.8rem',
    },
    input: {
      width: '100%',
      padding: '0.75rem 1rem',
      marginBottom: '1.2rem',
      border: '1.8px solid #ccc',
      borderRadius: '8px',
      fontSize: '1rem',
      transition: 'border-color 0.3s ease',
      outline: 'none',
      boxSizing: 'border-box',
    },
    inputFocus: {
      borderColor: '#1976d2',
      boxShadow: '0 0 5px rgba(25, 118, 210, 0.5)',
    },
    button: {
      width: '100%',
      padding: '0.75rem',
      backgroundColor: '#1976d2',
      color: '#fff',
      fontWeight: '600',
      fontSize: '1.1rem',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#145ea8',
    },
    footerText: {
      marginTop: '1.5rem',
      textAlign: 'center',
      fontSize: '0.95rem',
      color: '#555',
    },
    link: {
      color: '#1976d2',
      textDecoration: 'none',
      fontWeight: '600',
      transition: 'color 0.3s ease',
    },
    linkHover: {
      color: '#145ea8',
    },
  };

  // Para manejar el foco y que el input tenga el estilo correspondiente, uso un estado local para simplificar
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            ...styles.input,
            ...(emailFocused ? styles.inputFocus : {}),
          }}
          onFocus={() => setEmailFocused(true)}
          onBlur={() => setEmailFocused(false)}
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            ...styles.input,
            ...(passwordFocused ? styles.inputFocus : {}),
          }}
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(false)}
          autoComplete="current-password"
        />
        <button
          type="submit"
          style={styles.button}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
        >
          Entrar
        </button>
      </form>
      <p style={styles.footerText}>
        ¿No tienes cuenta?{' '}
        <Link
          to="/register"
          style={styles.link}
          onMouseEnter={e => (e.currentTarget.style.color = styles.linkHover.color)}
          onMouseLeave={e => (e.currentTarget.style.color = styles.link.color)}
        >
          Regístrate aquí
        </Link>
      </p>
    </div>
  );
};

export default Login;
