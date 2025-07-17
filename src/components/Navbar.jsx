// src/components/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          CreditBuilder
        </Link>

        {/* Usuario / Menú de navegación */}
        <nav className="flex items-center space-x-4">
          <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">
            Dashboard
          </Link>
          <Link to="/settings" className="text-gray-600 hover:text-blue-600">
            Settings
          </Link>
          <button
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
          >
            Log out
          </button>
        </nav>
      </div>
    </header>
  );
}
