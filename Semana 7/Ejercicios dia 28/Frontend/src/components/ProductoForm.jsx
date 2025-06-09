import { useState } from 'react';
import '../styles/ProductoForm.css';

export default function ProductoForm({ initialData = {}, onSubmit, submitText }) {
  const [form, setForm] = useState({
    nombre: initialData.nombre || '',
    descripcion: initialData.descripcion || '',
    precio: initialData.precio ? initialData.precio.toString() : '',
    stock: initialData.stock ? initialData.stock.toString() : '',
    categoria: initialData.categoria || '',
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nombre || !form.descripcion || !form.precio || !form.stock || !form.categoria) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (isNaN(form.precio) || isNaN(form.stock)) {
      setError('Precio y stock deben ser números válidos');
      return;
    }

    setError(null);

    onSubmit({
      nombre: form.nombre,
      descripcion: form.descripcion,
      precio: parseFloat(form.precio),
      stock: parseInt(form.stock, 10),
      categoria: form.categoria,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="producto-form">
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#111827', fontSize: '1.5rem', fontWeight: 'bold' }}>
        {submitText}
      </h2>

      {error && <p className="text-red-500">{error}</p>}

      <div>
        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Descripción</label>
        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Precio</label>
        <input
          type="number"
          step="0.01"
          name="precio"
          value={form.precio}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Stock</label>
        <input
          type="number"
          name="stock"
          value={form.stock}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Categoría</label>
        <input
          type="text"
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
        />
      </div>

      <button type="submit">{submitText}</button>
    </form>
  );
}
