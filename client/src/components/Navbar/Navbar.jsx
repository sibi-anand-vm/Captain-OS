import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Navbar({ onBrandClick }) {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

        
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={onBrandClick}
          >
            <span className="text-white text-xl font-bold tracking-wide">
              Captain<span className="text-indigo-500">OS</span>
            </span>
          </div>

          
          <div className="hidden md:flex flex-1 mx-6">
            <div className="relative w-full">

              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-4.35-4.35m1.85-5.65a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
                  />
                </svg>
              </div>

              <input
                type="text"
                placeholder="Search tasks, projects, people..."
                className="w-full bg-gray-800 text-gray-300 placeholder-gray-500
                pl-10 pr-4 py-2 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-indigo-500
                transition"
              />
            </div>
          </div>

          
          <div className="flex items-center gap-6">

            
            <button className="text-gray-400 hover:text-white transition">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

           
            <div className="flex items-center gap-3">

              <Link
                to="/Profile"
                className="flex items-center gap-2 hover:bg-gray-700 px-3 py-1 rounded-lg transition"
              >

                
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-indigo-600 text-white font-semibold">
                  {(auth?.username || auth?.user?.name || "U")
                    .charAt(0)
                    .toUpperCase()}
                </div>

                
                <span className="hidden sm:block text-gray-300 text-sm font-medium">
                  {auth?.username || auth?.user?.name}
                </span>

              </Link>

              
              <button
                onClick={handleLogout}
                className="text-sm bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded-md text-white transition"
              >
                Logout
              </button>

            </div>

            
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-gray-400 hover:text-white text-xl"
            >
              ☰
            </button>

          </div>
        </div>
      </div>

      
      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <div className="relative">

            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-4.35-4.35m1.85-5.65a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
                />
              </svg>
            </div>

            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-gray-800 text-gray-300
              pl-10 pr-4 py-2 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

