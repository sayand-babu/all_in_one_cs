import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = () => {
    setIsLoading(true);

    // IMPORTANT: redirect to BACKEND, not frontend origin
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo / Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Judge API
          </h1>
          <p className="text-gray-400 mt-3 text-lg">
            Coding Contest Platform
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 space-y-8 shadow-xl">
          <h2 className="text-2xl font-bold text-center text-white">
            Sign in to Judge API
          </h2>

          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 py-3 rounded-lg font-semibold text-lg transition hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <span className="w-5 h-5 border-2 border-gray-800 border-t-transparent rounded-full animate-spin" />
                Redirecting…
              </>
            ) : (
              <>
                <FcGoogle className="w-6 h-6" />
                Continue with Google
              </>
            )}
          </button>

          <p className="text-xs text-gray-400 text-center">
            Secure authentication powered by Google OAuth 2.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
