import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Code2, Home, Trophy, LogOut, User } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Check if user is authenticated
    const auth = localStorage.getItem("isAuthenticated");
    const user = localStorage.getItem("currentUser");

    if (auth === "true" && user) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("currentUser");
    setIsAuthenticated(false);
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <header className="bg-tech-black border-b border-tech-cyan/30 sticky top-0 z-50 shadow-neon">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-tech-pink via-tech-purple to-tech-cyan rounded-xl flex items-center justify-center group-hover:animate-pulse transition shadow-neon-pink">
            <Code2 className="w-6 h-6 text-tech-black font-bold" />
          </div>
          <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-tech-cyan via-tech-lime to-tech-pink highlight-neon">
            JUDGE
          </span>
        </Link>

        <nav className="flex items-center gap-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-tech-cyan hover:text-tech-lime transition duration-300 font-bold text-sm uppercase tracking-wide hover:shadow-neon"
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>
          <Link
            to="/contests"
            className="flex items-center gap-2 text-tech-cyan hover:text-tech-lime transition duration-300 font-bold text-sm uppercase tracking-wide hover:shadow-neon"
          >
            <Trophy className="w-5 h-5" />
            <span>Contests</span>
          </Link>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 px-3 py-1 bg-gray-800 rounded text-tech-cyan text-sm">
                  <User size={16} />
                  <span>{currentUser?.name || currentUser?.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-bold text-sm uppercase transition duration-300 hover:shadow-neon"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-gradient-to-r from-tech-cyan to-tech-lime text-tech-black rounded font-bold uppercase text-sm hover:shadow-neon hover:shadow-neon-lime transition duration-300 border border-tech-cyan transform hover:scale-105"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-gradient-to-r from-tech-pink to-tech-purple text-white rounded font-bold uppercase text-sm hover:shadow-neon hover:shadow-neon-pink transition duration-300 border border-tech-pink transform hover:scale-105"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;