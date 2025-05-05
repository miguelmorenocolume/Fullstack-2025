// Importa estilos y React
import './lista.css';
import { useState } from 'react';

function ListaProductos({ productos }) {

    const [categoria, setCategoria] = useState('');

    function cambiarCategoria(evento) {
        setCategoria(evento.target.value);
    }

    const productosMostrados = categoria
        ? productos.filter(p => p.categoria === categoria)
        : productos;

    const categorias = [...new Set(productos.map(p => p.categoria))];

    return (
        <div>
            <select value={categoria} onChange={cambiarCategoria}>
                <option value="">Todas las categorías</option>
                {categorias.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>
            <ul>
                {productosMostrados.map(p => (
                    <li key={p.id}>
                        {p.nombre} - {p.categoria}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListaProductos;
