"use client";

import { useEffect, useState } from "react";
import Header from "../_components/Header";
import Image from "next/image";
import village from '../../assets/village.png';
import img from "../../assets/rajput.jpg";
import { useRouter } from "next/navigation";

export default function SpecificCastePage() {
  const [caste, setCaste] = useState(null);
  const [families, setFamilies] = useState(null);
  const router = useRouter();
  
  // Load selected caste from local storage
  useEffect(() => {
    const storedCaste = localStorage.getItem("selectedCaste");
    if (storedCaste) {
        const data = JSON.parse(storedCaste);
      setCaste(data.casteName);
      setFamilies(data.families);
    }
  }, []);

  if (!caste) {
    return <p>Loading...</p>; // Show a loading message until caste data is loaded
  }

  const handleFamilyClick = (family) => {
    // Save the selected family to local storage
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedFamily", JSON.stringify({...family, caste: caste}));
    }
    // Navigate to the specific family page
    router.push("/specificfamily");
  };

  return (
    <div className="min-h-screen relative">
      <div className="absolute z-50 top-[0%] left-[0%] w-full text-white">
      <Header />

      </div>
      <div className="relative flex flex-col items-center justify-center text-white  text-center min-h-[90vh]">
        <Image
          src={village}
          alt="Village Background"
        //   layout="fill"
        //   objectFit="contain"
          className="z-[-1] absolute h-[90vh]"
        />
        <div className="absolute z-10 top-0 left-0 w-full h-full bg-green-300 opacity-50"></div>
        <h1 className="text-4xl relative z-20 font-bold mb-4">{caste} Families</h1>
        <p className="text-xl relative z-20 mb-8">Browse the families and their members within the {caste} caste.</p>
      </div>

      {/* Families Section */}
      <div className="max-w-7xl mx-auto py-8 px-4">
        <h2 className="text-3xl font-semibold mb-6">Families in {caste}</h2>
        {families?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {families?.map((family, index) => (
              <div key={index} className="bg-white cursor-pointer rounded-lg shadow-md overflow-hidden relative" onClick={()=>{
                handleFamilyClick(family)
              }}>
                <Image
                  src={img || "/path/to/placeholder.jpg"}
                  alt={family.familyName}
                  className="w-full h-40 object-cover"
                  objectFit="contain"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{family?.familyName[0]}</h3>
                  <p className="text-gray-600">Main Member: {family.mainPerson[0] || "N/A"}</p>
                  <div className="mt-2">
                    <h4 className="text-lg font-semibold">Members:{family?.members[0].length}</h4>
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
