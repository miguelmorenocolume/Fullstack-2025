import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Página Principal</h1>
      <p>Bienvenido a la página principal.</p>
      <Link href="/about">Ir a Acerca de</Link>
    </div>
  );
}