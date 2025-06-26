import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const PostDetails = () => {
  const { id } = useParams();
  const { token } = useAuth();

  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError('ID de post inválido');
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/posts/${id}`);
        setPost(res.data);
        setError(null);
      } catch (err) {
        console.error('Error al cargar el post:', err.response?.data || err.message);
        setError(err.response?.data?.message || 'Error al cargar el post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!token) {
      alert('Debes iniciar sesión para comentar');
      return;
    }
    if (!commentText.trim()) {
      alert('El comentario no puede estar vacío');
      return;
    }
    try {
      const res = await api.post(
        `/posts/${id}/comments`,
        { text: commentText },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPost((prev) => ({
        ...prev,
        comments: [...(prev.comments || []), res.data],
      }));

      setCommentText('');
    } catch (error) {
      alert('Error al agregar comentario');
      console.error(error.response?.data || error.message);
    }
  };

  if (loading)
    return (
      <p style={{ textAlign: 'center', marginTop: 40, fontSize: '1.2rem', color: '#555' }}>
        Cargando post...
      </p>
    );
  if (error)
    return (
      <p style={{ color: 'red', textAlign: 'center', marginTop: 40, fontWeight: '600' }}>{error}</p>
    );
  if (!post)
    return (
      <p style={{ textAlign: 'center', marginTop: 40, fontSize: '1.2rem', color: '#555' }}>
        Post no encontrado
      </p>
    );

  return (
    <div
      style={{
        maxWidth: 600,
        margin: '3rem auto',
        padding: '1.5rem',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#222',
      }}
    >
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem', textAlign: 'center' }}>{post.title}</h2>
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          style={{
            width: '100%',
            borderRadius: 8,
            marginBottom: '1.5rem',
            objectFit: 'cover',
            maxHeight: 350,
          }}
        />
      )}

      <p
        style={{
          fontSize: '1.1rem',
          lineHeight: 1.6,
          marginBottom: '2rem',
          wordWrap: 'break-word',
        }}
      >
        {post.content.split('\n').map((line, i) => (
          <span key={i}>
            {line}
            <br />
          </span>
        ))}
      </p>

      <h3
        style={{
          borderBottom: '2px solid #1976d2',
          paddingBottom: '0.3rem',
          marginBottom: '1rem',
          color: '#1976d2',
        }}
      >
        Comentarios
      </h3>
      {post.comments && post.comments.length > 0 ? (
        post.comments.map((comment) => (
          <div
            key={comment._id}
            style={{
              borderTop: '1px solid #ddd',
              padding: '0.7rem 0',
              fontSize: '0.95rem',
              color: '#444',
            }}
          >
            <strong style={{ color: '#1976d2' }}>
              {comment.author?.username || 'Anónimo'}
            </strong>
            : {comment.text}
          </div>
        ))
      ) : (
        <p style={{ fontStyle: 'italic', color: '#666' }}>No hay comentarios aún.</p>
      )}

      <form onSubmit={handleAddComment} style={{ marginTop: '2rem' }}>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          rows={3}
          placeholder="Escribe tu comentario..."
          style={{
            width: '100%',
            padding: '0.8rem',
            borderRadius: 8,
            border: '1.5px solid #ccc',
            resize: 'vertical',
            fontSize: '1rem',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            marginBottom: '1rem',
            transition: 'border-color 0.3s ease',
            outline: 'none',
          }}
          onFocus={(e) => (e.target.style.borderColor = '#1976d2')}
          onBlur={(e) => (e.target.style.borderColor = '#ccc')}
          required
        />
        <button
          type="submit"
          style={{
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            padding: '0.6rem 1.2rem',
            borderRadius: 8,
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '1rem',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#145ea8')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1976d2')}
        >
          Agregar Comentario
        </button>
      </form>
    </div>
  );
};

export default PostDetails;
