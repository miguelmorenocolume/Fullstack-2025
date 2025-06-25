import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user, loading } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!user) return;

    api.get('/posts')
      .then(res => setPosts(res.data))
      .catch(err => {
        alert('Error al cargar publicaciones');
        console.error(err);
      });
  }, [user]);

  if (loading)
    return <p style={{ textAlign: 'center', marginTop: '2rem', color: '#666' }}>Cargando usuario...</p>;

  if (!user)
    return <p style={{ textAlign: 'center', marginTop: '2rem', color: '#666' }}>🔒 Inicia sesión para ver las publicaciones.</p>;

  const styles = {
    main: {
      minHeight: '100vh',
      width: '100%',
      padding: '2rem',
      backgroundColor: '#f9f9f9',
      color: '#333',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      boxSizing: 'border-box',
    },
    title: {
      marginBottom: '2rem',
      fontWeight: '700',
      fontSize: '2rem',
      color: '#222',
      textAlign: 'center',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem',
    },
    post: {
      backgroundColor: '#fff',
      boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
      borderRadius: '12px',
      overflow: 'hidden',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    postHover: {
      transform: 'scale(1.005)',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.12)',
    },
    imageWrapper: {
      width: '100%',
      aspectRatio: '16 / 9',
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    postContent: {
      padding: '1.2rem',
      flexShrink: 0,
    },
    postTitle: {
      marginBottom: '0.75rem',
      fontWeight: '700',
      fontSize: '1.5rem',
      color: '#222',
      overflowWrap: 'break-word',
      wordBreak: 'break-word',
      whiteSpace: 'normal',
    },
    comments: {
      backgroundColor: '#f1f1f1',
      padding: '1rem 1.5rem',
      borderTop: '1px solid #ddd',
      borderBottomLeftRadius: '12px',
      borderBottomRightRadius: '12px',
      flexGrow: 1,
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
    },
    commentTitle: {
      marginBottom: '0.75rem',
      color: '#444',
      fontWeight: '600',
      flexShrink: 0,
    },
    commentText: {
      fontSize: '0.9rem',
      marginBottom: '0.5rem',
      color: '#333',
      overflowWrap: 'break-word',
      wordBreak: 'break-word',
      whiteSpace: 'normal',
      flexShrink: 0,
    },
    commentAuthor: {
      color: '#1976d2',
    },
    moreComments: {
      fontSize: '0.9rem',
      color: '#666',
      fontStyle: 'italic',
      marginTop: 'auto',
      flexShrink: 0,
    },
    noComments: {
      fontStyle: 'italic',
      color: '#888',
      flexShrink: 0,
    },
    noPosts: {
      textAlign: 'center',
      fontStyle: 'italic',
      color: '#999',
    },
    link: {
      textDecoration: 'none',
      color: 'inherit',
      display: 'block',
    },
  };

  return (
    <main style={styles.main}>
      <h2 style={styles.title}>Bienvenido, {user.username}!</h2>

      {posts.length === 0 ? (
        <p style={styles.noPosts}>No hay publicaciones para mostrar.</p>
      ) : (
        <section style={styles.grid}>
          {posts.map(post => {
            const commentsToShow = post.comments ? post.comments.slice(0, 2) : [];
            const moreCount = post.comments ? post.comments.length - commentsToShow.length : 0;

            return (
              <article
                key={post._id}
                style={styles.post}
                onMouseEnter={e => Object.assign(e.currentTarget.style, styles.postHover)}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = styles.post.boxShadow;
                }}
              >
                <Link to={`/posts/${post._id}`} style={styles.link}>
                  {post.image && (
                    <div style={styles.imageWrapper}>
                      <img
                        src={post.image}
                        alt={post.title}
                        style={styles.image}
                        loading="lazy"
                      />
                    </div>
                  )}

                  <div style={styles.postContent}>
                    <h3 style={styles.postTitle}>{post.title}</h3>
                  </div>
                </Link>

                <section style={styles.comments}>
                  <h4 style={styles.commentTitle}>Comentarios:</h4>
                  {commentsToShow.length > 0 ? (
                    <>
                      {commentsToShow.map(comment => (
                        <p key={comment._id} style={styles.commentText}>
                          <strong style={styles.commentAuthor}>
                            {comment.author?.username || 'Anónimo'}
                          </strong>: {comment.text}
                        </p>
                      ))}
                      {moreCount > 0 && (
                        <p style={styles.moreComments}>+{moreCount} más...</p>
                      )}
                    </>
                  ) : (
                    <p style={styles.noComments}>No hay comentarios aún.</p>
                  )}
                </section>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
};

export default Home;
