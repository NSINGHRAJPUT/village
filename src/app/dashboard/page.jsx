"use client";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/search?search=${searchQuery}`);
      if (response.status === 200) {
        setSearchResults(response.data.members);
      }

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800">Menu</h2>
          <nav className="mt-4">
            <ul>
              <li className="mb-2">
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-600 rounded hover:bg-gray-200"
                >
                  {/* <span className="material-icons">home</span> */}
                  <span className="ml-4">Home</span>
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-600 rounded hover:bg-gray-200"
                >
                  {/* <span className="material-icons">schedule</span> */}
                  <span className="ml-4">Schedule</span>
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-600 rounded hover:bg-gray-200"
                >
                  {/* <span className="material-icons">assessment</span> */}
                  <span className="ml-4">Reports</span>
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-600 rounded hover:bg-gray-200"
                >
                  {/* <span className="material-icons">shopping_bag</span> */}
                  <span className="ml-4">Products</span>
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-600 rounded hover:bg-gray-200"
                >
                  <span className="material-icons">people</span>
                  {/* <span className="ml-4">Community</span> */}
                </a>
              </li>
              <li className="mb-2">
                <Link
                  href="/"
                  className="flex items-center p-2 text-gray-600 rounded hover:bg-gray-200"
                >
                  <span className="material-icons">Logout</span>
                  {/* <span className="ml-4">Community</span> */}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Community Dashboard</h1>
        <div className="mb-4">
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
          >
            Search
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {searchResults.map((member) => (
            <div key={member._id} className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-xl font-semibold mb-2">{member.name}</h2>
              <p className="text-gray-700">Age: {member.age}</p>
              <p className="text-gray-700">Mobile: {member.mobile}</p>
              <p className="text-gray-700">Caste: {member.caste}</p>
              <img
                src={member.photo}
                alt={`${member.name}'s photo`}
                className="mt-2 rounded"
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
