import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
import ProductoForm from '../components/ProductoForm';

export default function Editar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        const res = await API.get(`/productos/${id}`);
        setInitialData(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Error al cargar el producto');
        setLoading(false);
      }
    };
    cargarProducto();
  }, [id]);

  const handleActualizarProducto = async (data) => {
    try {
      await API.put(`/productos/${id}`, data);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Error al actualizar el producto');
    }
  };

  if (loading) return <p>Cargando producto...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container-editar">
      <h1>Editar Producto</h1>
      <ProductoForm
        initialData={initialData}
        onSubmit={handleActualizarProducto}
        submitText="Guardar Cambios"
      />
    </div>
  );
}
