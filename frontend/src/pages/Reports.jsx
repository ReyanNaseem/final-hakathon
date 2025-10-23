import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

export default function Reports() {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState("");
  const [reports, setReports] = useState([
    {
      member: "John Doe",
      fileName: "blood_test.pdf",
      description: "Annual blood test results",
      date: "2025-10-01",
      url: "#",
    },
    {
      member: "Jane Doe",
      fileName: "heart_scan.pdf",
      description: "Heart scan report",
      date: "2025-09-15",
      url: "#",
    },
    {
      member: "Alex Doe",
      fileName: "vaccination_record.pdf",
      description: "Vaccination record",
      date: "2025-08-20",
      url: "#",
    },
  ]);

  // Fetch family members from backend
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/get-member`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
          }
        );
        console.log(response)
        if (response.data?.data && Array.isArray(response.data.data)) {
          setMembers(response.data.data); // set the members
        } else {
          toast.error("Unexpected response format from server");
        }
      } catch (error) {
        console.error("Error fetching members:", error);
        toast.error(error?.response?.data?.message || "Failed to fetch members");
      }
    };

    fetchMembers();
  }, []);

  // Filter reports based on selected member
  const filteredReports = selectedMember
    ? reports.filter((r) => r.member === selectedMember)
    : reports;

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-green-700 mb-4">📊 Reports</h1>
        <p className="text-gray-500 mb-6">
          View and download all uploaded reports for your family members.
        </p>

        {/* Member Select Dropdown */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Select Family Member
          </label>
          <select
            value={selectedMember}
            onChange={(e) => setSelectedMember(e.target.value)}
            className="border p-2 rounded-md w-full sm:w-64"
          >
            <option value="">All Members</option>
            {members.map((member) => (
              <option key={member._id} value={member.name}>
                {member.name}
              </option>
            ))}
          </select>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.length === 0 && (
            <p className="text-gray-500">No reports available for this member.</p>
          )}

          {filteredReports.map((report, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
            >
              <h2 className="font-semibold text-lg mb-2">{report.fileName}</h2>
              <p className="text-gray-500 text-sm mb-1">
                <strong>Member:</strong> {report.member}
              </p>
              <p className="text-gray-500 text-sm mb-1">
                <strong>Description:</strong> {report.description}
              </p>
              <p className="text-gray-500 text-sm mb-3">
                <strong>Date:</strong> {report.date}
              </p>
              <a
                href={report.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition inline-block"
              >
                View / Download
              </a>
            </div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
