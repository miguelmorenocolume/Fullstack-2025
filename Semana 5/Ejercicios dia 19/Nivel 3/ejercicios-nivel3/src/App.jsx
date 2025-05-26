import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';

const newsList = [
  { id: '1', title: 'Noticia 1', content: 'Contenido de la noticia 1' },
  { id: '2', title: 'Noticia 2', content: 'Contenido de la noticia 2' },
  { id: '3', title: 'Noticia 3', content: 'Contenido de la noticia 3' },
];

function Home() {
  return <h2>Bienvenido a la app de noticias</h2>;
}

function News() {
  return (
    <div>
      <h2>Noticias</h2>
      <ul>
        {newsList.map((news) => (
          <li key={news.id}>
            <Link to={`/news/${news.id}`}>{news.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const noticia = newsList.find((n) => n.id === id);

  if (!noticia) {
    navigate('/error', {
      state: { message: `La noticia con ID ${id} no existe.` },
    });
    return null;
  }

  return (
    <div>
      <h2>{noticia.title}</h2>
      <p>{noticia.content}</p>
    </div>
  );
}

function ErrorPage() {
  const location = useLocation();
  const message = location.state?.message || 'Ha ocurrido un error.';

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
        <Link to="/">Inicio</Link> |{' '}
        <Link to="/news">Noticias</Link> |{' '}
        <Link to="/news/999">Noticia Inexistente</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
