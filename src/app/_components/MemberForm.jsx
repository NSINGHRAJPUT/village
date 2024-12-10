import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";

function MemberForm({
  handleModal,
  mainPerson = false,
  casteId = null,
  setLoad,
  familyId = null,
  data = null,
  editForm = false,
  featchData
}) {
  const schema = yup.object().shape({
    name: yup.string().required("નામ જરૂરી છે"),
    dob: yup.string().required("જન્મતારીખ જરૂરી છે"),
    mobile: yup.string().required("મોબાઈલ નંબર જરૂરી છે"),
    relationToMainPerson: yup.string().required("વ્યક્તિ સાથે સબંધ જરૂરી છે"),
    isMarried: yup.boolean().required("પરણિત/અપરણિત સિલેક્ટ કરવું જરૂરી છે"),
    maternalSurname: yup.string().required("મોશાળ શાખ જરૂરી છે"),
    education: yup.string().required("અભ્યાસ જરૂરી છે"),
    occupationAddress: yup.string().required("વ્યવસાય સરનામું જરૂરી છે "),
    residentAddress: yup.string().required("રહેણાક સરનામું જરૂરી છે"),
    bloodGroup: yup.string().required("બ્લડ ગ્રુપ સિલેક્ટ કરવું જરૂરી છે"),
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

  useEffect(() => {
    if (editForm) {
      // console.log("Data:", data);
      setValue("name", data.name);
      setValue("dob", data.dob.split("T")[0]);
      setValue("mobile", data.mobile);
      setValue("relationToMainPerson", data.relationToMainPerson);
      setValue("isMarried", data.isMarried);
      setValue("maternalSurname", data.maternalSurname);
      setValue("education", data.education);
      setValue("occupationAddress", data.occupationAddress);
      setValue("residentAddress", data.residentAddress);
      setValue("bloodGroup", data.bloodGroup);
      setValue("id" , data._id);
    }
  });

  const onSubmit = async (data) => {
    
    setLoad(true);
    // console.log("Form Data:", data);
    data.isMainPerson = mainPerson;
    if (!mainPerson) {
      data.familyId = familyId;
    }
    data.casteId = casteId;

    try {
      const response = await fetch("/api/familyMember", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      // console.log("Response:", result);

      if (response.ok) {
        reset();
        toast.success("Main Member data saved successfully");
        handleModal();
        featchData();  
      }
      
    } catch (error) {
      console.error("Error Create Family data:", error);
      toast.error("Main Member Not Create! Please try again.");
    } finally {
      setLoad(false);
    }
  };

  const onEdit = async (data) => {
    setLoad(true);
    // console.log("Form Data:", data);

    try {
      const response = await fetch(`/api/familyMember`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      // console.log("Response:", result);

      if (response.ok) {
        reset();
        toast.success("Member data updated successfully");
        handleModal();  
        featchData();  
      }
    } catch (error) {
      console.error("Error Edit Member data:", error);
      toast.error("Member Not Updated! Please try again.");
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className="fixed bg-[#00000080] h-full w-full top-0 left-0">
      <div className="w-[50%] bg-white rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        <div className="p-5 h-[680px] overflow-y-auto">
          <div className="flex justify-between">
            <div className="text-2xl font-semibold text-primary">
              Add Member
            </div>
            <Icon
              icon="carbon:close-filled"
              className="text-3xl text-primary cursor-pointer"
              onClick={handleModal}
            />
          </div>

          <form
            onSubmit={handleSubmit(editForm ? onEdit : onSubmit)}
            className="space-y-4 my-7"
          >
            {/* Name Field */}
            <div className="flex flex-col gap-2  mb-3">
              <label
                htmlFor="name"
                className="text-lg text-primary text-nowrap"
              >
                નામ :
              </label>
              <div className="w-full">
                <input
                  id="name"
                  className={`h-11 ring-[1px] w-full rounded-lg px-2 text-lg ${
                    errors.name ? "ring-red-500" : "ring-primary"
                  }`}
                  placeholder="ટાઈપ કરો નામ (શાખ  +વ્યક્તિ નું નામ + પિતાનું નામ)"
                  {...register("name")}
                />
                <div className="h-2 w-full">
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Date of Birth Field */}
            <div className="flex flex-col gap-2  mb-3">
              <label htmlFor="dob" className="text-lg text-primary text-nowrap">
                જન્મતારીખ :
              </label>
              <div className="w-full">
                <input
                  id="dob"
                  type="date"
                  className={`h-11 ring-[1px] w-full rounded-lg px-2 text-lg ${
                    errors.dob ? "ring-red-500" : "ring-primary"
                  }`}
                  {...register("dob")}
                />
                <div className="h-2 w-full">
                  {errors.dob && (
                    <p className="text-red-500 text-sm">{errors.dob.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Field */}
            <div className="flex flex-col gap-2  mb-3">
              <label
                htmlFor="mobile"
                className="text-lg text-primary text-nowrap"
              >
                મોબાઈલ નંબર :
              </label>
              <div className="w-full">
                <input
                  id="mobile"
                  type="tel"
                  className={`h-11 ring-[1px] w-full rounded-lg px-2 text-lg ${
                    errors.mobile ? "ring-red-500" : "ring-primary"
                  }`}
                  placeholder="ટાઈપ કરો મોબાઈલ નંબર"
                  maxLength="10"
                  {...register("mobile")}
                />
                <div className="h-2 w-full">
                  {errors.mobile && (
                    <p className="text-red-500 text-sm">
                      {errors.mobile.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Relation Field */}
            <div className="flex flex-col gap-2  mb-3">
              <label
                htmlFor="relationToMainPerson"
                className="text-lg text-primary text-nowrap"
              >
                સભ્ય સાથે સબંધ :
              </label>
              <div className="w-full">
                <input
                  id="relationToMainPerson"
                  className={`h-11 ring-[1px] w-full rounded-lg px-2 text-lg ${
                    errors.relationToMainPerson
                      ? "ring-red-500"
                      : "ring-primary"
                  }`}
                  placeholder="ટાઈપ કરો સભ્ય સાથે સબંધ"
                  {...register("relationToMainPerson")}
                />
                <div className="h-2 w-full">
                  {errors.relationToMainPerson && (
                    <p className="text-red-500 text-sm">
                      {errors.relationToMainPerson.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Married Field */}
            <div className="flex flex-col gap-2  mb-3">
              <label
                htmlFor="isMarried"
                className="text-lg text-primary text-nowrap"
              >
                પરણિત:
              </label>
              <div className="w-full">
                <select
                  id="isMarried"
                  className={`h-11 ring-[1px] w-full rounded-lg px-2 text-lg ${
                    errors.isMarried ? "ring-red-500" : "ring-primary"
                  }`}
                  defaultValue=""
                  {...register("isMarried")}
                >
                  <option value="" disabled selected>
                    {" "}
                    સિલેક્ટ કરો{" "}
                  </option>
                  <option value="true">હા </option>
                  <option value="false">ના </option>
                </select>
                <div className="h-2 w-full">
                  {errors.isMarried && (
                    <p className="text-red-500 text-sm">
                      {errors.isMarried.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Maternal Surname Field */}
            <div className="flex flex-col gap-2  mb-3">
              <label
                htmlFor="maternalSurname"
                className="text-lg text-primary text-nowrap"
              >
                મોશાળ શાખ :
              </label>
              <div className="w-full">
                <input
                  id="maternalSurname"
                  className={`h-11 ring-[1px] w-full rounded-lg px-2 text-lg ${
                    errors.maternalSurname ? "ring-red-500" : "ring-primary"
                  }`}
                  placeholder="ટાઈપ કરો મોશાળ શાખ"
                  {...register("maternalSurname")}
                />
                <div className="h-2 w-full">
                  {errors.maternalSurname && (
                    <p className="text-red-500 text-sm">
                      {errors.maternalSurname.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Education Field */}
            <div className="flex flex-col gap-2  mb-3">
              <label
                htmlFor="education"
                className="text-lg text-primary text-nowrap"
              >
                અભ્યાસ :
              </label>
              <div className="w-full">
                <input
                  id="education"
                  className={`h-11 ring-[1px] w-full rounded-lg px-2 text-lg ${
                    errors.education ? "ring-red-500" : "ring-primary"
                  }`}
                  placeholder="ટાઈપ કરો અભ્યાસ"
                  {...register("education")}
                />
                <div className="h-2 w-full">
                  {errors.education && (
                    <p className="text-red-500 text-sm">
                      {errors.education.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Occupation Address Field */}
            <div className="flex flex-col gap-2  mb-3">
              <label
                htmlFor="occupationAddress"
                className="text-lg text-primary text-nowrap"
              >
                વ્યવસાય નું સરનામું :
              </label>
              <div className="w-full">
                <input
                  id="occupationAddress"
                  className={`h-11 ring-[1px] w-full rounded-lg px-2 text-lg ${
                    errors.occupationAddress ? "ring-red-500" : "ring-primary"
                  }`}
                  placeholder="ટાઈપ કરો વ્યવસાય નું સરનામું"
                  {...register("occupationAddress")}
                />
                <div className="h-2 w-full">
                  {errors.occupationAddress && (
                    <p className="text-red-500 text-sm">
                      {errors.occupationAddress.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Resident Address Field */}
            <div className="flex flex-col gap-2  mb-3">
              <label
                htmlFor="residentAddress"
                className="text-lg text-primary text-nowrap"
              >
                રહેણાક નું સરનામું :
              </label>
              <div className="w-full">
                <input
                  id="residentAddress"
                  className={`h-11 ring-[1px] w-full rounded-lg px-2 text-lg ${
                    errors.residentAddress ? "ring-red-500" : "ring-primary"
                  }`}
                  placeholder="ટાઈપ કરો રહેણાક નું સરનામું"
                  {...register("residentAddress")}
                />
                <div className="h-2 w-full">
                  {errors.residentAddress && (
                    <p className="text-red-500 text-sm">
                      {errors.residentAddress.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Blood Group Field */}
            <div className="flex flex-col gap-2 mb-3">
              <label
                htmlFor="bloodGroup"
                className="text-lg text-primary text-nowrap"
              >
                બ્લડ ગ્રુપ :
              </label>
              <div className="w-full">
                <select
                  id="bloodGroup"
                  className={`h-11 ring-[1px] w-full rounded-lg px-2 text-lg ${
                    errors.bloodGroup ? "ring-red-500" : "ring-primary"
                  }`}
                  {...register("bloodGroup")}
                  defaultValue = ""
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A positive (A+)</option>
                  <option value="A-">A negative (A-)</option>
                  <option value="B+">B positive (B+)</option>
                  <option value="B-">B negative (B-)</option>
                  <option value="O+">O positive (O+)</option>
                  <option value="O-">O negative (O-)</option>
                  <option value="AB+">AB positive (AB+)</option>
                  <option value="AB-">AB negative (AB-)</option>
                  <option value="AB-">AB negative (AB-)</option>
                  <option value="No">Nothing</option>
                </select>
                <div className="h-2 w-full">
                  {errors.bloodGroup && (
                    <p className="text-red-500 text-sm">
                      {errors.bloodGroup.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 px-3 rounded-xl"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MemberForm;
