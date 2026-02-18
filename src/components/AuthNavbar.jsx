import { Link } from "react-router-dom";

export default function AuthNavbar({ mode = "login" }) {
  // mode === 'login'  -> botón "Create account"
  // mode === 'register' -> botón "Log in"
  const isLogin = mode === "login";

  return (
    <header className="bg-white flex justify-between items-center px-6 py-4 shadow-md sticky top-0 z-40">
      <h1 className="leading-none flex items-center gap-2">
        <img src="/iso.svg" alt="The Credit Builder Logo" className="w-10 h-10" />
        <Link to="/" className="flex flex-col">
          <span className="text-2xl font-bold text-blue-600">The Credit Builder</span>
          <span className="text-xs font-medium text-blue-400 tracking-wider uppercase">AI Credit Builder</span>
        </Link>
      </h1>

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