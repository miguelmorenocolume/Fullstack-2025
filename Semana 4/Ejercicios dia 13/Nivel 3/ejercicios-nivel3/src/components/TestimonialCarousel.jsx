"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Laura Gómez",
    message: "¡Excelente servicio! Rápido, eficiente y muy profesional.",
    avatar: "/avatars/laura.jpg",
  },
  {
    name: "Carlos Ruiz",
    message: "No podría estar más satisfecho. Recomendado 100%.",
    avatar: "/avatars/carlos.jpg",
  },
  {
    name: "Ana Torres",
    message: "Atención al cliente impecable y producto de calidad.",
    avatar: "/avatars/ana.jpg",
  },
];

export default function TestimonialCarousel() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-14 text-center">
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-8">
        Testimonios
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true, el: '.swiper-pagination' }}  
        navigation
        autoplay={{ delay: 5000, disableOnInteraction: true }}
        className="rounded-xl shadow-lg bg-white dark:bg-[#1e1e1e] p-8"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center gap-3">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border border-gray-400 shadow-sm"
              />
              <p className="text-gray-700 dark:text-gray-300 italic text-sm max-w-lg mt-2">
                “{testimonial.message}”
              </p>
              <h4 className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-2">
                {testimonial.name}
              </h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Estilos para la paginación */}
      <div className="swiper-pagination swiper-pagination-bullets bottom-6"></div> {/* Paginación colocada más abajo */}
    </section>
  );
}
