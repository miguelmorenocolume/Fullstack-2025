"use client";
import { useState, useEffect, useRef } from "react";

export default function Carousel({ images, visibleSlides = 3 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const intervalRef = useRef(null);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const totalSlides = images.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const stopAutoplay = () => {
    setIsAutoplay(false);
    clearInterval(intervalRef.current);
  };

  const restartAutoplay = () => {
    if (!isAutoplay) {
      setIsAutoplay(true);
    }
  };

  // Autoplay effect
  useEffect(() => {
    if (isAutoplay) {
      intervalRef.current = setInterval(nextSlide, 3000);
      return () => clearInterval(intervalRef.current);
    }
  }, [isAutoplay]);

  // Swipe handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleMouseDown = (e) => {
    touchStartX.current = e.clientX;
  };

  const handleMouseUp = (e) => {
    touchEndX.current = e.clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const distance = touchStartX.current - touchEndX.current;
    if (Math.abs(distance) > 50) {
      stopAutoplay();
      distance > 0 ? nextSlide() : prevSlide();
    }
  };

  // Estilo del contenedor
  const slideWidth = 100 / visibleSlides;

  return (
    <div
      className="relative w-full max-w-5xl mx-auto overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * slideWidth}%)` }}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className={`w-[${slideWidth}%] h-[200px] object-cover flex-shrink-0`}
            style={{ width: `${slideWidth}%` }}
          />
        ))}
      </div>

      {/* Botón anterior */}
      <button
        onClick={() => {
          prevSlide();
          stopAutoplay();
        }}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70"
      >
        ←
      </button>

      {/* Botón siguiente */}
      <button
        onClick={() => {
          nextSlide();
          stopAutoplay();
        }}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70"
      >
        →
      </button>
    </div>
  );
}
