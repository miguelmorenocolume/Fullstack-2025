import { useRouter } from 'next/router';

export default function Post() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Post ID: {id}</h1>
      <p>Este es el contenido del post número {id}.</p>
    </div>
  );
}
