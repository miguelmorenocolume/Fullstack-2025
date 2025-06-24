import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { token } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageBase64, setImageBase64] = useState('');

  const handleImage = e => {
    const file = e.target.files[0];
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.startsWith('image/png') && !file.type.startsWith('image/jpeg')) {
      alert('Solo se permiten imágenes PNG o JPEG');
      e.target.value = null; // limpiar input
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      // El resultado ya incluye el header tipo MIME, p.ej: data:image/png;base64,...
      setImageBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!imageBase64) {
      alert('Debes subir una imagen válida');
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/posts`, {
        title,
        content,
        image: imageBase64 // ya formateado
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Post creado');
      setTitle('');
      setContent('');
      setImageBase64('');
    } catch (err) {
      alert('Error al crear el post');
      console.error('Error al crear post:', err.response || err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear nueva publicación</h2>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Contenido"
        value={content}
        onChange={e => setContent(e.target.value)}
        required
      />
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleImage}
        required
      />
      <button type="submit">Publicar</button>
    </form>
  );
};

export default Dashboard;
