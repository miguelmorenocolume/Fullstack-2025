"use client";
import React, { useState, useEffect, useRef } from "react";

const Slider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const intervalRef = useRef(null);
  const touchStartRef = useRef(0);
  const touchEndRef = useRef(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const stopAutoplay = () => {
    setIsAutoplay(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const restartAutoplay = () => {
    if (!isAutoplay) {
      setIsAutoplay(true);
      intervalRef.current = setInterval(nextSlide, 3000);
    }
  };

  const handleTouchStart = (e) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndRef.current = e.changedTouches[0].clientX;
    const distance = touchStartRef.current - touchEndRef.current;
    if (Math.abs(distance) > 50) {
      if (distance > 0) {
        nextSlide(); // Swipe left
      } else {
        prevSlide(); // Swipe right
      }
    }
    restartAutoplay();
  };

  useEffect(() => {
    if (isAutoplay) {
      intervalRef.current = setInterval(nextSlide, 3000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isAutoplay]);

  return (
    <div
      className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-xl shadow-lg"
      onMouseEnter={stopAutoplay}
      onMouseLeave={restartAutoplay}
    >
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseUp={handleTouchEnd}
      >
        {images.map((src, index) => (
          <img key={index} src={src} alt={`Slide ${index + 1}`} className="w-full flex-shrink-0" />
        ))}
      </div>

      {/* Botón Anterior */}
      <button
        onClick={() => {
          prevSlide();
          stopAutoplay();
        }}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800/50 text-white p-2 rounded-full"
      >
        ←
      </button>

      {/* Botón Siguiente */}
      <button
        onClick={() => {
          nextSlide();
          stopAutoplay();
        }}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800/50 text-white p-2 rounded-full"
      >
        →
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
