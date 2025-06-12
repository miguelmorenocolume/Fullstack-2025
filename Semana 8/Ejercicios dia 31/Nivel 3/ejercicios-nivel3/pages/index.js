import { useState, useEffect } from 'react';

export default function Home() {
  const [nombre, setNombre] = useState('');
  const [nombres, setNombres] = useState([]);

  const cargarNombres = async () => {
    const res = await fetch('/api/nombres');
    const data = await res.json();
    setNombres(data.nombres);
  };

  useEffect(() => {
    cargarNombres();
  }, []);

  const agregar = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    await fetch('/api/nombres', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre }),
    });

    setNombre('');
    cargarNombres();
  };

  const eliminar = async (id) => {
    await fetch('/api/nombres', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    cargarNombres();
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>CRUD de nombres</h1>

      <form onSubmit={agregar}>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nuevo nombre"
          required
        />
        <button type="submit">Agregar</button>
      </form>

      <h2>Lista de nombres</h2>
      <ul>
        {nombres.map((n) => (
          <li key={n.id}>
            {n.nombre}{' '}
            <button onClick={() => eliminar(n.id)} style={{ marginLeft: '1rem' }}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
