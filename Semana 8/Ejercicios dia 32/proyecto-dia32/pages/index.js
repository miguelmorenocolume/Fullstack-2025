import { useEffect, useState } from 'react';

export default function Home() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/items');
      const data = await res.json();
      setItems(data);
    } catch (err) {
      setMessage('Error al cargar items');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const method = editing ? 'PUT' : 'POST';
      const url = editing ? `/api/items/${editing}` : '/api/items';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error desconocido');

      setMessage(editing ? 'Item actualizado' : 'Item agregado');
      setName('');
      setEditing(null);
      fetchItems();
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este item?')) return;
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch(`/api/items/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al eliminar');
      setMessage('Item eliminado');
      fetchItems();
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (item) => {
    setName(item.name);
    setEditing(item._id);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>CRUD con Next.js y MongoDB</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre del item"
          required
        />
        <button type="submit" disabled={loading}>
          {editing ? 'Actualizar' : 'Agregar'}
        </button>
        {editing && <button onClick={() => { setEditing(null); setName(''); }} type="button">Cancelar</button>}
      </form>

      {message && <p>{message}</p>}
      {loading && <p>Cargando...</p>}

      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.name}
            <button onClick={() => startEdit(item)}>Editar</button>
            <button onClick={() => handleDelete(item._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
