// src/components/Sidebar.jsx
import { useState } from "react";
import { LayoutDashboard, FileUp, HeartPulse, BarChart3, LogOut, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ open, setOpen }) {
  const location = useLocation();

  const menus = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Upload Report", icon: FileUp, path: "/upload" },
    { name: "Vitals", icon: HeartPulse, path: "/vitals" },
    { name: "Reports", icon: BarChart3, path: "/reports" },
  ];

  return (
    <motion.aside
      animate={{ width: open ? 250 : 0 }}
      transition={{ type: "spring", stiffness: 120 }}
      className={`fixed top-0 left-0 h-full bg-gradient-to-b from-green-700 to-green-900 text-white shadow-lg overflow-hidden z-40 ${
        open ? "px-4 py-6" : "p-0"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-white">HealthMate</h1>
      </div>

      {/* Menu Items */}
      <nav className="space-y-3">
        {menus.map((menu, i) => {
          const Icon = menu.icon;
          const isActive = location.pathname === menu.path;

          return (
            <Link
              key={i}
              to={menu.path}
              onClick={() => open && setOpen(false)} // auto-close on mobile
              className={`flex items-center gap-3 px-3 py-2 rounded-xl transition ${
                isActive
                  ? "bg-green-500 text-white shadow-md"
                  : "text-gray-200 hover:bg-green-600 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{menu.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-6 left-4 right-4">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:bg-red-600 hover:text-white rounded-xl w-full transition"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </motion.aside>
  );
}
