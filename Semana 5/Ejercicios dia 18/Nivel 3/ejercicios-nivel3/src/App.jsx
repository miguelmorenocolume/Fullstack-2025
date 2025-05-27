import { useState } from 'react'
import { CartProvider } from "./components/CartContext";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import './App.css'


export default function App() {
  return (
    <CartProvider>
      <div className="app">
        <h1>Carrito de Compras</h1>
        <div className="container">
          <ProductList />
          <Cart />
        </div>
      </div>
    </CartProvider>
  );
}