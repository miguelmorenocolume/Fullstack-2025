import Link from 'next/link';

export default function About() {
  return (
    <div>
      <h1>Esta es la página sobre mí</h1>
      <p>
        <Link href="/">Volver a la página principal</Link>
      </p>
    </div>
  );
}
