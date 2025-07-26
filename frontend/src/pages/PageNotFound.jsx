// src/components/NotFound.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-[#EDF4F2] px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg"
      >
        {/* Icon circle */}
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white shadow-xl mb-6">
          <i className="ri-road-map-line text-[#31473A] text-5xl"></i>
        </div>

        {/* 404 text */}
        <h1 className="text-7xl font-extrabold text-gray-800 tracking-tight">
          404
        </h1>
        <p className="mt-4 text-2xl font-semibold text-gray-700">
          Page Not Found
        </p>
        <p className="mt-2 text-gray-500">
          Sorry, we couldn’t find the page you’re looking for.  
          It might have been moved or deleted.
        </p>

        {/* Button */}
        <Link
          to={'/login'}
          className="mt-8 inline-block px-8 py-3 rounded border-2 border-[#31473A] text-[#31473A] hover:bg-[#31473A] hover:text-white text-lg font-medium shadow-lg transition-all duration-500"
        >
          Go Back
        </Link>
      </motion.div>
    </div>
  );
}
