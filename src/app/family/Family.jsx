"use client";

import { useEffect, useState } from "react";
import Header from "../_components/Header";
import img from "../../assets/rajput.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import village from '../../assets/village.png'

export default function FamilyPage({ families }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  // Handle selecting a specific family and saving it to local storage
  const handleFamilyClick = (family) => {
    // Save the selected family to local storage
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedCaste", JSON.stringify(family));
    }
    // Navigate to the specific family page
    router.push("/specificcaste");
  };


  useEffect(() => {
    const getFamilies = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/getAllCasteFamilies");
        const data = await response.json();
        console.log(data)
      } catch (error) {
        console.error("Error fetching family data:", error);
      }
    }
    getFamilies()
  },[])

  
  return (
    <div className="min-h-screen relative">
      <div className="absolute z-50 top-[0%] left-[0%] w-full text-white">
        <Header />
      </div>
      <div className="relative text-white py-16 px-4 text-center min-h-[90vh] pt-[15vh]">
        <Image
          src={village}
          alt="Village Background"
          layout="fill"
          objectFit="cover"
          className="z-[-1]" // To make sure it sits behind other content
        />
         <div className="absolute z-10 top-0 left-0 w-full h-full bg-green-300 opacity-50 text-white"></div>
        <h1 className="text-4xl relative z-20 mt-16 font-bold mb-4">Find Your Family</h1>
        <p className="text-xl relative z-20 mb-8">Search for family members by caste</p>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 relative z-20 rounded border outline-none border-gray-300 text-black"
          placeholder="Search by caste"
        />
      </div>

      {/* Castes Section */}
      <div className="max-w-7xl mx-auto py-8 px-4">
        <h2 className="text-3xl font-semibold mb-6">All Castes</h2>
        {families?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {families
              ?.filter((family) =>
                family.casteName.toLowerCase().includes(searchQuery.toLowerCase())
              )
              ?.map((family, index) => (
                <div
                  key={index}
                  onClick={() => handleFamilyClick(family)}
                  className="bg-white cursor-pointer rounded-lg shadow-md overflow-hidden relative"
                >
                  <Image
                    src={img || "/path/to/placeholder.jpg"}
                    alt={family.casteName}
                    className="w-full h-40 object-cover"
                    objectFit="contain"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold">{family.casteName}</h3>
                    <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold rounded-full px-2 py-1">
                      {family.families?.length}{" "}
                      {family.families?.length > 1 ? "families" : "family"}
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
