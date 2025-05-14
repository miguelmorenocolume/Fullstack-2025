import React, { useState } from "react";

export default function AppMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="dark:bg-[#1e1e1e] text-white shadow-lg fixed top-0 w-full z-50">
                <div className="w-full px-4 py-4">
                        <div className="flex justify-between items-center">
                                {/* Logo de la página */}
                                <a href="/" className="text-2xl font-bold pl-2">Mi Tienda</a>

                                {/* Menú para pantallas grandes */}
                                <div className="hidden md:flex space-x-8">
                                        <a href="/" className="hover:text-blue-400">Inicio</a>
                                        <a href="/productos" className="hover:text-blue-400">Productos</a>
                                        <a href="/nosotros" className="hover:text-blue-400">Nosotros</a>
                                        <div className="relative">
                                                <button className="hover:text-blue-400">
                                                        Servicios
                                                </button>
                                                {/* Dropdown */}
                                                <div className="absolute hidden bg-gray-800 text-white shadow-lg rounded-md w-40 top-full left-0 mt-2 group-hover:block">
                                                        <a href="/servicios/web" className="block px-4 py-2 hover:bg-gray-600">Desarrollo Web</a>
                                                        <a href="/servicios/app" className="block px-4 py-2 hover:bg-gray-600">Desarrollo de Apps</a>
                                                        <a href="/servicios/marketing" className="block px-4 py-2 hover:bg-gray-600">Marketing Digital</a>
                                                </div>
                                        </div>
                                        <a href="/contacto" className="hover:text-blue-400">Contacto</a>
                                </div>

                                {/* Menú para pantallas pequeñas */}
                                <div className="md:hidden">
                                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                                </svg>
                                        </button>
                                        {/* Menú desplegable móvil */}
                                        {isMenuOpen && (
                                                <div className="absolute bg-gray-900 text-white shadow-lg w-full mt-2">
                                                        <a href="/" className="block px-4 py-2">Inicio</a>
                                                        <a href="/productos" className="block px-4 py-2">Productos</a>
                                                        <a href="/nosotros" className="block px-4 py-2">Nosotros</a>
                                                        <a href="/servicios" className="block px-4 py-2">Servicios</a>
                                                        <a href="/contacto" className="block px-4 py-2">Contacto</a>
                                                </div>
                                        )}
                                </div>
                        </div>
                </div>
        </nav>
    );
}
