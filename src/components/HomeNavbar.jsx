import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function HomeNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: "/contact", text: "Contact Us", className: "text-gray-700 hover:text-blue-600" },
    { to: "/register", text: "Sign Up", className: "text-gray-700 hover:text-blue-600" },
  ];

  return (
    <header className="bg-white flex justify-between items-center px-6 py-4 shadow-md sticky top-0 z-40">
      <h1 className="text-2xl font-bold text-blue-600">
        <Link to="/">CreditBuilder</Link>
      </h1>
      
      {/* Navegación de escritorio */}
      <nav className="hidden md:flex items-center space-x-4 text-sm md:text-base">
        {navLinks.map(link => (
          <Link key={link.to} to={link.to} className={link.className}>{link.text}</Link>
        ))}
        <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Log In</Link>
      </nav>

      {/* Botones y menú móvil */}
      <div className="md:hidden flex items-center space-x-4">
        <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm">Log In</Link>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menú Overlay Móvil */}
      {isOpen && (
        <div className="md:hidden fixed top-0 left-0 w-full h-full bg-white z-50">
           <div className="flex justify-end p-4">
             <button onClick={() => setIsOpen(false)}>
                <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col items-center space-y-6 mt-8">
            {navLinks.map(link => (
              <Link 
                key={link.to} 
                to={link.to} 
                className={`text-xl ${link.className}`}
                onClick={() => setIsOpen(false)}
              >
                {link.text}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
