import { useEffect, useState } from 'react';
import api from '../api/axios';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get('/posts')
      .then(res => setPosts(res.data))
      .catch(() => alert('Error al cargar posts'));
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: 'auto' }}>
      <h1>Posts</h1>
      {posts.length === 0 && <p>No hay posts aún.</p>}
      {posts.map(post => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}
