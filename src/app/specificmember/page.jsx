"use client";

import Header from "../_components/Header";
import Image from "next/image";
import { useEffect, useState } from "react";
import Footer from "../_components/Footer";

export default function Page() {
  const [member, setMember] = useState(null);

  useEffect(() => {
    // Retrieve the selected member details from localStorage
    if (typeof window !== "undefined") {
      const storedMember = localStorage.getItem("selectedMember");
      if (storedMember) {
        setMember(JSON.parse(storedMember));
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="absolute z-50 top-0 left-0 w-full text-white">
        <Header />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center pt-24 px-4 md:px-0 md:pt-32">
        <div className="bg-white shadow-md rounded-lg max-w-5xl w-full p-8 flex flex-col md:flex-row items-center md:items-start">
          {/* Profile Picture and Info */}
          <div className="flex flex-col items-center w-full md:w-1/2">
            {/* Profile Picture */}
            <div className="bg-green-200 rounded-full p-2 mb-4">
              {member?.photo && (
                <Image
                  src={member?.photo}
                  alt={`${member?.name}'s photo`}
                  width={120}
                  height={120}
                  className="rounded-full"
                />
              )}
            </div>

            {/* Member Info */}
            <div className="text-gray-700 text-lg font-karma font-semibold space-y-2">
              <p >નામ :- <span className="font-normal">{member?.name}</span></p>
              <p>સભ્ય સાથે સબંધ :- <span className="font-normal">પોતે</span></p>
              <p>પરણીત / બિનપરણીત :- <span className="font-normal">અપરશીત</span></p>
              <p>જન્મતારીખ :- <span className="font-normal">{member?.dob}</span></p>
              <p>મોસાળ શાખ :- <span className="font-normal">{member?.moshal}</span></p>
              <p>અભ્યાસ :- <span className="font-normal">{member?.occupation}</span></p>
              <p>વ્યવસાય નું સરનામું :- <span className="font-normal">સરનામું</span></p>
              <p>રહેણાક નું સરનામું :- <span className="font-normal">સરનામું</span></p>
              <p>મોબાઈલ નંબર :- <span className="font-normal">777777 </span></p>
              <p>બ્લડ ગુપ :- <span className="font-normal">B+</span></p>
            </div>
          </div>

          {/* Right Side Buttons */}
          <div className="w-full md:w-1/2 flex flex-col mt-8 md:mt-0 md:pl-8 space-y-4">
            {["મેમ્બરની વિગતો", "અન્ય મેમ્બર 1", "અન્ય મેમ્બર 2", "અન્ય મેમ્બર 3", "અન્ય મેમ્બર 4"].map((buttonText, index) => (
              <button
                key={index}
                className="bg-green-100 text-green-700 py-2 px-4 rounded-lg text-center font-medium shadow-sm hover:bg-green-200 transition-colors"
              >
                {buttonText}
              </button>
            ))}
          </div>
        </div>
      </div>
     <div className="mt-8">
     <Footer />
     </div>
    </div>
  );
}
