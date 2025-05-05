import './lista.css'

function ListaProductos({ productos }) {
    return (
        <ul>
            {productos.map((producto) => (
                <li key={producto.id}>
                    {producto.nombre} - ${producto.precio}
                </li>
            ))}
        </ul>
    );
}

export default ListaProductos;
