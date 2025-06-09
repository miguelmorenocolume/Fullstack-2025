import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Crear from './pages/Crear';
import Editar from './pages/Editar';
import Mostrar from './pages/Mostrar';
import './App.css';

export default function App() {
  return (
    <div>
      <header className="navbar">
        <div className="navbar-container">
          <h1 className="logo">Mi Tienda</h1>
          <nav className="nav-links">
            <Link to="/">Inicio</Link>
            <Link to="/crear">Nuevo Producto</Link>
          </nav>
        </div>
      </header>

      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crear" element={<Crear />} />
          <Route path="/editar/:id" element={<Editar />} />
          <Route path="/mostrar/:id" element={<Mostrar />} />
        </Routes>
      </main>
    </div>
  );
}
