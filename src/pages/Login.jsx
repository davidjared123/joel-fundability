import { useState, useEffect } from "react";
import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthNavbar from "@/components/AuthNavbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, signIn } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const { error } = await signIn(email, password);

    if (error) {
      setErrorMsg(error.message);
    }

    setLoading(false);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setErrorMsg("Error sending reset email. Please try again.");
    } else {
      setSuccessMsg("Check your email for password reset instructions.");
      setShowForgotPassword(false);
    }
    
    setLoading(false);
  };

  return (
    <>
      <AuthNavbar mode="login" />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            {showForgotPassword ? "Reset Password" : "Sign in to your account"}
          </h2>

          {errorMsg && (
            <p className="text-red-500 text-sm text-center mb-4">{errorMsg}</p>
          )}
          
          {successMsg && (
            <p className="text-green-500 text-sm text-center mb-4">{successMsg}</p>
          )}

          <form onSubmit={showForgotPassword ? handleForgotPassword : handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border bg-white text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {!showForgotPassword && (
              <div>
                <label className="block text-sm text-gray-600 mb-1">Password</label>
                <input
                  type="password"
                  name="current-password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border bg-white  text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
                <div className="text-right mt-1">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white`}
            >
              {loading
                ? (showForgotPassword ? "Sending..." : "Signing in...")
                : (showForgotPassword ? "Send Reset Email" : "Log in")
              }
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            {showForgotPassword ? (
              <>
                Remember your password?{" "}
                <button
                  onClick={() => setShowForgotPassword(false)}
                  className="text-blue-500 hover:underline"
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <a href="/register" className="text-blue-500 hover:underline">
                  Create one
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
