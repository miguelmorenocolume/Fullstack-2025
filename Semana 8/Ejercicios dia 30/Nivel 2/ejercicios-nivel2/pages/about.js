import Link from 'next/link';

export default function About() {
  return (
    <div>
      <h1>Página Acerca de</h1>
      <p>Esta es la página de información.</p>
      <Link href="/">Volver a Inicio</Link>
    </div>
  );
}
