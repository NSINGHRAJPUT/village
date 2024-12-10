"use client";
import React, { useEffect, useState } from "react";
import MemberForm from "../MemberForm";
import Loading from "../Loading";
import toast from "react-hot-toast";
import MemberViewModal from "./MemberViewModal";
import { useRouter} from "next/navigation";


function MemberCard({ member, fetchData }) {
  const router = useRouter();
  const [editMemberModal, setEditMemberModal] = useState(false);
  const [viewMemberModal, setViewMemberModal] = useState(false);
  const [load, setLoad] = useState(false);
  const handleEditMember = () => {
    setEditMemberModal(!editMemberModal);
  };

  const handleViewMember = () => {
    setViewMemberModal(!viewMemberModal);
  };

  const onDelete = async (member) => {
    setLoad(true);
    const data = { memberId: member._id };
    try {
      const response = await fetch(`/api/familyMember`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      // console.log("Response:", result);

      if (response.ok) {
        toast.success("Member Delete successfully");
        if(member.isMainPerson){
          router.push(`/admin/dashboard/family`); 
        }else{
          fetchData();
        }
      }
    } catch (error) {
      console.error("Error Delete Meber data:", error);
      toast.error("Member Not Deleted! Please try again.");
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className="p-3 m-3 rounded-xl font-karma h-32 bg-[#D2DDD1] flex gap-5">
      {load && <Loading />}
      <div className="w-32 bg-white h-full flex rounded-md"></div>

      <div className="my-auto space-y-1">
        <p>નામ : {member?.name}</p>
        <p> સભ્ય સાથે સબંધ : {member?.relationToMainPerson} </p>
        <p> મોબાઈલ નંબર : {member?.mobile}</p>
      </div>

      <div className="space-y-1.5 flex flex-col ml-auto">
        <button
          className=" text-center text-primary text-base ring-1 ring-primary w-32 py-1 px-3 rounded-md hover:text-white hover:bg-primary"
          onClick={handleViewMember}
        >
          View
        </button>
        <button
          className=" text-primary text-base ring-1 ring-primary w-32 py-1 px-3 rounded-md text-center hover:text-white hover:bg-primary"
          onClick={handleEditMember}
        >
          Edit
        </button>
        <button
          className=" text-primary text-base ring-1 ring-primary w-32 py-1 px-3 rounded-md text-center hover:text-white hover:bg-primary"
          onClick={() => onDelete(member)}
        >
          Delete
        </button>
      </div>

      {editMemberModal && (
        <MemberForm
          handleModal={handleEditMember}
          setLoad={setLoad}
          editForm={true}
          data={member}
          fetchData={fetchData}
        />
      )}

      {viewMemberModal && (
        <MemberViewModal member={member} handleModal={handleViewMember} />
      )}
    </div>
  );
}

export default MemberCard;
