"use client";

import { useEffect, useState } from "react";
import Header from "../_components/Header";
import img from "../../assets/rajput.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import village from "../../assets/village.png";
import About from "../_components/About";
import { Icon } from "@iconify/react";
import familyPage from "../../assets/familyPage.jpg";
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
        const response = await fetch("api/getAllCasteFamilies");
        const data = await response.json();
        // console.log(data);
      } catch (error) {
        console.error("Error fetching family data:", error);
      }
    };
    getFamilies();
  }, []);

  return (
    <div className="min-h-screen relative">
      <div className="absolute z-50 top-[0%] left-[0%] w-full text-white">
        <Header />
      </div>
      <div className="relative text-white py-16 px-4 text-center min-h-[90vh] pt-[15vh]">
        <Image
          src={familyPage}
          alt="Village Background"
          layout="fill"
          objectFit="cover"
          className="z-[-1]" // To make sure it sits behind other content
        />
        <div className="absolute z-10 top-0 left-0 w-full h-full bg-[#144F0F80] text-white"></div>
        
          
          <h1 className="text-2xl md:text-4xl z-20 font-karma font-bold absolute bottom-24 left-1/2 transform -translate-x-1/2 w-full">
           <div className="bg-primary m-3 p-4 rounded-lg ring-[1px] ring-white">
            કમાલપુર પટેલ પરિવાર અમદાવાદ
            </div>
          </h1>
       

        {/* <p className="text-xl relative z-20 mb-8">
          Search for family members by caste
        </p> */}
        {/* <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 relative z-20 rounded border outline-none border-gray-300 text-black"
          placeholder="Search by caste"
        /> */}
      </div>

      {/* Castes Section */}
      <div className="mx-auto w-[90%] md:w-[85%] lg:w-[80%] py-8 px-4">
    
        {families?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {families
              ?.filter((family) =>
                family.casteName
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              )
              ?.map((family, index) => (
                <div
                  key={index}
                  onClick={() => handleFamilyClick(family)}
                  className="bg-white cursor-pointer h-40 rounded-3xl shadow-md p-2 overflow-hidden relative"
                  style={{
                    boxShadow:
                      "0px 5px 4px 0px #144F0F inset, 0px 5px 4px 0px #144F0F",
                    padding: "16px",
                  }}
                >
                  <h3 className="text-3xl h-full font-medium text-primary font-karma flex justify-center items-center">
                    {family.casteName}
                  </h3>

                  <div className="absolute top-3 right-3 bg-[#144F0F1A] h-11 w-11  text-xs font-bold rounded-full  flex justify-center items-center gap-1  text-primary">
                    <span>
                      <Icon
                        icon="fluent:person-12-filled"
                        className="text-lg"
                      />
                    </span>
                    <span className="text-lg font-karma pt-[2px]">
                      {family.families?.length}{" "}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <p className="font-karma text-2xl text-primary text-center">
            No families found.
          </p>
        )}
      </div>
    </div>
  );
}
