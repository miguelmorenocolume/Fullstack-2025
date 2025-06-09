import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
import '../styles/Mostrar.css';

export default function Mostrar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargarProducto() {
      try {
        const res = await API.get(`/productos/${id}`);
        setProducto(res.data);
      } catch (err) {
        setError('No se pudo cargar el producto');
      } finally {
        setLoading(false);
      }
    }

    cargarProducto();
  }, [id]);

  if (loading) return <p className="loading">Cargando producto...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!producto) return <p className="error">Producto no encontrado</p>;

  return (
    <div className="producto-detalle">
      <h1 className="producto-titulo">{producto.nombre}</h1>
      <p><strong>Descripción:</strong> {producto.descripcion}</p>
      <p><strong>Precio:</strong> <span className="precio">${producto.precio.toFixed(2)}</span></p>
      <p><strong>Stock:</strong> {producto.stock}</p>
      <p><strong>Categoría:</strong> {producto.categoria}</p>

      <button className="btn-volver" onClick={() => navigate(-1)}>
        Volver
      </button>
    </div>
  );
}
