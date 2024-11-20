"use client";

import { useState, useEffect } from "react";
import Header from "../_components/Header";
import { useRouter } from "next/navigation";
import village from "../../assets/village.png";
import Image from "next/image";
import { set } from "mongoose";

export default function SpecificFamily() {
  const [family, setFamily] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedFamily = localStorage.getItem("selectedFamily");
      if (storedFamily) {
        const data = JSON.parse(storedFamily);
        console.log(data.members[0][0]);

        setFamily(data);
        setSelectedMember(data.members[0][0]);
        console.log("Stored Family:", storedFamily);
      } else {
        router.push("/specificcaste");
      }
    }
  }, [router]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleMemberClick = (index) => {
    setSelectedMember(family.members[0][index]);
  };

  // const handleMemberClick = (member) => {
  //   // Save the selected family to local storage
  //   if (typeof window !== "undefined") {
  //     localStorage.setItem(
  //       "selectedMember",
  //       JSON.stringify({ ...member, caste: family?.caste })
  //     );
  //   }
  //   // Navigate to the specific family page
  //   router.push("/specificmember");
  // };

  return (
    <div className="min-h-screen relative">
      <div className="absolute z-50 top-[0%] left-[0%] w-full text-white">
        <Header />
      </div>
      <div className="relative flex flex-col items-center justify-center text-white  text-center min-h-[90vh]">
        <Image
          src={village}
          alt="Village Background"
          className="z-[-1] absolute h-[90vh]"
        />
        <div className="absolute z-10 top-0 left-0 w-full h-full bg-[#144F0F80] text-white"></div>
        <h1 className="text-5xl relative z-20 font-bold mb-4 font-karma">
          {family?.caste || "Family Details"}
        </h1>
        <p className="text-xl relative z-20 mb-8 font-karma">
          Check Member Details
        </p>
      </div>

      <div className="mx-auto w-[90%]  lg:w-[85%] py-8 px-4">
        <h2 className="text-3xl text-center md:text-4xl break-words font-bold mb-6 text-primary font-karma">
          Members of {family?.familyName[0]}
        </h2>

        <div className="w-full flex flex-col md:flex-row justify-between gap-8">
          <div className="w-full md:w-[50%] text-primary text-lg font-semibold space-y-2">
            <p className>
              નામ :-{" "}
              <span className="font-normal text-[#144F0FB3] break-words">
                {selectedMember?.name}
              </span>
            </p>
            <p>
              સભ્ય સાથે સબંધ :-{" "}
              <span className="font-normal text-[#144F0FB3] break-words">
                પોતે
              </span>
            </p>
            <p>
              પરણીત / બિનપરણીત :-{" "}
              <span className="font-normal text-[#144F0FB3] break-words">
                અપરશીત
              </span>
            </p>
            <p>
              જન્મતારીખ :-{" "}
              <span className="font-normal text-[#144F0FB3] break-words">
                {selectedMember?.dob}
              </span>
            </p>
            <p>
              મોસાળ શાખ :-
              <span className="font-normal text-[#144F0FB3] break-words">
                {selectedMember?.moshal}
              </span>
            </p>
            <p>
              અભ્યાસ :-
              <span className="font-normal text-[#144F0FB3] break-words">
                {selectedMember?.occupation}
              </span>
            </p>
            <p>
              વ્યવસાય નું સરનામું :-{" "}
              <span className="font-normal text-[#144F0FB3] break-words">
                સરનામું
              </span>
            </p>
            <p>
              રહેણાક નું સરનામું :-{" "}
              <span className="font-normal text-[#144F0FB3] break-words">
                સરનામું
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
              <span className="font-normal text-[#144F0FB3]">B+</span>
            </p>
          </div>

          <div className="w-full md:w-[50%] flex flex-col gap-4 ">
            {family?.members[0]?.length > 0 ? (
              family.members[0]
                .filter((member) =>
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
        </div>
      </div>
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
