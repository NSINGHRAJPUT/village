"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loading from "@/app/_components/Loading";
import axios from "axios";
import { Icon } from "@iconify/react";

export default function FamilyPage() {
  const router = useRouter();
  const [addFamilyModal, setAddFamilyModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedFamily, setSelectedFamily] = useState(null);
  const [familyData, setFamilyData] = useState([]);
  const [load, setLoad] = useState(true);

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
    setValue,
  } = useForm({
    resolver: yupResolver(schema), // Connect Yup validation
  });

  const fetchCastData = async () => {
    setLoad(true);
    try {
      const response = await fetch("/api/cast");

      if (!response.ok) {
        toast.error("An error occurred. Please try again.");
      }

      const result = await response.json();
      if (result.success) {
        setFamilyData(result.data); // Save fetched data to state
      }
    } catch (error) {
      console.error("Error fetching family data:", error);
    } finally {
      setLoad(false);
    }
  };

  // Form Submission Handler
  const onSubmit = async (data) => {
  
    setLoad(true);
    try {
      if (editMode) {
        // Update existing family

        console.log("data", data);
        
        const response = await fetch("/api/cast", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...data, id: selectedFamily._id }),
        });

        const result = await response.json();

        if (response.ok) {
          toast.success("Family data updated successfully");
          setAddFamilyModal(false);
          setEditMode(false);
          fetchCastData();
        }
      } else {
        // Create new family
        const response = await fetch("/api/cast", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
          reset();
          toast.success("Family data saved successfully");
          setAddFamilyModal(false);
          fetchCastData();
        }
      }
    } catch (error) {
      console.error("Error saving family data:", error);
      toast.error("Operation failed! Please try again.");
    } finally {
      setLoad(false);
    }
  };

  // Delete Family Handler
  const handleDeleteFamily = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this family?");
    if (!confirmDelete) return;

    setLoad(true);
    try {
      const response = await fetch("/api/cast", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Family deleted successfully");
        fetchCastData();
      }
    } catch (error) {
      console.error("Error deleting family data:", error);
      toast.error("Failed to delete family. Please try again.");
    } finally {
      setLoad(false);
    }
  };

  // Toggle Modal
  const handleAddFamilyModal = () => {
    reset();
    setEditMode(false);
    setSelectedFamily(null);
    setAddFamilyModal(!addFamilyModal);
  };

  const handleEditFamily = (family) => {
    setEditMode(true);
    setSelectedFamily(family);
    setValue("familyName", family.name);
    setAddFamilyModal(true);
  };

  useEffect(() => {
    fetchCastData();
  }, []);

  const handleFamilyClick = (family) => {
    router.push(`/admin/dashboard/family/specificfamily?castid=${family?._id}`);
  };

  return (
    <div className="p-3 font-karma">
      {load && <Loading />}
      {/* Add Family Button */}
      <div className="flex justify-end w-full">
        <button
          className="w-fit bg-primary text-lg text-white py-2 px-3 rounded-xl text-end"
          onClick={handleAddFamilyModal}
        >
          + Add Family
        </button>
      </div>

      {!load &&
        (familyData?.length > 0 ? (
          <div className="grid  grid-cols-2 md:grid-cols-4  lg:grid-cols-5">
            {familyData?.map((family, index) => (
              <div
                key={index}
                className="bg-[#144F0F1A] text-xl h-32 flex justify-center items-center cursor-pointer rounded-lg shadow-md m-3 relative"
              >
                <div onClick={() => handleFamilyClick(family)}>{family.name}</div>
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <button
                    onClick={() => handleEditFamily(family)}
                    className="text-primary"
                  >
                    <Icon icon="ic:baseline-edit" className="text-lg" />
                  </button>
                  <button
                    onClick={() => handleDeleteFamily(family._id)}
                    className="text-red-500"
                  >
                    <Icon icon="ic:baseline-delete" className="text-lg" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <p className="font-karma text-2xl text-primary text-center">
            No families found.
          </p>
        ))}

      {/* Add/Edit Family Modal */}
      {addFamilyModal && (
        <div className="fixed bg-[#00000080] h-full w-full top-0 left-0">
          <div className="w-[50%] bg-white rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5">
            <h3 className="text-2xl font-semibold text-primary">
              {editMode ? "Edit Family" : "Add Family"}
            </h3>

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
                    {...register("familyName")}
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
                  {editMode ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
