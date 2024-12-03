"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

export default function FamilyPage() {
  const router = useRouter();
  const [addFamilyModal, setAddFamilyModal] = useState(false);

  const [familyData, setFamilyData] = useState([]);

  // Yup Schema for Validation
  const schema = yup.object().shape({
    familyName: yup.string().required("Family Name is required"),
  });

  // useForm Hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema), // Connect Yup validation
  });

  // Form Submission Handler
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // Close modal after saving
    setAddFamilyModal(false);
    // Reset form after submission
    reset();
  };

  // Toggle Modal
  const handleAddFamilyModal = () => {
    setAddFamilyModal(!addFamilyModal);
  };

  const featchFamilyData = async () => {
    try {
      setFamilyData(["Family 1", "Family 2", "Family 3"]);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    featchFamilyData();
  }, []);

  const handleFamilyClick = (family) => {
    // Store the family data in localStorage
    localStorage.setItem(
      "familyData",
      JSON.stringify({ id: 12, name: family })
    );

    // Navigate to the specific family page
    router.push("/admin/dashboard/family/specificfamily");
  };

  return (
    <div className="p-3 font-karma">
      {/* Add Family Button */}
      <div className="flex justify-end w-full">
        <button
          className="w-fit bg-primary text-lg text-white py-2 px-3 rounded-xl text-end"
          onClick={handleAddFamilyModal}
        >
          + Add Family
        </button>
      </div>

      <div className="grid  grid-cols-2 md:grid-cols-4  lg:grid-cols-5">
        {familyData.map((family, index) => (
          <div
            key={index}
            className="bg-[#144F0F1A] text-xl h-32 flex justify-center items-center cursor-pointer rounded-lg shadow-md m-3"
            onClick={() => handleFamilyClick(family)}
          >
            {family}
          </div>
        ))}
      </div>

      {/* Add Family Modal */}
      {addFamilyModal && (
        <div className="fixed bg-[#00000080] h-full w-full top-0 left-0">
          <div className="w-[50%] bg-white rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5">
            <h3 className="text-2xl font-semibold text-primary">Add Family</h3>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="my-7 flex gap-2 items-center">
                <label
                  htmlFor="familyName"
                  className="text-lg text-primary text-nowrap"
                >
                  Family Name :
                </label>
                <div className="w-full">
                  <input
                    id="familyName"
                    className={`h-11 ring-[1px] w-full rounded-lg px-2 text-lg ${
                      errors.familyName ? "ring-red-500" : "ring-primary"
                    }`}
                    placeholder="Enter Family Name"
                    {...register("familyName")} // Bind to useForm
                  />

                  <div className="h-2 w-full">
                    {errors.familyName && (
                      <p className="text-red-500 text-sm">
                        {errors.familyName.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Validation Error */}

              {/* Buttons */}
              <div className="flex justify-end gap-5 font-semibold mt-5">
                <button
                  type="button"
                  className="w-32 text-center ring-1 ring-primary text-lg text-primary py-2 px-3 rounded-xl"
                  onClick={handleAddFamilyModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-32 text-center ring-1 ring-primary bg-primary text-lg text-white py-2 px-3 rounded-xl"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
