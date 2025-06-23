import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Register() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      router.push('/');
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div className="container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={form.password}
        />
        <button type="submit">Registrarse</button>
      </form>
      <p>{message}</p>

      <style jsx>{`
        .container {
          max-width: 400px;
          margin: 5rem auto;
          padding: 2rem;
          background: #f9fafb;
          border-radius: 10px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
        }

        h2 {
          text-align: center;
          margin-bottom: 1.5rem;
          color: #1f2937;
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
        }

        button {
          padding: 0.75rem;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.3s;
        }

        button:hover {
          background: #2563eb;
        }

        p {
          margin-top: 1rem;
          text-align: center;
          color: #ef4444;
        }
      `}</style>
    </div>
  );
}
