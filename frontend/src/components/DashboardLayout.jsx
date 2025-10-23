import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(true);

  // Automatically close sidebar on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) { // Tailwind lg breakpoint
        setOpen(false);
      } else {
        setOpen(true);
      }
    };

    // Run on mount
    handleResize();

    // Listen for resize
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setOpen(!open);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Mobile toggle button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 bg-green-600 text-white p-2 rounded-md shadow-md"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Main content */}
      <main
        className={`transition-all duration-300 flex-1 p-6 ${
          open ? "lg:ml-[250px]" : "lg:ml-0"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
