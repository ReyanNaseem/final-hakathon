import DashboardLayout from "../components/DashboardLayout";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Welcome Section */}
        <h1 className="text-3xl font-bold text-green-700 mb-4">
          👋 Welcome Back!
        </h1>
        <p className="text-gray-500 mb-6">
          Manage your reports, vitals, and AI summaries right from your dashboard.
        </p>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <h2 className="font-semibold text-lg mb-2">📊 Reports</h2>
            <p className="text-gray-500 text-sm mb-2">
              View all your health reports and AI summaries.
            </p>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
              View Reports
            </button>
          </div>

          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <h2 className="font-semibold text-lg mb-2">💓 Vitals</h2>
            <p className="text-gray-500 text-sm mb-2">
              Monitor your health vitals and trends over time.
            </p>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
              Check Vitals
            </button>
          </div>

          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <h2 className="font-semibold text-lg mb-2">📤 Upload Report</h2>
            <p className="text-gray-500 text-sm mb-2">
              Upload your latest health reports for AI analysis.
            </p>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
              Upload Now
            </button>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
