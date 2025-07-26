// src/components/Header.jsx
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();

    const logoutHandler = ()=>{
        localStorage.removeItem('token'),
        navigate('/login')
    }
  return (
    <header className="w-full bg-[#EDF4F2] shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Left: Logo/Brand */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow">
            <i className="ri-road-map-line text-[#31473A] text-2xl"></i>
          </div>
          <span className="text-xl font-bold text-[#31473A]">
            Hakathon
          </span>
        </Link>

        {/* Right: Nav / Logout */}
        <div className="flex items-center gap-4">
          {/* Example nav links */}
          <Link
            to="/dashboard"
            className="text-[#31473A] font-medium hover:underline"
          >
            Dashboard
          </Link>
          <Link
            to="/about"
            className="text-[#31473A] font-medium hover:underline"
          >
            About
          </Link>

          {/* Logout button */}
          <button
            onClick={logoutHandler}
            className="px-4 py-2 bg-[#31473A] text-white rounded-xl shadow hover:bg-[#223227] transition-transform transform hover:scale-105"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
