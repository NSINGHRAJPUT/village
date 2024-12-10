"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Icon } from "@iconify/react";
import MemberForm from "@/app/_components/MemberForm";
import Loading from "@/app/_components/Loading";
import MemberCard from "@/app/_components/Admin/MemberCard";
import toast from "react-hot-toast";

function page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [allMembers, setAllMembers] = useState([]);
  const [addMemberModal, setAddMemberModal] = useState(false);
  const [casteId, setCasteId] = useState(null);

  const familyid = searchParams.get("familyid");
  const [spinnerLoad, setSpinnerLoad] = useState(false);
  const [load, setLoad] = useState(true);

  // Toggle Modal
  const handleAddMember = () => {
    setAddMemberModal(!addMemberModal);
  };

  useEffect(() => {
    featchMembers();
  }, []);

  const featchMembers = async () => {
    setLoad(true);

    try {
      const response = await fetch(`/api/familyById/${familyid}`);
      if (response.ok) {
        const result = await response.json();
        // console.log("Response:", result);

        if (result.success) {
          const data = result.data;
          // console.log("Data mmm :", data);
          setAllMembers(data.members);
          setCasteId(data.caste);
        }
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching data");
    } finally {
      setLoad(false);
    }
    setLoad(false);
  };

  return (
    <div>
      {load && <Loading />}

      <div className="p-3 font-karma">
        {/* Add families Button */}
        <div className="flex justify-end w-full">
          <button
            className="w-fit bg-primary text-lg text-white py-2 px-3 rounded-xl"
            onClick={handleAddMember}
          >
            + Add Member
          </button>
        </div>
      </div>

      {!load &&
        (allMembers?.length > 0 ? (
          allMembers?.map((member, index) => (
            <MemberCard key={index} member={member} fetchData={featchMembers} />
          ))
        ) : (
          <p className="font-karma text-2xl text-primary text-center">
            No Member found.
         
          </p>
        ))}

      {addMemberModal && (
        <MemberForm
          handleModal={handleAddMember}
          mainPerson={false}
          casteId={casteId}
          setLoad={setLoad}
          familyId={familyid}
          featchData={featchMembers}
        />
      )}
    </div>
  );
}

export default page;
