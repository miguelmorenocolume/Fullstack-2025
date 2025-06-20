import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '@/context/AuthContext';

export default function LoginPage() {
  // Estados Login
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const { login } = useContext(AuthContext);
  const router = useRouter();

  // Estados Registro
  const [emailRegister, setEmailRegister] = useState('');
  const [passwordRegister, setPasswordRegister] = useState('');
  const [registerMessage, setRegisterMessage] = useState('');

  // Manejador Login
  const handleLogin = async e => {
    e.preventDefault();
    const success = await login(emailLogin, passwordLogin);
    if (success) {
      router.push('/dashboard');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  // Manejador Registro
  const handleRegister = async e => {
    e.preventDefault();
    setRegisterMessage('Registrando...');

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: emailRegister, password: passwordRegister }),
    });

    const data = await res.json();

    if (res.ok) {
      setRegisterMessage('Registro exitoso, ya puedes iniciar sesión');
      setEmailRegister('');
      setPasswordRegister('');
    } else {
      setRegisterMessage(data.error || 'Error en el registro');
    }
  };

  return (
    <div>
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo"
          value={emailLogin}
          onChange={e => setEmailLogin(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Contraseña"
          value={passwordLogin}
          onChange={e => setPasswordLogin(e.target.value)}
          required
        />
        <br />
        <button type="submit">Entrar</button>
      </form>

      <hr />

      <h2>Registrarse</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Correo"
          value={emailRegister}
          onChange={e => setEmailRegister(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Contraseña"
          value={passwordRegister}
          onChange={e => setPasswordRegister(e.target.value)}
          required
        />
        <br />
        <button type="submit">Registrar</button>
      </form>
      {registerMessage && <p>{registerMessage}</p>}
    </div>
  );
}
