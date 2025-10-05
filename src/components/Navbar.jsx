import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { UserCircle, Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { profile, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    setIsOpen(false);
    navigate('/');
  };

  const activeClassName = "text-blue-600 font-bold";
  const inactiveClassName = "text-gray-600 hover:text-blue-600";

  const navLinks = [
    { to: "/dashboard", text: "Foundation" },
    { to: "/vendors", text: "Vendors Gallery" },
    { to: "/credit-options", text: "Credit Options" },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          CreditBuilder
        </Link>

        {/* Navegación de escritorio */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/dashboard"}
              className={({ isActive }) =>
                isActive ? activeClassName : inactiveClassName
              }
            >
              {link.text}
            </NavLink>
          ))}

          {/* Ícono usuario */}
          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              `${isActive ? activeClassName : inactiveClassName} flex items-center`
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
            onClick={handleLogout}
          >
            Log out
          </button>
        </nav>

        {/* Botón de menú móvil */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
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
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/dashboard"}
                className={({ isActive }) =>
                  isActive ? `text-xl ${activeClassName}` : `text-xl ${inactiveClassName}`
                }
                onClick={() => setIsOpen(false)} // Cierra el menú al hacer clic
              >
                {link.text}
              </NavLink>
            ))}

            {/* Ícono usuario */}
            <NavLink
              to="/dashboard/settings"
              className={({ isActive }) =>
                isActive ? `text-xl ${activeClassName}` : `text-xl ${inactiveClassName}`
              }
              onClick={() => setIsOpen(false)}
            >
               {profile && profile.avatar_url ? (
                <div className="flex flex-col items-center space-y-2">
                  <img
                    src={profile.avatar_url}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <span>Settings</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <UserCircle className="w-8 h-8" />
                  <span>Settings</span>
                </div>
              )}
            </NavLink>

            {/* Botón logout */}
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
              onClick={handleLogout}
            >
              Log out
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}