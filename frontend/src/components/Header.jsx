import React from "react";
import { Link } from "react-router-dom";
import { Code2, Home, Trophy } from "lucide-react";

const Header = () => {
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
            to="/problems"
            className="text-tech-cyan hover:text-tech-lime transition duration-300 text-sm font-bold uppercase tracking-wide hover:shadow-neon"
          >
            Practice
          </Link>
          <Link
            to="/contests"
            className="flex items-center gap-2 text-tech-cyan hover:text-tech-lime transition duration-300 font-bold text-sm uppercase tracking-wide hover:shadow-neon"
          >
            <Trophy className="w-5 h-5" />
            <span>Contests</span>
          </Link>
          <button className="px-5 py-2 bg-gradient-to-r from-tech-cyan to-tech-lime text-tech-black rounded font-black uppercase text-sm hover:shadow-neon hover:shadow-neon-lime transition duration-300 border border-tech-cyan transform hover:scale-105">
            JOIN
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;




