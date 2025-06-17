import { useEffect, useState } from 'react';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ email: '', password: '', isAdmin: false });
  const [editUserId, setEditUserId] = useState(null);

  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  };

  const fetchUsers = async () => {
    setLoading(true);
    const res = await fetch('/api/users', { headers });
    if (res.ok) {
      const data = await res.json();
      setUsers(data);
    } else {
      alert('Error al cargar usuarios');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const method = editUserId ? 'PUT' : 'POST';
    const url = editUserId ? `/api/users/${editUserId}` : '/api/users';

    const res = await fetch(url, {
      method,
      headers,
      body: JSON.stringify(form)
    });

    if (res.ok) {
      setForm({ email: '', password: '', isAdmin: false });
      setEditUserId(null);
      fetchUsers();
    } else {
      const error = await res.json();
      alert(error.error || 'Error al guardar usuario');
    }
  };

  const handleEdit = user => {
    setForm({ email: user.email, password: '', isAdmin: user.isAdmin });
    setEditUserId(user.id);
  };

  const handleDelete = async id => {
    if (!window.confirm('¿Seguro que quieres borrar este usuario?')) return;
    const res = await fetch(`/api/users/${id}`, {
      method: 'DELETE',
      headers
    });
    if (res.ok) {
      fetchUsers();
    } else {
      alert('Error al borrar usuario');
    }
  };

  if (loading) return <p>Cargando usuarios...</p>;

  return (
    <div>
      <h2>Panel de Usuarios (Admin)</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder={editUserId ? 'Nueva contraseña (opcional)' : 'Contraseña'}
          value={form.password}
          onChange={handleChange}
          {...(!editUserId && { required: true })}
        />
        <label>
          <input
            name="isAdmin"
            type="checkbox"
            checked={form.isAdmin}
            onChange={handleChange}
          />
          Es Admin
        </label>
        <button type="submit">{editUserId ? 'Editar Usuario' : 'Crear Usuario'}</button>
        {editUserId && (
          <button
            type="button"
            onClick={() => {
              setEditUserId(null);
              setForm({ email: '', password: '', isAdmin: false });
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      <table border="1" cellPadding="5" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.email}</td>
              <td>{u.isAdmin ? 'Sí' : 'No'}</td>
              <td>
                <button onClick={() => handleEdit(u)}>Editar</button>{' '}
                <button onClick={() => handleDelete(u.id)}>Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
