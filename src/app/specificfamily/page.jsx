"use client";

import { useState, useEffect } from "react";
import Header from "../_components/Header";
import { useRouter } from "next/navigation";
import village from "../../assets/village.png";
import Image from "next/image";
import { set } from "mongoose";
import memberPage from "../../assets/memberPage.jpg";
import Footer from "../_components/Footer";

export default function SpecificFamily() {
  const [family, setFamily] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const [selectedMember, setSelectedMember] = useState(null);
  const [familyName, setFamilyName] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedFamily = localStorage.getItem("selectedFamily");
      if (storedFamily) {
        const data = JSON.parse(storedFamily);
        // console.log("data : ", data.members);

        setFamily(data.members);

        data?.members?.some((m) => {
          if (m.isMainPerson) {
            setFamilyName(m.name);
            return true; // Exits the loop
          }
          return false;
        });
        setSelectedMember(data.members[0]);
        // console.log("Stored Family:", storedFamily);
      } else {
        router.push("/specificcaste");
      }
    }
  }, [router]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleMemberClick = (index) => {
    setSelectedMember(family[index]);
  };
  return (
    <div className="min-h-screen relative">
      <div className="absolute z-50 top-[0%] left-[0%] w-full text-white">
        <Header />
      </div>
      <div className="relative flex flex-col items-center justify-center text-white  text-center min-h-[90vh]">
        <Image
          src={memberPage}
          alt="Village Background"
          className="z-[-1] absolute h-[90vh]"
        />
        <div className="absolute z-10 top-0 left-0 w-full h-full bg-[#144F0F80] text-white"></div>

        <h1 className="text-2xl md:text-4xl z-20 font-karma font-bold absolute bottom-24 left-1/2 transform -translate-x-1/2 w-full">
          <div className="bg-primary m-3 p-4 rounded-lg ring-[1px] ring-white">
            {familyName} પરિવારની સભ્યોની વિગતો
          </div>
        </h1>
      </div>

      <div className="mx-auto w-[90%]  lg:w-[85%] py-8 px-4">
        <div className="w-full flex flex-col md:flex-row justify-between gap-8">
          <div className="w-full md:w-[50%] flex flex-col gap-4 ">
            <p className="text-lg font-semibold underline mb-2 text-primary text-center">
              સભ્ય સિલેક્ટ કરો
            </p>

            {family?.length > 0 ? (
              family
                ?.filter((member) =>
                  member.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((member, index) => (
                  <button
                    key={index}
                    className={`bg-[#144F0F1A] text-primary py-3 px-4 rounded-lg text-center font-medium shadow-sm hover:bg-primary break-words hover:text-[#ffffff] transition-colors
                  ${
                    selectedMember?._id === member._id &&
                    "bg-primary text-white"
                  }
                  `}
                    onClick={() => handleMemberClick(index)}
                  >
                    <h2 className="text-xl font-semibold ">{member.name}</h2>
                  </button>
                ))
            ) : (
              <p>No members found.</p>
            )}
          </div>
          <div className="w-full md:w-[50%] text-primary text-lg font-semibold space-y-2 ">
          <p className="text-lg font-semibold underline text-primary text-start mb-2">
            સિલેક્ટ કરેલ સભ્ય ની માહિતી 
            </p>
            <p>
              નામ :-{" "}
              <span className="font-normal text-[#144F0FB3] break-words">
                {selectedMember?.name}
              </span>
            </p>
            <p>
              સભ્ય સાથે સબંધ :-{" "}
              <span className="font-normal text-[#144F0FB3] break-words">
                {selectedMember?.relationToMainPerson}
              </span>
            </p>
            <p>
              પરણીત / બિનપરણીત :-{" "}
              <span className="font-normal text-[#144F0FB3] break-words">
                {selectedMember?.isMarried ? "પરણીત" : "બિનપરણીત"}
              </span>
            </p>
            <p>
              જન્મતારીખ :-{" "}
              <span className="font-normal text-[#144F0FB3] break-words">
                {selectedMember?.dob
                  ?.split("T")[0]
                  ?.split("-")
                  .reverse()
                  .join("-")}
              </span>
            </p>
            <p>
              મોસાળ શાખ :-
              <span className="font-normal text-[#144F0FB3] break-words">
                {selectedMember?.maternalSurname}
              </span>
            </p>
            <p>
              અભ્યાસ :-
              <span className="font-normal text-[#144F0FB3] break-words">
                {selectedMember?.education}
              </span>
            </p>
            <p>
              વ્યવસાય નું સરનામું :-{" "}
              <span className="font-normal text-[#144F0FB3] break-words">
                {selectedMember?.occupationAddress}
              </span>
            </p>
            <p>
              રહેણાક નું સરનામું :-{" "}
              <span className="font-normal text-[#144F0FB3] break-words">
                {selectedMember?.residentAddress}
              </span>
            </p>
            <p>
              મોબાઈલ નંબર :-{" "}
              <span className="font-normal text-[#144F0FB3] break-words">
                {selectedMember?.mobile}
              </span>
            </p>
            <p>
              બ્લડ ગુપ :-{" "}
              <span className="font-normal text-[#144F0FB3]">
                {selectedMember?.bloodGroup}
              </span>
            </p>
          </div>
        </div>
      </div>
      <Footer />
 
    </div>
  );
}

{
  /* <p className="text-xl mb-8">Search for family members</p>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 rounded border outline-none border-gray-300 text-black"
          placeholder="Search by member name"
        />  */
}

{
  /* Family Members Section */
}
