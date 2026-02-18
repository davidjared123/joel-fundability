import { Link } from "react-router-dom";

import logo from "../assets/logo.png";

export default function AuthNavbar({ mode = "login" }) {
  // mode === 'login'  -> botón "Create account"
  // mode === 'register' -> botón "Log in"
  const isLogin = mode === "login";

  return (
    <header className="bg-white flex justify-between items-center px-6 py-4 shadow-md sticky top-0 z-40">
      <Link to="/" className="flex items-center">
        <img src={logo} alt="The Credit Builder" className="h-20 w-auto" />
      </Link>

      <nav className="flex items-center space-x-4">
        {isLogin ? (
          <Link
            to="/register"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm md:text-base"
          >
            Create account
          </Link>
        ) : (
          <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm md:text-base"
          >
            Log in
          </Link>
        )}
      </nav>
    </header>
  );
}