import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return router.push('/');

    fetch('/api/users', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setUsers(data);
        else router.push('/');
      });
  }, []);

  return (
    <div className="container">
      <h2>Admin – Lista de usuarios</h2>
      <ul>
        {users.map(u => (
          <li key={u._id}>
            <strong>{u.email}</strong> – {u.role}
          </li>
        ))}
      </ul>

      <style jsx>{`
        .container {
          max-width: 700px;
          margin: 4rem auto;
          padding: 2rem;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
        }

        h2 {
          text-align: center;
          color: #1f2937;
          margin-bottom: 1.5rem;
        }

        ul {
          list-style: none;
          padding: 0;
        }

        li {
          background: #fff;
          padding: 1rem;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          margin-bottom: 1rem;
          color: #374151;
        }

        strong {
          color: #111827;
        }
      `}</style>
    </div>
  );
}
