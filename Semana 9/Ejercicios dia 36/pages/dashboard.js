import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '@/context/AuthContext';

export default function Dashboard() {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push('/');
  }, [loading, user]);

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <h1>Bienvenido al Dashboard</h1>
      <p>Hola, {user?.email}</p>
    </div>
  );
}
