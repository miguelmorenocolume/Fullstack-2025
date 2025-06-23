import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return router.push('/');

    fetch('/api/protected', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) setUser(data.user);
        else router.push('/');
      });
  }, []);

  return (
    <div className="container">
      <h2>Dashboard</h2>
      {user ? (
        <>
          <p><strong>ID:</strong> {user.userId}</p>
          <p><strong>Rol:</strong> {user.role}</p>
          {user.role === 'admin' && (
            <p><a href="/admin">Ir a Admin</a></p>
          )}
        </>
      ) : (
        <p className="loading">{message || 'Cargando...'}</p>
      )}

      <style jsx>{`
        .container {
          max-width: 600px;
          margin: 4rem auto;
          padding: 2rem;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
        }

        h2 {
          margin-bottom: 1.5rem;
          text-align: center;
          color: #111827;
        }

        p {
          font-size: 1rem;
          margin: 0.75rem 0;
          color: #374151;
        }

        a {
          color: #2563eb;
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }

        .loading {
          text-align: center;
          color: #6b7280;
        }
      `}</style>
    </div>
  );
}
