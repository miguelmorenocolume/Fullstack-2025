import { useNavigate } from 'react-router-dom';
import API from '../api';
import '../styles/ProductoCard.css'; 

export default function ProductCard({ producto, onDelete }) {
    console.log('producto:', producto);
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (window.confirm(`¿Eliminar producto "${producto.nombre}"?`)) {
            try {
                await API.delete(`/productos/${producto._id}`);
                onDelete(producto._id);
            } catch (err) {
                alert('Error al eliminar producto');
            }
        }
    };

    return (
        <div className="producto-card">
            <div className="producto-info">
                <h3>{producto.nombre}</h3>
                <p>Precio: ${producto.precio}</p>
                <p>Stock: {producto.stock}</p>
            </div>
            <div className="producto-actions">
                <button onClick={() => navigate(`/mostrar/${producto._id}`)}>Mostrar</button>
                <button onClick={() => navigate(`/editar/${producto._id}`)}>Editar</button>
                <button onClick={handleDelete} className="eliminar">Eliminar</button>
            </div>
        </div>
    );
}
