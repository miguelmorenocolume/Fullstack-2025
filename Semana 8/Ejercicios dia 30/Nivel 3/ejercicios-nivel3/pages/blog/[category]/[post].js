import { useRouter } from 'next/router';

export default function BlogPost() {
  const router = useRouter();
  const { category, post } = router.query;

  return (
    <div>
      <h1>Categoría: {category}</h1>
      <h2>Post: {post}</h2>
      <p>Estás viendo el post "{post}" en la categoría "{category}".</p>
    </div>
  );
}
