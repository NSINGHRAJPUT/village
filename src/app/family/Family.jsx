"use client";

import { useState } from "react";
import Header from "../_components/Header";
import img from "../../assets/rajput.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function FamilyPage({ families }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  console.log(families);
  // Handle selecting a specific family and saving it to local storage
  const handleFamilyClick = (family) => {
    // Save the selected family to local storage
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedFamily", JSON.stringify(family));
    }
    // Navigate to the specific family page
    router.push("/specificfamily");
  };
  return (
    <div className="min-h-screen relative">
      <div className="absolute z-50 top-[0%] left-[0%] w-full text-white">
        <Header />
      </div>
      {/* Hero Section */}
      <div
        className="text-white py-16 px-4 text-center min-h-[60vh] pt-[15vh] bg-gray-400"
        style={{ backgroundImage: `url(${img})` }}
      >
        <h1 className="text-4xl font-bold mb-4">Find Your Family</h1>
        <p className="text-xl mb-8">Search for family members by caste</p>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 rounded border outline-none border-gray-300 text-black"
          placeholder="Search by caste"
        />
      </div>

      {/* Castes Section */}
      <div className="max-w-7xl mx-auto py-8 px-4">
        <h2 className="text-3xl font-semibold mb-6">All Castes</h2>
        {families?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {families
              .filter((family) =>
                family.caste.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((family, index) => (
                <div
                  key={index}
                  onClick={() => handleFamilyClick(family)}
                  className="bg-white cursor-pointer rounded-lg shadow-md overflow-hidden relative"
                >
                  <Image
                    src={img || "/path/to/placeholder.jpg"}
                    alt={family.caste}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold">{family.caste}</h3>
                    <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold rounded-full px-2 py-1">
                      {family.membersCount}{" "}
                      {family.membersCount > 1 ? "families" : "family"}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <p>No families found.</p>
        )}
      </div>
    </div>
  );
}
