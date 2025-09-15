import { Link } from "react-router-dom";
import { UserCircle } from "lucide-react"; // Asegúrate de tener lucide-react instalado

export default function Navbar() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          CreditBuilder
        </Link>

        {/* Navegación */}
        <nav className="flex items-center space-x-6">
          <Link to="/dashboard/foundation" className="text-gray-600 hover:text-blue-600">
            Foundation
          </Link>
          <Link to="/vendors" className="text-gray-600 hover:text-blue-600">
            Vendors Gallery
          </Link>
          <Link to="/credit-options" className="text-gray-600 hover:text-blue-600">
            Credit Options
          </Link>

          {/* Ícono usuario */}
          <Link to="/settings" className="text-gray-600 hover:text-blue-600">
            <UserCircle className="w-6 h-6" />
          </Link>

          {/* Botón logout */}
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
