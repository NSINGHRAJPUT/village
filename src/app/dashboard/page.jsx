"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaHome,
  FaSchool,
  FaCalendar,
  FaCreditCard,
  FaMoneyBill,
  FaFile,
  FaBalanceScale,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import axios from "axios";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [family, setFamily] = useState(null);
  const [Caste, setCaste] = useState([]);

  useEffect(() => {
    const fetchFamilyMembers = async () => {
      try {
        const response = await axios.get(`/api/family`);
        console.log(response);

        if (response.status === 200) {
          setFamilyMembers(response.data.data.members);
          setCaste(response.data.data.caste.name);
          setFamily(response.data.data.familyName)
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
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSearching(false); // Set searching state to false after search is complete
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800">Menu</h2>
          <nav className="mt-4">
            <ul>
              {[
                { name: "Dashboard", icon: <FaHome /> },
                {/* { name: "Education", icon: <FaSchool /> },
                { name: "Event", icon: <FaCalendar /> },
                { name: "Bank Credit", icon: <FaCreditCard /> },
                { name: "Financial", icon: <FaMoneyBill /> },
                { name: "Certificates", icon: <FaFile /> },
                { name: "Own Finance", icon: <FaBalanceScale /> },
                { name: "Settings", icon: <FaCog /> }, */},
                { name: "Post Job", icon: <FaFile /> },
              ].map((item) => (
                <li key={item.name} className="mb-2">
                  <a
                    href="#"
                    className="flex items-center p-2 text-gray-600 rounded hover:bg-gray-200"
                  >
                    {item.icon}
                    <span className="ml-4">{item.name}</span>
                  </a>
                </li>
              ))}
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
      <main className=" p-6 overflow-auto">
        <div className="mb-4 flex">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {searchResults.length > 0 ? (
            searchResults.map((member) => (
              <div key={member._id} className="p-4 bg-white shadow rounded-lg">
                <h2 className="text-xl font-semibold mb-2">{member.name}</h2>
                <p className="text-gray-700">Age: {member.dob}</p>
                <p className="text-gray-700">Mobile: {member.mobile}</p>
                <p className="text-gray-700">Caste: {Caste}</p>
                <img
                  src={member.photo}
                  alt={`${member.name}'s photo`}
                  className="mt-2 rounded"
                />
              </div>
            ))
          ) : familyMembers.length > 0 ? (
            familyMembers.map((member) => (
              <div key={member._id} className="p-4 bg-white shadow rounded-lg">
                <h2 className="text-xl font-semibold mb-2">{member.name}</h2>
                <p className="text-gray-700">Age: {member.dob}</p>
                <p className="text-gray-700">Mobile: {member.mobile}</p>
                <p className="text-gray-700">Caste: {Caste}</p>
                <img
                  src={member.photo}
                  alt={`${member.name}'s photo`}
                  className="mt-2 rounded"
                />
              </div>
            ))
          ) : (
            <p>No family members found.</p>
          )}
        </div>
      </main>
    </div>
  );
}
