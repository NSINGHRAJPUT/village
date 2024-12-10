"use client";

import { useState, useEffect } from "react";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import village from '../../assets/village.png'
import Image from "next/image";

export default function Register() {
  const [caste, setCaste] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [familyMembers, setFamilyMembers] = useState([
    { relation: "", name: "", dob: "", mobile: "", photo: null },
  ]);
  const [error, setError] = useState("");
  const [availableCastes, setAvailableCastes] = useState([{id:1, name : "Rajput"}]);

  // Fetch available castes on component mount (this assumes an API endpoint for castes)
  useEffect(() => {
    // async function fetchCastes() {
    //   const response = await fetch("/api/castes");
    //   const castes = await response.json();
    //   setAvailableCastes(castes);
    // }
    // fetchCastes();
  }, []);

  const addFamilyMember = () => {
    setFamilyMembers([
      ...familyMembers,
      { relation: "", name: "", dob: "", mobile: "", photo: null },
    ]);
  };

  const removeFamilyMember = (index) => {
    const newFamilyMembers = [...familyMembers];
    newFamilyMembers.splice(index, 1);
    setFamilyMembers(newFamilyMembers);
  };

  const handleChange = (index, event) => {
    const { name, value, files } = event.target;
    const newFamilyMembers = [...familyMembers];
    if (name === "photo") {
      newFamilyMembers[index][name] = files[0];
    } else {
      newFamilyMembers[index][name] = value;
    }
    setFamilyMembers(newFamilyMembers);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation checks
    if (!caste) {
      setError("Please select a caste.");
      return;
    }
    if (!familyName) {
      setError("Please provide a family name.");
      return;
    }
    if (!familyMembers.some((member) => member.relation.toLowerCase() === "grandfather" || member.relation.toLowerCase() === "head")) {
      setError("Please add a main family member (e.g., Grandfather or Head of Family).");
      return;
    }
    if (familyMembers.some((member) => member.mobile.length !== 10)) {
      setError("Each mobile number must be 10 digits.");
      return;
    }

    const formData = new FormData();
    formData.append("caste", caste);
    formData.append("familyName", familyName);
    familyMembers.forEach((member, index) => {
      formData.append(`members[${index}][relation]`, member.relation);
      formData.append(`members[${index}][name]`, member.name);
      formData.append(`members[${index}][dob]`, member.dob);
      formData.append(`members[${index}][mobile]`, member.mobile);
      if (member.photo) {
        formData.append(`members[${index}][photo]`, member.photo);
      }
    });
    console.log("formData", formData)

    const response = await fetch("/api/register", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      // Reset form and clear errors
      setFamilyMembers([{ relation: "", name: "", dob: "", mobile: "", photo: null }]);
      setCaste("");
      setFamilyName("");
      setError("");
      // Handle success or redirect to another page
    } else {
      const errorData = await response.json();
      setError(errorData.message || "Failed to submit form.");
    }
  };

  return (
    <div className="relative">
      <Header/>
      <div className="absolute z-50 top-[0%] left-[0%] w-full text-white">
        <Header />
      </div>
      <div className="relative text-white py-16 px-4 text-center min-h-[90vh] pt-[15vh]">
        <Image
          src={village}
          alt="Village Background"
          layout="fill"
          objectFit="cover"
          className="z-[-1]" // To make sure it sits behind other content
        />
         <div className="absolute z-10 top-0 left-0 w-full h-full bg-green-300 opacity-50 text-white"></div>
        <h1 className="text-4xl relative z-20 mt-16 font-bold mb-4">Register Your Family</h1>
        <p className="text-xl relative z-20 mb-8">Search for family members by caste</p>
        
      </div>

      <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Register Family</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold mb-2">Family Details</h2>
        
        {/* Caste Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Caste</label>
          <select
            value={caste}
            onChange={(e) => setCaste(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          >
            <option value="">Select Caste</option>
            {availableCastes.map((casteOption) => (
              <option key={casteOption._id} value={casteOption.name}>
                {casteOption.name}
              </option>
            ))}
          </select>
        </div>

        {/* Family Name Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Family Name</label>
          <input
            type="text"
            value={familyName}
            onChange={(e) => setFamilyName(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>

        {/* Family Members */}
        {familyMembers.map((member, index) => (
          <div key={index} className="mb-4 p-4 border rounded-lg">
            <div className="mb-2">
              <label className="block text-sm font-medium">Relation</label>
              <input
                type="text"
                name="relation"
                value={member.relation}
                onChange={(e) => handleChange(index, e)}
                className="mt-1 p-2 border rounded w-full"
                placeholder="e.g., Grandfather, Father, Child"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={member.name}
                onChange={(e) => handleChange(index, e)}
                className="mt-1 p-2 border rounded w-full"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={member.dob}
                onChange={(e) => handleChange(index, e)}
                className="mt-1 p-2 border rounded w-full"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium">Mobile (10 digits)</label>
              <input
                type="text"
                name="mobile"
                value={member.mobile}
                onChange={(e) => handleChange(index, e)}
                className="mt-1 p-2 border rounded w-full"
                pattern="\d{10}"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium">Photo</label>
              <input
                type="file"
                name="photo"
                onChange={(e) => handleChange(index, e)}
                className="mt-1 p-2 border rounded w-full"
                accept="image/*"
              />
            </div>
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeFamilyMember(index)}
                className="bg-red-500 text-white py-2 px-4 rounded mt-2"
              >
                Remove Member
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addFamilyMember}
          className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
        >
          Add Family Member
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded mt-4 ml-4"
        >
          Submit
        </button>
      </form>
    </div>
      <Footer/>
    </div>
  );
}
