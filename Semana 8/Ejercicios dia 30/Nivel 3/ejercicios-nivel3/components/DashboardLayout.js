import Link from 'next/link';

export default function DashboardLayout({ children }) {
  return (
    <div>
      <header style={{ background: '#222', color: 'white', padding: '1rem' }}>
        <h2>Panel de Administración</h2>
        <nav>
          <Link href="/dashboard">Inicio</Link> |{' '}
          <Link href="/dashboard/settings">Configuración</Link> |{' '}
          <Link href="/dashboard/stats">Estadísticas</Link>
        </nav>
      </header>
      <main style={{ padding: '1rem' }}>{children}</main>
    </div>
  );
}
