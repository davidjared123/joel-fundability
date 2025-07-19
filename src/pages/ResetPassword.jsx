import { useState, useEffect } from "react";
import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('ResetPassword component loaded');
    console.log('Current URL:', window.location.href);
    
    // Verificar si hay un access_token en el hash de la URL
    const hash = window.location.hash;
    console.log('Hash:', hash);
    
    if (hash && hash.includes('access_token')) {
      // Extraer el access_token del hash
      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get('access_token');
      console.log('Access token found:', !!accessToken);
      
      if (accessToken) {
        // Establecer la sesión con el token
        console.log('Setting session with token...');
        supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: params.get('refresh_token')
        }).then(({ error }) => {
          if (error) {
            console.error('Session error:', error);
            setErrorMsg("Invalid or expired reset link. Please try again.");
            setTimeout(() => {
              navigate("/login");
            }, 3000);
          } else {
            console.log('Session set successfully');
            setIsAuthenticated(true);
          }
        });
      }
    } else {
      console.log('No access_token found in hash');
      setErrorMsg("Invalid reset link. Please try again.");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [navigate]);

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      setLoading(false);
      return;
    }

    // Validar longitud mínima
    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });
      
      if (error) {
        setErrorMsg(error.message);
      } else {
        setSuccessMsg("Password updated successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      setErrorMsg(`${error} An error occurred while updating password`);
    } finally {
      setLoading(false);
    }
  };

  // Si no está autenticado, mostrar loading o error
  if (!isAuthenticated && !errorMsg) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying reset link...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Reset Your Password
        </h2>

        {errorMsg && (
          <p className="text-red-500 text-sm text-center mb-4">{errorMsg}</p>
        )}
        
        {successMsg && (
          <p className="text-green-500 text-sm text-center mb-4">{successMsg}</p>
        )}

        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border bg-white text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your new password"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border bg-white text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Confirm your new password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg transition ${
              loading 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Remember your password?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
} 