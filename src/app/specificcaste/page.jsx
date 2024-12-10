"use client";

import { useEffect, useState } from "react";
import Header from "../_components/Header";
import Image from "next/image";
import village from "../../assets/village.png";
import img from "../../assets/rajput.jpg";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import castPage from "../../assets/castPage.jpg";
import Footer from "../_components/Footer";

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
      localStorage.setItem(
        "selectedFamily",
        JSON.stringify({ ...family, caste: caste })
      );
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
          src={castPage}
          alt="Village Background"
          //   layout="fill"
          //   objectFit="contain"
          className="z-[-1] absolute h-[90vh]"
        />
        <div className="absolute z-10 top-0 left-0 w-full h-full bg-[#144F0F80] text-white"></div>

        <h1 className="text-2xl md:text-4xl z-20 font-karma font-bold absolute bottom-24 left-1/2 transform -translate-x-1/2 w-full">
          <div className="bg-primary m-3 p-4 rounded-lg ring-[1px] ring-white">
            {caste} પરિવાર
          </div>
        </h1>
      </div>

      {/* Families Section */}
      <div className="mx-auto w-[90%] md:w-[85%] lg:w-[80%] py-8 px-4">
        {/* <h2 className="text-3xl text-center md:text-4xl break-words font-bold mb-6 text-primary font-karma">
          Families in {caste}
        </h2> */}

        {families?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {families?.map((family, index) => {
              // Find the main person in the members array
              const mainPerson = family.members.find(
                (member) => member.isMainPerson === true
              );

              return (
                <div
                  key={index}
                  onClick={() => handleFamilyClick(family)}
                  className="bg-white cursor-pointer h-40 rounded-3xl p-2 shadow-md overflow-hidden relative"
                  style={{
                    boxShadow:
                      "0px 5px 4px 0px #144F0F inset, 0px 5px 4px 0px #144F0F",
                    padding: "16px",
                  }}
                >
                  <h3 className="text-3xl h-full font-medium text-primary font-karma flex justify-center items-center">
                    {/* Display main member's name */}
                    {mainPerson ? mainPerson.name : "No Main Person"}
                  </h3>
                  <div className="absolute top-3 right-3 bg-[#144F0F1A] h-11 w-11 text-xs font-bold rounded-full flex justify-center items-center gap-1 text-primary">
                    <span>
                      <Icon
                        icon="fluent:person-12-filled"
                        className="text-lg"
                      />
                    </span>
                    <span className="text-lg font-karma pt-[2px]">
                      {family?.members?.length || 0}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="font-karma text-2xl text-primary text-center">
            No families found.
          </p>
        )}
      </div>
    <Footer />

    </div>
  );
}
