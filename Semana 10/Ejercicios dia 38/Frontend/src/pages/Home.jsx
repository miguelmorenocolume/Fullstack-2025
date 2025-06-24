import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/posts`)
      .then(res => setPosts(res.data))
      .catch(() => alert('Error al cargar publicaciones'));
  }, []);

  return (
    <div>
      <h2>Publicaciones</h2>
      {posts.map(post => (
        <div key={post._id} style={{ border: '1px solid #ccc', margin: '1rem', padding: '1rem' }}>
          <h3>{post.title}</h3>
          <img src={post.image} alt={post.title} style={{ width: '300px' }} />
          <p>{post.content}</p>
          <h4>Comentarios:</h4>
          {post.comments.map(comment => (
            <p key={comment._id}><strong>{comment.author?.username}</strong>: {comment.text}</p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Home;
