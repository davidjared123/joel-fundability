import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { UserCircle, Menu, X, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

import logo from "../assets/logo.png";

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
    <>
      <header className="bg-white/80 backdrop-blur-sm shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center">
            <img src={logo} alt="The Credit Builder" className="h-10 w-auto" />
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
              className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors"
              onClick={handleLogout}
            >
              Log out
            </button>
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
        <nav className="flex flex-col p-4 space-y-2">
          {/* User profile section */}
          <div className="flex items-center space-x-4 p-2 mb-4 border-b border-gray-200/80 pb-4">
            {profile && profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <UserCircle className="w-12 h-12 text-gray-400" />
            )}
            <div className="truncate">
              <p className="font-semibold text-gray-800 truncate">{profile?.full_name || 'User'}</p>
              <p className="text-sm text-gray-500 truncate">{profile?.email}</p>
            </div>
          </div>

          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/dashboard"}
              className={({ isActive }) =>
                `p-3 rounded-lg transition-colors ${isActive ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`
              }
              onClick={() => setIsOpen(false)}
            >
              {link.text}
            </NavLink>
          ))}

          <div className="border-t border-gray-200/80 pt-4 mt-4 space-y-2">
            <NavLink
              to="/dashboard/settings"
              className={({ isActive }) =>
                `p-3 rounded-lg flex items-center space-x-3 transition-colors ${isActive ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`
              }
              onClick={() => setIsOpen(false)}
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </NavLink>

            <button
              className="w-full text-left p-3 rounded-lg flex items-center space-x-3 text-red-500 hover:bg-red-50 transition-colors"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
              <span>Log out</span>
            </button>
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