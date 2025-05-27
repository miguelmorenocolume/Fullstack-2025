import { useCart } from "./CartContext";

const sampleProducts = [
  { id: 1, name: "Producto A", price: 10 },
  { id: 2, name: "Producto B", price: 15 },
  { id: 3, name: "Producto C", price: 20 },
];

export default function ProductList() {
  const { addItem } = useCart();

  return (
    <div className="product-list">
      <h2>Productos</h2>
      {sampleProducts.map((product) => (
        <div key={product.id} className="product">
          <span>{product.name} - ${product.price}</span>
          <button onClick={() => addItem(product)}>Agregar al carrito</button>
        </div>
      ))}
    </div>
  );
}
