// src/pages/UploadReport.jsx
import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

export default function UploadReport() {
  const [familyMembers, setFamilyMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState("");
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  // Fetch family members from API
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please login to fetch family members.");
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/get-member`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data?.data && Array.isArray(response.data.data)) {
          setFamilyMembers(response.data.data);
        } else {
          toast.error("Unexpected response format from server.");
        }
      } catch (error) {
        console.error("Error fetching members:", error);
        toast.error(error?.response?.data?.message || "Failed to fetch members");
      }
    };

    fetchMembers();
  }, []);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedMember || !file) {
      setMessage("Please select a member and choose a file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("memberId", selectedMember);
      formData.append("image", file); // <-- Must match your backend multer field
      formData.append("description", description);

      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(response.data.message || "Report uploaded successfully!");
      setMessage("Report uploaded successfully!");
      setSelectedMember("");
      setFile(null);
      setDescription("");
    } catch (error) {
      console.error("Error uploading report:", error);
      toast.error(error?.response?.data?.message || "Failed to upload report");
    }
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-green-700 mb-4">📤 Upload Report</h1>
        <p className="text-gray-500 mb-6">
          Upload health reports for yourself or your family members for analysis.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow p-6 max-w-lg mx-auto grid gap-4"
        >
          {/* Select Family Member */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Select Family Member
            </label>
            <select
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
              className="border p-2 rounded-md w-full"
              required
            >
              <option value="">-- Select --</option>
              {familyMembers.map((member) => (
                <option key={member._id} value={member._id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Choose File
            </label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="border p-2 rounded-md w-full"
              required
            />
          </div>

          {/* Optional Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Description (optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 rounded-md w-full"
              rows={3}
              placeholder="Add notes about the report..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            Upload
          </button>

          {/* Feedback Message */}
          {message && <p className="text-green-600 font-medium">{message}</p>}
        </form>
      </motion.div>
    </DashboardLayout>
  );
}
