import React, { useEffect, useState } from "react";
import "../styles/FakeStore.css";

/**
 * Componente que muestra una lista de productos obtenidos de Fake Store API.
 * Utiliza useEffect para obtener los datos al montar el componente.
 */
export default function FakeStore() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products", {
          signal: controller.signal,
        });
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching products:", error);
        }
      }
    };

    fetchData();
    return () => controller.abort(); // Cancelación de fetch al desmontar
  }, []);

  return (
    <div className="fake-store-container">
      <h2>Productos de Fake Store</h2>
      {products.map(({ id, title, price, image, ...rest }) => (
        <div className="fake-card" key={id}>
          <img src={image} alt={title} />
          <h3>{title}</h3>
          <p>Precio: ${price}</p>
        </div>
      ))}
    </div>
  );
}
