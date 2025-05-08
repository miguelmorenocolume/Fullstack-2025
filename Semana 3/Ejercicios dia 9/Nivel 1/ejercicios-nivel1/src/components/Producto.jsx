import './Producto.css';

function Producto({ nombre, precio }) {
    return (
        <div class="container">
            <ul>
                <li><b>Nombre:</b> {nombre}</li>
                <li><b>Precio:</b> {precio}€</li>
            </ul>
        </div>
    )
}

export default Producto;
