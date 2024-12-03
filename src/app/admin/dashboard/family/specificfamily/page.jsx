"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Icon } from "@iconify/react";
import MemberForm from "@/app/_components/MemberForm";
export default function SpecificFamilyPage() {
  const [family, setFamily] = useState(null);
  const [addMemberModal, setAddMemberModal] = useState(false);

  const [load, setLoad] = useState(true);

  useEffect(() => {
    setLoad(true);
    // Retrieve family data from localStorage
    const familyData = localStorage.getItem("familyData");
    if (familyData) {
      setFamily(JSON.parse(familyData));
    }
    setLoad(false);
  }, []);

  // Toggle Modal
  const handleAddMember = () => {
    setAddMemberModal(!addMemberModal);
  };

  return (
    <div>
      <div className="p-3 font-karma">
        {/* Add Family Button */}
        <div className="flex justify-end w-full">
          <button
            className="w-fit bg-primary text-lg text-white py-2 px-3 rounded-xl"
            onClick={handleAddMember}
          >
            + Add Main Member
          </button>
        </div>
      </div>

      {load ? (
        "Loadin ....."
      ) : family?.id ? (
        <>
          <p>Family ID: {family.id}</p>
          <p>Family Name: {family.name}</p>
        </>
      ) : (
        <p>No Family data available.</p>
      )}

      <div className="p-3 m-3 rounded-xl font-karma h-32 bg-[#D2DDD1] flex gap-5">
        <div className="w-32 bg-white h-full flex rounded-md"></div>

        <div className="my-auto space-y-1">
          <p>નામ : વિરુગમા કૃણાલભાઈ બળદેવભાઈ </p>
          <p> સભ્ય સાથે સબંધ : પોતે </p>
          <p> મોબાઈલ નંબર : 7046740595 </p>
        </div>

        <div className="space-y-1.5 flex flex-col ml-auto">
          <button className=" text-center text-primary text-base ring-1 ring-primary w-32 py-1 px-3 rounded-md hover:text-white hover:bg-primary">
            View
          </button>
          <button className=" text-primary text-base ring-1 ring-primary w-32 py-1 px-3 rounded-md text-center hover:text-white hover:bg-primary">
            Add Member
          </button>
          <button className=" text-primary text-base ring-1 ring-primary w-32 py-1 px-3 rounded-md text-center hover:text-white hover:bg-primary">
            Delete
          </button>
        </div>
      </div>

      {addMemberModal && <MemberForm handleAddMember={handleAddMember} />}
    </div>
  );
}
