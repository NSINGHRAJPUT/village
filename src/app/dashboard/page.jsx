"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaHome, FaSignOutAlt, FaPlus } from "react-icons/fa";
import axios from "axios";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [family, setFamily] = useState(null);
  const [caste, setCaste] = useState("");
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    dob: "",
    mobile: "",
    photo: null,
    relationToMainPerson: "",
  });

  useEffect(() => {
    const fetchFamilyMembers = async () => {
      try {
        const response = await axios.get(`/api/family`);
        if (response.status === 200) {
          setFamilyMembers(response.data.data.members);
          setCaste(response.data.data.caste.name);
          setFamily(response.data.data.familyName);
        }
      } catch (error) {
        console.error("Error fetching family members:", error);
      }
    };

    fetchFamilyMembers();
  }, []);

  const handleSearch = async () => {
    setIsSearching(true);
    try {
      const response = await axios.get(`/api/search?search=${searchQuery}`);
      if (response.status === 200) {
        setSearchResults(response.data.members);
      }
    } catch (error) {
      console.error("Error during search:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleAddMember = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newMember.name);
      formData.append("dob", newMember.dob);
      formData.append("mobile", newMember.mobile);
      formData.append("relationToMainPerson", newMember.relationToMainPerson);
      formData.append("familyId", familyMembers[0]?.familyId || ""); // Include family ID
      formData.append("caste", familyMembers[0]?.caste || ""); // Include caste
      if (newMember.photo) {
        formData.append("photo", newMember.photo); // Include photo file
      }

      const response = await axios.post("/api/family", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setFamilyMembers([...familyMembers, response.data.member]);
        setShowAddMemberModal(false);
        setNewMember({
          name: "",
          dob: "",
          mobile: "",
          photo: null,
          relationToMainPerson: "",
        });
      }
    } catch (error) {
      console.error("Error adding family member:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800">Menu</h2>
          <nav className="mt-4">
            <ul>
              <li className="mb-2">
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-600 rounded hover:bg-gray-200"
                >
                  <FaHome />
                  <span className="ml-4">Dashboard</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <Link
          href="/"
          className="mt-auto p-4 flex items-center text-gray-600 hover:bg-gray-200"
        >
          <FaSignOutAlt />
          <span className="ml-4">Logout</span>
        </Link>
      </aside>
      <main className="flex-grow p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 border border-gray-300 rounded"
              placeholder="Search members by name, age, mobile number, or caste"
            />
            <button
              onClick={handleSearch}
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={isSearching}
            >
              {isSearching ? "Searching..." : "Search"}
            </button>
          </div>
          <button
            onClick={() => setShowAddMemberModal(true)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center"
          >
            <FaPlus className="mr-2" /> Add Member
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {familyMembers.map((member) => (
            <div key={member._id} className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-xl font-semibold mb-2">{member.name}</h2>
              <p className="text-gray-700">Age: {member.dob}</p>
              <p className="text-gray-700">Mobile: {member.mobile}</p>
              <p className="text-gray-700">Caste: {caste}</p>
              {member.photo && (
                <img
                  src={member.photo}
                  alt={`${member.name}'s photo`}
                  className="mt-2 rounded w-full h-40 object-cover"
                />
              )}
            </div>
          ))}
        </div>

        {showAddMemberModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">Add Family Member</h2>
              <div className="mb-4">
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  value={newMember.name}
                  onChange={(e) =>
                    setNewMember({ ...newMember, name: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={newMember.dob}
                  onChange={(e) =>
                    setNewMember({ ...newMember, dob: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Mobile</label>
                <input
                  type="text"
                  value={newMember.mobile}
                  onChange={(e) =>
                    setNewMember({ ...newMember, mobile: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Relation to Main Person</label>
                <input
                  type="text"
                  value={newMember.relationToMainPerson}
                  onChange={(e) =>
                    setNewMember({
                      ...newMember,
                      relationToMainPerson: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setNewMember({
                      ...newMember,
                      photo: e.target.files?.[0] || null,
                    })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowAddMemberModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddMember}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Add Member
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
