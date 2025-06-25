import { useState, useRef } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { token } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [fileName, setFileName] = useState('Ningún archivo seleccionado');
  const fileInputRef = useRef();

  const handleImage = e => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/png') && !file.type.startsWith('image/jpeg')) {
      alert('Solo se permiten imágenes PNG o JPEG');
      e.target.value = null;
      setFileName('Ningún archivo seleccionado');
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();
    reader.onloadend = () => setImageBase64(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!imageBase64) return alert('Debes subir una imagen válida');
    if (!token) return alert('Debes iniciar sesión para crear un post');

    try {
      await api.post(
        '/posts',
        { title, content, image: imageBase64 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('Post creado');
      setTitle('');
      setContent('');
      setImageBase64('');
      setFileName('Ningún archivo seleccionado');
    } catch (err) {
      alert('Error al crear el post');
      console.error('Error al crear post:', err.response || err);
    }
  };

  const styles = {
    form: {
      maxWidth: '600px',
      margin: '2rem auto',
      backgroundColor: '#fff',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Segoe UI, sans-serif',
    },
    title: {
      fontSize: '1.8rem',
      marginBottom: '1rem',
      color: '#333',
      textAlign: 'center',
    },
    input: {
      marginBottom: '1rem',
      padding: '0.8rem',
      border: '1px solid #ddd',
      borderRadius: '8px',
      fontSize: '1rem',
      outline: 'none',
    },
    textarea: {
      resize: 'vertical',
      minHeight: '100px',
    },
    fileContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '1rem',
      flexWrap: 'wrap',
    },
    fileButton: {
      backgroundColor: '#1976d2',
      color: '#fff',
      border: 'none',
      padding: '0.7rem 1.2rem',
      borderRadius: '8px',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    fileLabel: {
      fontSize: '0.95rem',
      color: '#555',
    },
    fileInputHidden: {
      display: 'none',
    },
    preview: {
      maxWidth: '100%',
      borderRadius: '8px',
      marginBottom: '1rem',
    },
    button: {
      backgroundColor: '#1976d2',
      color: '#fff',
      border: 'none',
      padding: '0.9rem',
      borderRadius: '10px',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.title}>Crear nueva publicación</h2>

      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        style={styles.input}
      />

      <textarea
        placeholder="Contenido"
        value={content}
        onChange={e => setContent(e.target.value)}
        required
        style={{ ...styles.input, ...styles.textarea }}
      />

      <div style={styles.fileContainer}>
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          style={styles.fileButton}
        >
          Seleccionar imagen
        </button>
        <span style={styles.fileLabel}>{fileName}</span>
        <input
          type="file"
          accept="image/png, image/jpeg"
          ref={fileInputRef}
          onChange={handleImage}
          style={styles.fileInputHidden}
        />
      </div>

      {imageBase64 && <img src={imageBase64} alt="Preview" style={styles.preview} />}

      <button type="submit" style={styles.button}>Publicar</button>
    </form>
  );
};

export default Dashboard;
