import { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/auth/register', form);
      setSuccessMessage('Registro exitoso. Redirigiendo al login...');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      alert(error.response?.data.message || 'Error en el registro');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Registro</h2>
      <input
        name="username"
        type="text"
        placeholder="Nombre de usuario"
        value={form.username}
        onChange={handleChange}
        required
        style={{ display: 'block', width: '100%', marginBottom: 10 }}
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        style={{ display: 'block', width: '100%', marginBottom: 10 }}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        style={{ display: 'block', width: '100%', marginBottom: 10 }}
      />
      <button type="submit">Registrar</button>
      {successMessage && (
        <p style={{ color: 'green', marginTop: 10 }}>{successMessage}</p>
      )}
    </form>
  );
}
