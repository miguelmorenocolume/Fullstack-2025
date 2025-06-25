import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, { username, email, password });
      alert('Usuario registrado');
      navigate('/login');
    } catch (err) {
      alert('Error al registrarse');
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
    loginPrompt: {
      marginTop: '1.5rem',
      textAlign: 'center',
      fontSize: '0.95rem',
      color: '#444',
    },
    loginLink: {
      color: '#1976d2',
      textDecoration: 'none',
      fontWeight: '600',
      marginLeft: '0.3rem',
    },
  };

  const [usernameFocused, setUsernameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  return (
    <form onSubmit={handleSubmit} style={styles.container}>
      <h2 style={styles.title}>Registrarse</h2>
      <input
        type="text"
        placeholder="Usuario"
        onChange={e => setUsername(e.target.value)}
        required
        style={{
          ...styles.input,
          ...(usernameFocused ? styles.inputFocus : {}),
        }}
        onFocus={() => setUsernameFocused(true)}
        onBlur={() => setUsernameFocused(false)}
        autoComplete="username"
      />
      <input
        type="email"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
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
        onChange={e => setPassword(e.target.value)}
        required
        style={{
          ...styles.input,
          ...(passwordFocused ? styles.inputFocus : {}),
        }}
        onFocus={() => setPasswordFocused(true)}
        onBlur={() => setPasswordFocused(false)}
        autoComplete="new-password"
      />
      <button
        type="submit"
        style={styles.button}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
      >
        Registrarse
      </button>

      <p style={styles.loginPrompt}>
        ¿Ya tienes cuenta?
        <Link to="/login" style={styles.loginLink}>
          Inicia sesión aquí
        </Link>
      </p>
    </form>
  );
};

export default Register;
