import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();

  const headerStyle = {
    padding: '1rem',
    backgroundColor: '#121212',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderBottom: '1px solid #333'
  };

  const navStyle = {
    marginBottom: '0.5rem'
  };

  const linkStyle = {
    marginRight: '1rem',
    color: '#90caf9',
    textDecoration: 'none'
  };

  return (
    <header style={headerStyle}>
      <nav style={navStyle}>
        <Link href="/" style={linkStyle}>Home</Link>
        <Link href="/about" style={linkStyle}>About</Link>
        <Link href="/blog" style={linkStyle}>Blog</Link>
      </nav>
      <p>Ruta actual: <strong>{router.pathname}</strong></p>
    </header>
  );
}
