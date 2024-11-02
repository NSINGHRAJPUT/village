"use client";

import { useState, useEffect } from "react";
import Header from "../_components/Header";
import { useRouter } from "next/navigation";

export default function SpecificFamily() {
  const [family, setFamily] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedFamily = localStorage.getItem("selectedFamily");
      if (storedFamily) {
        const data = JSON.parse(storedFamily);
        console.log(data)
        setFamily(data);
        console.log("Stored Family:", storedFamily);
      } else {
        router.push("/specificcaste");
      }
    }
  }, [router]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleMemberClick = (member) => {
    // Save the selected family to local storage
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedMember", JSON.stringify({...member, caste: family?.caste}));
    }
    // Navigate to the specific family page
    router.push("/specificmember");
  };

  return (
    <div className="min-h-screen relative">
      <div className="absolute z-50 top-[0%] left-[0%] w-full text-white">
        <Header />
      </div>
      {/* Hero Section */}
      <div className="text-white py-16 px-4 text-center min-h-[60vh] pt-[15vh] bg-gray-400">
        <h1 className="text-4xl font-bold mb-4">
          {family?.caste || "Family Details"}
        </h1>
        <p className="text-xl mb-8">Search for family members</p>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 rounded border outline-none border-gray-300 text-black"
          placeholder="Search by member name"
        />
      </div>

      {/* Family Members Section */}
      <div className="max-w-7xl mx-auto py-8 px-4">
        <h2 className="text-3xl font-semibold mb-6">
          Members of {family?.familyName[0]}
        </h2>
        {family?.members[0]?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" >
            {family.members[0]
              .filter((member) =>
                member.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((member, index) => (
                <div
                  key={member._id}
                  className="p-4 bg-white cursor-pointer shadow rounded-lg"
                  onClick={() => handleMemberClick(member)}
                >
                  <h2 className="text-xl font-semibold mb-2">{member.name}</h2>
                  <p className="text-gray-700">Age: {member.dob}</p>
                  <p className="text-gray-700">Mobile: {member.mobile}</p>
                  <p className="text-gray-700">Caste: {family.caste}</p>
                  <img
                    src={member.photo}
                    alt={`${member.name}'s photo`}
                    className="mt-2 rounded"
                  />
                </div>
              ))}
          </div>
        ) : (
          <p>No members found.</p>
        )}
      </div>
    </div>
  );
}
