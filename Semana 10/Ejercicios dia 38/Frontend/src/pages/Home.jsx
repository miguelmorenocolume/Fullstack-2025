import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/posts`)
      .then(res => {
        console.log('Posts recibidos:', res.data);
        setPosts(res.data);
      })
      .catch((err) => {
        console.error('Error al cargar publicaciones:', err);
        alert('Error al cargar publicaciones');
      });
  }, []);

  return (
    <div>
      <h2>Publicaciones</h2>
      {posts.length === 0 ? (
        <p>No hay publicaciones para mostrar.</p>
      ) : (
        posts.map(post => (
          <div key={post._id} style={{ border: '1px solid #ccc', margin: '1rem', padding: '1rem' }}>
            <h3>{post.title}</h3>
            <img src={post.image} alt={post.title} style={{ width: '300px' }} />
            <p>{post.content}</p>
            <h4>Comentarios:</h4>
            {Array.isArray(post.comments) && post.comments.length > 0 ? (
              post.comments.map(comment => (
                <p key={comment._id}>
                  <strong>{comment.author?.username || 'Anonimo'}</strong>: {comment.text}
                </p>
              ))
            ) : (
              <p>No hay comentarios aún.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
