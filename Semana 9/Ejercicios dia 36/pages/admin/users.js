import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '@/context/AuthContext';

export default function AdminUsers() {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!loading) {
      if (!user) return router.push('/');
      if (user.role !== 'admin') return router.push('/dashboard');
      fetchUsers();
    }
  }, [loading, user]);

  const fetchUsers = async () => {
    const res = await fetch('/api/users', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    const data = await res.json();
    setUsers(data.users || []);
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <h1>Gestión de Usuarios</h1>
      <ul>
        {users.map(u => (
          <li key={u._id}>{u.email} – {u.role}</li>
        ))}
      </ul>
    </div>
  );
}
