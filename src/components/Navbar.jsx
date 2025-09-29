import { NavLink, Link } from "react-router-dom";
import { UserCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { profile } = useAuth();
  const activeClassName = "text-blue-600 font-bold";
  const inactiveClassName = "text-gray-600 hover:text-blue-600";

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          CreditBuilder
        </Link>

        {/* Navegación */}
        <nav className="flex items-center space-x-6">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              isActive ? activeClassName : inactiveClassName
            }
          >
            Foundation
          </NavLink>
          <NavLink
            to="/vendors"
            className={({ isActive }) =>
              isActive ? activeClassName : inactiveClassName
            }
          >
            Vendors Gallery
          </NavLink>
          <NavLink
            to="/credit-options"
            className={({ isActive }) =>
              isActive ? activeClassName : inactiveClassName
            }
          >
            Credit Options
          </NavLink>

          {/* Ícono usuario */}
          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              isActive ? activeClassName : inactiveClassName
            }
          >
            {profile && profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <UserCircle className="w-6 h-6" />
            )}
          </NavLink>

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