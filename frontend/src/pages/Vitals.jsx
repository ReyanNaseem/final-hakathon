// src/pages/Vitals.jsx
import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { motion } from "framer-motion";

export default function Vitals() {
  // Sample family members data
  const [familyMembers, setFamilyMembers] = useState([
    {
      name: "John Doe",
      vitals: { heartRate: "78 bpm", bp: "120/80", oxygen: "98%", temp: "36.8°C" },
    },
    {
      name: "Jane Doe",
      vitals: { heartRate: "75 bpm", bp: "118/76", oxygen: "97%", temp: "36.7°C" },
    },
    {
      name: "Alex Doe",
      vitals: { heartRate: "90 bpm", bp: "105/65", oxygen: "99%", temp: "37°C" },
    },
  ]);

  const [selectedMember, setSelectedMember] = useState(familyMembers[0].name);

  const [newVitals, setNewVitals] = useState({
    heartRate: "",
    bp: "",
    oxygen: "",
    temp: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewVitals({ ...newVitals, [name]: value });
  };

  // Handle vitals update
  const handleUpdateVitals = (e) => {
    e.preventDefault();
    setFamilyMembers((prev) =>
      prev.map((member) =>
        member.name === selectedMember
          ? {
              ...member,
              vitals: {
                heartRate: newVitals.heartRate || member.vitals.heartRate,
                bp: newVitals.bp || member.vitals.bp,
                oxygen: newVitals.oxygen || member.vitals.oxygen,
                temp: newVitals.temp || member.vitals.temp,
              },
            }
          : member
      )
    );
    setNewVitals({ heartRate: "", bp: "", oxygen: "", temp: "" });
  };

  const currentVitals = familyMembers.find((m) => m.name === selectedMember).vitals;

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-green-700 mb-4">💓 Vitals</h1>
        <p className="text-gray-500 mb-6">
          View and update health vitals for yourself or your family members.
        </p>

        {/* Select Family Member */}
        <div className="mb-6 max-w-md">
          <label className="block text-gray-700 font-medium mb-1">
            Select Family Member
          </label>
          <select
            value={selectedMember}
            onChange={(e) => setSelectedMember(e.target.value)}
            className="border p-2 rounded-md w-full"
          >
            {familyMembers.map((member, idx) => (
              <option key={idx} value={member.name}>
                {member.name}
              </option>
            ))}
          </select>
        </div>

        {/* Current Vitals */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-md text-center">
            <p className="font-medium text-sm">Heart Rate</p>
            <p className="text-green-600 font-bold">{currentVitals.heartRate}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-md text-center">
            <p className="font-medium text-sm">Blood Pressure</p>
            <p className="text-green-600 font-bold">{currentVitals.bp}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-md text-center">
            <p className="font-medium text-sm">Oxygen</p>
            <p className="text-green-600 font-bold">{currentVitals.oxygen}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-md text-center">
            <p className="font-medium text-sm">Temperature</p>
            <p className="text-green-600 font-bold">{currentVitals.temp}</p>
          </div>
        </div>

        {/* Update Vitals Form */}
        <form
          onSubmit={handleUpdateVitals}
          className="bg-white rounded-xl shadow p-6 max-w-md grid gap-4"
        >
          <h2 className="font-semibold text-lg mb-2">Update Vitals</h2>
          <input
            type="text"
            name="heartRate"
            placeholder="Heart Rate (e.g., 80 bpm)"
            value={newVitals.heartRate}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
          />
          <input
            type="text"
            name="bp"
            placeholder="Blood Pressure (e.g., 120/80)"
            value={newVitals.bp}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
          />
          <input
            type="text"
            name="oxygen"
            placeholder="Oxygen Level (e.g., 98%)"
            value={newVitals.oxygen}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
          />
          <input
            type="text"
            name="temp"
            placeholder="Temperature (e.g., 36.8°C)"
            value={newVitals.temp}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            Update Vitals
          </button>
        </form>
      </motion.div>
    </DashboardLayout>
  );
}