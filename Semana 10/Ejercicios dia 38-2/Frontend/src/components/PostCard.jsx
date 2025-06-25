import React from 'react';
import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  // Mostrar solo los primeros 100 caracteres del contenido
  const snippet = post.content.length > 100 ? post.content.slice(0, 100) + '...' : post.content;

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: 8,
      padding: 15,
      marginBottom: 15,
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }}>
      <Link to={`/posts/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <h2>{post.title}</h2>
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            style={{ maxWidth: '100%', maxHeight: 200, objectFit: 'cover', borderRadius: 8 }}
          />
        )}
        <p>{snippet}</p>
        <small>Autor: {post.author?.username || post.author}</small>
      </Link>
    </div>
  );
}
