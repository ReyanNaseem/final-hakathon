import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { motion } from "framer-motion";
import { CloudCog } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Dashboard() {
  // Initial family members (replace with API data later)
  const [familyMembers, setFamilyMembers] = useState([
    {
      name: "John Doe",
      age: 35,
      relation: "Father",
      vitals: { heartRate: "78 bpm", bp: "120/80", oxygen: "98%", temp: "36.8°C" },
    },
    {
      name: "Jane Doe",
      age: 33,
      relation: "Mother",
      vitals: { heartRate: "75 bpm", bp: "118/76", oxygen: "97%", temp: "36.7°C" },
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    age: "",
    relation: "",
    gender: '',

  });

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: value });
  };

  // Handle form submit
  const handleAddMember = async(e) => {
    e.preventDefault();
    setFamilyMembers([
      ...familyMembers,
      {
        name: newMember.name,
        age: newMember.age,
        relation: newMember.relation,
        vitals: {
          heartRate: newMember.heartRate,
          bp: newMember.bp,
          oxygen: newMember.oxygen,
          temp: newMember.temp,
        },
      },
    ]);

    console.log(newMember)

    try {
       const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/add-member`, newMember, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        toast.success(response.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message);
    }

    setNewMember({ name: "", age: "", relation: "", gender:"" });
    setShowForm(false);
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-green-700 mb-4">👨‍👩‍👧 Family Dashboard</h1>
        <p className="text-gray-500 mb-6">
          Monitor the health data of all your family members at a glance.
        </p>

        {/* Add Family Member Button */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition mb-4"
        >
          {showForm ? "Close Form" : "Add Family Member"}
        </button>

        {/* Add Family Member Form */}
        {showForm && (
          <form
            onSubmit={handleAddMember}
            className="bg-white rounded-xl shadow p-6 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newMember.name}
              onChange={handleChange}
              required
              className="border p-2 rounded-md w-full"
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={newMember.age}
              onChange={handleChange}
              required
              className="border p-2 rounded-md w-full"
            />
            <input
              type="text"
              name="relation"
              placeholder="Relation"
              value={newMember.relation}
              onChange={handleChange}
              required
              className="border p-2 rounded-md w-full"
            />
            <input
              type="text"
              name="gender"
              placeholder="Gender"
              value={newMember.gender}
              onChange={handleChange}
              className="border p-2 rounded-md w-full"
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition col-span-full"
            >
              Add Member
            </button>
          </form>
        )}

        {/* List of Family Members */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {familyMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
            >
              <h2 className="font-semibold text-lg mb-2">
                {member.name} ({member.relation})
              </h2>
              <p className="text-gray-500 text-sm mb-2">Age: {member.age}</p>
              <div className="grid grid-cols-2 gap-2 text-gray-700">
                <div className="bg-green-50 p-2 rounded-md text-center">
                  <p className="font-medium text-sm">Heart Rate</p>
                  <p className="text-green-600 font-bold">{member.vitals.heartRate}</p>
                </div>
                <div className="bg-green-50 p-2 rounded-md text-center">
                  <p className="font-medium text-sm">Blood Pressure</p>
                  <p className="text-green-600 font-bold">{member.vitals.bp}</p>
                </div>
                <div className="bg-green-50 p-2 rounded-md text-center">
                  <p className="font-medium text-sm">Oxygen</p>
                  <p className="text-green-600 font-bold">{member.vitals.oxygen}</p>
                </div>
                <div className="bg-green-50 p-2 rounded-md text-center">
                  <p className="font-medium text-sm">Temperature</p>
                  <p className="text-green-600 font-bold">{member.vitals.temp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
