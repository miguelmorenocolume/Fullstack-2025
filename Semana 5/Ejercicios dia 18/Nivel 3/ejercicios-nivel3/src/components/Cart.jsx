import { useCart } from "./CartContext";

export default function Cart() {
  const { items, removeItem } = useCart();

  return (
    <div className="cart">
      <h2>Carrito</h2>
      {items.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        items.map((item) => (
          <div key={item.id} className="cart-item">
            <span>{item.name} - ${item.price}</span>
            <button onClick={() => removeItem(item.id)}>Eliminar</button>
          </div>
        ))
      )}
    </div>
  );
}
