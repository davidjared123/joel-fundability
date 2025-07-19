import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function VerifyReset() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleVerification = async () => {
      try {
        // Obtener el token de la URL
        const token = searchParams.get('token');
        const type = searchParams.get('type');

        if (token && type === 'recovery') {
          // Verificar el token
          const { error } = await supabase.auth.verifyOtp({
            token_hash: token,
            type: 'recovery'
          });

          if (error) {
            setError("Invalid or expired reset link. Please try again.");
            setTimeout(() => {
              navigate("/login");
            }, 3000);
          } else {
            // Token válido, redirigir a reset password
            navigate("/reset-password");
          }
        } else {
          setError("Invalid reset link.");
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      } catch {
        setError("An error occurred. Please try again.");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } finally {
        setLoading(false);
      }
    };

    handleVerification();
  }, [searchParams, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying reset link...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <a 
            href="/login" 
            className="text-blue-500 hover:underline"
          >
            Back to Login
          </a>
        </div>
      </div>
    );
  }

  return null;
} 