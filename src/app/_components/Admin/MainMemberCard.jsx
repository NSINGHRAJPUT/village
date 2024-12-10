"use client";
import { useRouter} from "next/navigation";
import React, { useEffect } from "react";

function MainMemberCard({ mainPerson }) {
  
  const router = useRouter();

  const handleFamilyClick = () => {
    router.push(`/admin/dashboard/family/specificfamily/members?familyid=${mainPerson.familyId}`); 
  }

  return (
    <div
      className="p-3 m-3 rounded-xl font-karma h-32 bg-[#D2DDD1] flex gap-5"
      key={mainPerson?._id}
    >
      <div className="w-32 bg-white h-full flex rounded-md"></div>

      <div className="my-auto space-y-1">
        <p>નામ : {mainPerson?.name}</p>
        <p> સભ્ય સાથે સબંધ : {mainPerson?.relationToMainPerson} </p>
        <p> મોબાઈલ નંબર : {mainPerson?.mobile}</p>
      </div>

      <div className="space-y-1.5 flex flex-col ml-auto">
        <button
          className=" text-center text-primary text-base ring-1 ring-primary w-32 py-1 px-3 rounded-md hover:text-white hover:bg-primary"
          onClick={handleFamilyClick}
        >
          View
        </button>
        {/* <button className=" text-primary text-base ring-1 ring-primary w-32 py-1 px-3 rounded-md text-center hover:text-white hover:bg-primary">
          Add Member
        </button> */}
        {/* <button className=" text-primary text-base ring-1 ring-primary w-32 py-1 px-3 rounded-md text-center hover:text-white hover:bg-primary">
          Delete
        </button> */}
      </div>
    </div>
  );
}

export default MainMemberCard;
