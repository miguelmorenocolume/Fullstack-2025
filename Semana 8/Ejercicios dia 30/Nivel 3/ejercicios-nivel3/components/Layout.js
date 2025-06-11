import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const router = useRouter();
  const { username } = router.query;

  return (
    <div>
      <header style={{ padding: '1rem', background: '#f0f0f0' }}>
        <nav>
          <Link href="/">Inicio</Link> |{' '}
          <Link href="/about">Acerca de</Link> |{' '}
          <Link href="/dashboard">Dashboard</Link> |{' '}
          <Link href="/user/miguelmoreno">Mi Perfil</Link>
        </nav>
        {router.pathname.startsWith('/user/') && username && (
          <p style={{ marginTop: '0.5rem' }}>Bienvenido, {username} 👋</p>
        )}
      </header>
      <main style={{ padding: '1rem' }}>{children}</main>
    </div>
  );
}
