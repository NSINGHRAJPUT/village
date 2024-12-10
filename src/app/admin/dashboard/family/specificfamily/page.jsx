"use client";
import { useRouter,useSearchParams  } from "next/navigation";
import { useState, useEffect } from "react";
import MemberForm from "@/app/_components/MemberForm";
import Loading from "@/app/_components/Loading";
import MainMemberCard from "@/app/_components/Admin/MainMemberCard";

export default function SpecificfamiliesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [families, setFamilies] = useState(null);
  const [addMemberModal, setAddMemberModal] = useState(false);
  const [castName, setCaste] = useState(null);
  const [load, setLoad] = useState(true);

  const castid = searchParams.get("castid");  
  
  const featchCastFamilyData = async () => {
    setLoad(true);
    try {
      const response = await fetch(`/api/family/${castid}`);

      if (response.ok) {
        const result = await response.json();
        // console.log("Response:", result);

        if (result.success) {
          const data = result.data;
          // console.log("Data fff :", data);
          setCaste(data.casteName);
          setFamilies(data);
          // localStorage.setItem("adminSelectedCaste", JSON.stringify(data));
        }
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    featchCastFamilyData();
  }, []);

  // Toggle Modal
  const handleAddMember = () => {
    setAddMemberModal(!addMemberModal);
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
            + Add Main Member
          </button>
        </div>
      </div>

      {!load && 
       ( families?.length > 0 ? (
        families?.map((family, index) => (
            <MainMemberCard
              key={index}
              mainPerson={family.mainPerson}
            />
        ))
      ) : (
        <p className="font-karma text-2xl text-primary text-center">
          No families found.
        </p>
      ))}

      {addMemberModal && (
        <MemberForm
          handleModal={handleAddMember}
          mainPerson={true}
          casteId={castid}
          setLoad={setLoad}
          featchData={featchCastFamilyData}
        />
      )}
    </div>
  );
}
