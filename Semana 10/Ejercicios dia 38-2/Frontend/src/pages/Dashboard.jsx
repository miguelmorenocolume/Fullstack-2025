import { useState, useContext } from 'react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

export default function Dashboard() {
  const { token } = useContext(AuthContext);
  const [form, setForm] = useState({
    title: '',
    content: '',
    image: '',
  });
  const [preview, setPreview] = useState('');

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(prev => ({ ...prev, image: reader.result }));
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!token) return alert('Debes estar logueado');

    try {
      await api.post('/posts', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Post creado con éxito');
      setForm({ title: '', content: '', image: '' });
      setPreview('');
    } catch (error) {
      alert(error.response?.data.message || 'Error creando post');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: 'auto' }}>
      <h2>Crear Post</h2>
      <input
        name="title"
        placeholder="Título"
        value={form.title}
        onChange={handleChange}
        required
        style={{ display: 'block', width: '100%', marginBottom: 10 }}
      />
      <textarea
        name="content"
        placeholder="Contenido"
        value={form.content}
        onChange={handleChange}
        required
        rows={5}
        style={{ display: 'block', width: '100%', marginBottom: 10 }}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        required
        style={{ marginBottom: 10 }}
      />
      {preview && (
        <img src={preview} alt="preview" style={{ maxWidth: '100%', marginBottom: 10 }} />
      )}
      <button type="submit">Crear Post</button>
    </form>
  );
}
