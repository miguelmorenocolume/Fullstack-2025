import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '@/context/AuthContext';

export default function Profile() {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push('/');
  }, [loading, user]);

  if (loading) return <p>Cargando perfil...</p>;

  return (
    <div>
      <h1>Perfil</h1>
      <p>Correo: {user.email}</p>
      <p>Rol: {user.role}</p>
    </div>
  );
}
