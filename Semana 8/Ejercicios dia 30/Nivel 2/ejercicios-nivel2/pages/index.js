import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const irAlPrimerPost = () => {
    router.push('/posts/1');
  };

  return (
    <div>
      <h1>Página Principal</h1>
      <p>Bienvenido a la página principal.</p>

      <h2>Ir a Posts</h2>
      <ul>
        <li><Link href="/posts/1">Post 1</Link></li>
        <li><Link href="/posts/2">Post 2</Link></li>
        <li><Link href="/posts/3">Post 3</Link></li>
      </ul>

      <button onClick={irAlPrimerPost}>Ir programáticamente al Post 1</button>

      <br /><br />
      <Link href="/about">Ir a Acerca de</Link>
    </div>
  );
}
