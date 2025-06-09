import { useNavigate } from 'react-router-dom';
import API from '../api';
import ProductoForm from '../components/ProductoForm';

export default function Crear() {
  const navigate = useNavigate();

  const handleCrearProducto = async (data) => {
    try {
      await API.post('/productos', data);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Error al crear el producto');
    }
  };

  return (
  <div className="container">
      <h1>Crear Nuevo Producto</h1>
      <ProductoForm
        onSubmit={handleCrearProducto}
        submitText="Crear"
      />
    </div>
  );
}
