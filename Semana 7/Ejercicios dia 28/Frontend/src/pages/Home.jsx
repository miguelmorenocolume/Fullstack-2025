import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductoCard';  // Ajusta la ruta según tu estructura
import API from '../api';

export default function Home() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

  const cargarProductos = async () => {
    try {
      const res = await API.get('/productos');
      setProductos(res.data);
    } catch (err) {
      console.error(err);
      setError('Error al cargar los productos');
    }
  };

  const eliminarProducto = (id) => {
    setProductos(productos.filter(p => p._id !== id));
  };

  useEffect(() => {
    cargarProductos();
  }, []);

return (
  <div className="container">
    <h1>Productos Disponibles</h1>
    {error && <p>{error}</p>}
    {productos.length === 0 ? (
      <p>No hay productos disponibles.</p>
    ) : (
      <div className="product-grid">
        {productos.map((producto) => (
          <ProductCard 
            key={producto._id} 
            producto={producto} 
            onDelete={eliminarProducto} 
          />
        ))}
      </div>
    )}
  </div>
);
}
