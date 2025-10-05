import { NavLink, Link } from "react-router-dom";
import { UserCircle, Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const { profile } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeClassName = "text-blue-600 font-bold";
  const inactiveClassName = "text-gray-600 hover:text-blue-600";

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          CreditBuilder
        </Link>

        {/* Navegación desktop */}
        <nav className="hidden md:flex items-center space-x-6">
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
            aria-label="Abrir ajustes"
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

        {/* Botón menú móvil */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-controls="mobile-menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="sr-only">Abrir menú</span>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Panel móvil como overlay */}
      <div
        id="mobile-menu"
        className={`${mobileOpen ? "flex" : "hidden"} md:hidden fixed inset-0 z-[100] bg-white`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 py-6 flex flex-col">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl font-bold text-blue-600" onClick={closeMobile}>
              CreditBuilder
            </Link>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={closeMobile}
              aria-label="Cerrar menú"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-8 flex-1 overflow-y-auto">
            <div className="flex flex-col space-y-5 text-lg">
              <NavLink
                to="/dashboard"
                end
                onClick={closeMobile}
                className={({ isActive }) =>
                  isActive ? activeClassName : inactiveClassName
                }
              >
                Foundation
              </NavLink>
              <NavLink
                to="/vendors"
                onClick={closeMobile}
                className={({ isActive }) =>
                  isActive ? activeClassName : inactiveClassName
                }
              >
                Vendors Gallery
              </NavLink>
              <NavLink
                to="/credit-options"
                onClick={closeMobile}
                className={({ isActive }) =>
                  isActive ? activeClassName : inactiveClassName
                }
              >
                Credit Options
              </NavLink>
              <NavLink
                to="/dashboard/settings"
                onClick={closeMobile}
                className={({ isActive }) =>
                  isActive ? activeClassName : inactiveClassName
                }
                aria-label="Abrir ajustes"
              >
                {profile && profile.avatar_url ? (
                  <span className="inline-flex items-center space-x-3">
                    <img
                      src={profile.avatar_url}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span>Settings</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center space-x-3">
                    <UserCircle className="w-6 h-6" />
                    <span>Settings</span>
                  </span>
                )}
              </NavLink>
            </div>
          </div>

          <div className="pt-4 border-t">
            <button
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700"
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}