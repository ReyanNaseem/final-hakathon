// src/components/Footer.jsx
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#31473A] text-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow">
              <i className="ri-road-map-line text-[#31473A] text-2xl"></i>
            </div>
            <span className="text-xl font-bold text-white">
              Hakathon
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center md:justify-end gap-6 font-medium">
            <Link to="/about" className="hover:underline hover:text-gray-300">About</Link>
            <Link to="/contact" className="hover:underline hover:text-gray-300">Contact</Link>
            <Link to="/privacy" className="hover:underline hover:text-gray-300">Privacy</Link>
            <Link to="/terms" className="hover:underline hover:text-gray-300">Terms</Link>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-8 text-center text-gray-400 text-sm border-t border-gray-500 pt-6">
          © {new Date().getFullYear()} Hakathon. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
