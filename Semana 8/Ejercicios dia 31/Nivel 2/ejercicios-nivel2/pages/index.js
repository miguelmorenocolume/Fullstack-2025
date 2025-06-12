import { useState, useEffect } from 'react';

export default function Home() {
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [nombres, setNombres] = useState([]);

  // Cargar lista de nombres
  const cargarNombres = async () => {
    const res = await fetch('/api/nombres');
    const data = await res.json();
    setNombres(data.nombres);
  };

  useEffect(() => {
    cargarNombres();
  }, []);

  const manejarEnvio = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/nombres', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre }),
    });

    if (res.ok) {
      setMensaje('Nombre enviado correctamente');
      setNombre('');
      cargarNombres(); // Actualizar lista en tiempo real
    } else {
      setMensaje('Error al enviar el nombre');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Formulario de nombres</h1>

      <form onSubmit={manejarEnvio}>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Escribe un nombre"
          required
        />
        <button type="submit">Enviar</button>
      </form>

      {mensaje && <p>{mensaje}</p>}

      <h2>Lista de nombres</h2>
      <ul>
        {nombres.map((n, i) => (
          <li key={i}>{n}</li>
        ))}
      </ul>
    </div>
  );
}
