import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import heroImg from "../assets/hero/hero-image.jpg"; // reemplaza con la imagen que uses

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4 shadow-md sticky top-0 bg-white z-50">
        <h1 className="text-2xl font-bold text-gray-700">CreditBuilder</h1>

        {/* Navegación desktop */}
        <nav className="hidden md:flex space-x-4 text-sm md:text-base">
          <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact Us</Link>
          <Link to="/register" className="text-gray-700 hover:text-blue-600">Sign Up</Link>
          <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Log In</Link>
        </nav>

        {/* Acciones mobile: solo Log In + hamburguesa */}
        <div className="md:hidden flex items-center gap-3">
          <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Log In</Link>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-controls="home-mobile-menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(v => !v)}
          >
            <span className="sr-only">Abrir menú</span>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Panel móvil Home como overlay (no empuja el contenido) */}
      <div
        id="home-mobile-menu"
        className={`${mobileOpen ? "flex" : "hidden"} md:hidden fixed inset-0 z-[100] bg-white`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 py-6 flex flex-col">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-blue-600">CreditBuilder</h1>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setMobileOpen(false)}
              aria-label="Cerrar menú"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-8 flex-1 overflow-y-auto">
            <div className="flex flex-col space-y-5 text-lg">
              <Link to="/contact" onClick={() => setMobileOpen(false)} className="text-gray-600 hover:text-blue-600">Contact Us</Link>
              <Link to="/register" onClick={() => setMobileOpen(false)} className="text-gray-600 hover:text-blue-600">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <main className="flex flex-col-reverse lg:flex-row items-center justify-between px-8 md:px-16 lg:px-24 py-12 lg:py-24 gap-12">
        <div className="lg:w-1/2 text-center lg:text-left space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            Your Path to a <span className="text-blue-600">Brighter Financial Future</span>
          </h2>
          <p className="text-lg text-gray-600">Start building your business credit today.</p>
          <Link
            to="/register"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Explore More
          </Link>
        </div>
        <div className="lg:w-1/2">
          <img src={heroImg} alt="Hero Illustration" className="w-full rounded-lg shadow-md" />
        </div>
      </main>
    </div>
  );
}
