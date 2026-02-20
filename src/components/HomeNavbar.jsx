import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

import logo from "../assets/logo.svg";

export default function HomeNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: "/contact", text: "Contact Us" },
    { to: "/register", text: "Sign Up" },
  ];

  return (
    <>
      <header className="bg-white/80 backdrop-blur-sm shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="The Credit Builder" className="h-14 w-auto" />
          </Link>

          {/* Navegación de escritorio */}
          <nav className="hidden md:flex items-center space-x-6 text-base">
            {navLinks.map(link => (
              <Link key={link.to} to={link.to} className="text-gray-600 hover:text-blue-600 transition-colors">{link.text}</Link>
            ))}
            <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">Log In</Link>
          </nav>

          {/* Botón de menú móvil */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Menú Overlay Móvil */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-full max-w-xs bg-white/95 backdrop-blur-sm z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200/80">
          <h2 className="font-bold text-lg text-blue-600">Menu</h2>
          <button onClick={() => setIsOpen(false)}>
            <X size={24} className="text-gray-600" />
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-2 mt-4">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.text}
            </Link>
          ))}
          <div className="border-t border-gray-200/80 pt-4 mt-2">
            <Link
              to="/login"
              className="w-full text-center block bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold"
              onClick={() => setIsOpen(false)}
            >
              Log In
            </Link>
          </div>
        </nav>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
