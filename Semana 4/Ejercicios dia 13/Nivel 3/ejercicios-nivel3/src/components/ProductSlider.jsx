// ProductSlider.jsx
"use client";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const products = [
  { id: 1, name: "Camiseta", price: "19.99€", img: "/productos/camiseta.jpg" },
  { id: 2, name: "Gorra", price: "14.99€", img: "/productos/gorra.jpg" },
  { id: 3, name: "Sudadera", price: "34.99€", img: "/productos/sudadera.jpg" },
  { id: 4, name: "Mochila", price: "29.99€", img: "/productos/mochila.jpg" },
  { id: 5, name: "Zapatillas", price: "49.99€", img: "/productos/zapatillas.jpg" },
];

export default function ProductSlider() {
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 3,
      spacing: 16,
    },
    breakpoints: {
      "(max-width: 768px)": {
        slides: {
          perView: 1,
          spacing: 10,
        },
      },
    },
  });

  return (
    <div className="max-w-5xl mx-auto px-4">
      <h2 className="text-2xl font-semibold mb-4">Productos Destacados</h2>
      <div ref={sliderRef} className="keen-slider">
        {products.map((product) => (
          <div key={product.id} className="keen-slider__slide bg-[#1e1e1e] rounded-lg shadow-md p-4 text-center">
            <img src={product.img} alt={product.name} className="w-full h-40 object-cover rounded-md mb-2" />
            <h3 className="text-lg font-medium text-white">{product.name}</h3>
            <p className="text-blue-600 font-semibold">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
