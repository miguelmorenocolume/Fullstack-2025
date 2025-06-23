import { useState } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      router.push('/dashboard');
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div className="container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Correo electrónico"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          onChange={handleChange}
          required
        />
        <button type="submit">Entrar</button>
      </form>
      {message && <p className="error">{message}</p>}
      <p className="link">
        ¿No tienes cuenta? <a href="/register">Regístrate</a>
      </p>

      <style jsx>{`
        .container {
          max-width: 400px;
          margin: 4rem auto;
          padding: 2rem;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
        }

        h2 {
          margin-bottom: 1.5rem;
          text-align: center;
          color: #111827;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        input {
          padding: 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s;
        }

        input:focus {
          border-color: #2563eb;
          outline: none;
        }

        button {
          background-color: #2563eb;
          color: white;
          padding: 0.75rem;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        button:hover {
          background-color: #1e40af;
        }

        .error {
          color: #dc2626;
          text-align: center;
          margin-top: 1rem;
        }

        .link {
          text-align: center;
          margin-top: 1.5rem;
          color: #6b7280;
        }

        .link a {
          color: #2563eb;
          text-decoration: none;
        }

        .link a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
