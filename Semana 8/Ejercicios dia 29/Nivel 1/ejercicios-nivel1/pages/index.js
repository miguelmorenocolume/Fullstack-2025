import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Mi nombre es Miguel Moreno</h1>
      <p>
        <Link href="/about">Ir a la página sobre mí</Link>
      </p>
    </div>
  );
}
