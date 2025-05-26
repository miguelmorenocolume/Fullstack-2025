import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from 'react-router-dom';

function Home() {
  return <h2>Home</h2>;
}

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Post no encontrado');
        }
        return res.json();
      })
      .then((data) => {
        setPost(data);
      })
      .catch((err) => {
        setError(err.message);
        navigate('/error', { state: { message: err.message } });
      });
  }, [id, navigate]);

  if (!post) return <p>Cargando post...</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
}

function ErrorPage({ location }) {
  const message = location?.state?.message || 'Ha ocurrido un error.';
  return (
    <div>
      <h2>Error</h2>
      <p>{message}</p>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/">Home</Link> |{' '}
        <Link to="/post/1">Ver Post 1</Link> |{' '}
        <Link to="/post/99999">Ver Post Inexistente</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
