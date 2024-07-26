"use client";

import { useState } from "react";

export default function Register() {
  const [familyMembers, setFamilyMembers] = useState([
    { relation: "", name: "", age: "", mobile: "", caste: "", photo: null },
  ]);

  const addFamilyMember = () => {
    setFamilyMembers([
      ...familyMembers,
      { relation: "", name: "", age: "", mobile: "", caste: "", photo: null },
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

    const formData = new FormData();
    familyMembers.forEach((member, index) => {
      formData.append(`members[${index}][relation]`, member.relation);
      formData.append(`members[${index}][name]`, member.name);
      formData.append(`members[${index}][age]`, member.age);
      formData.append(`members[${index}][mobile]`, member.mobile);
      formData.append(`members[${index}][caste]`, member.caste);
      if (member.photo) {
        formData.append(`members[${index}][photo]`, member.photo);
      }
    });

    const response = await fetch("/api/register", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      // Handle success or redirect to another page
    } else {
      // Handle error
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Register Family</h1>
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold mb-2">Family Details</h2>
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
              <label className="block text-sm font-medium">Age</label>
              <input
                type="number"
                name="age"
                value={member.age}
                onChange={(e) => handleChange(index, e)}
                className="mt-1 p-2 border rounded w-full"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium">Mobile (18+)</label>
              <input
                type="text"
                name="mobile"
                value={member.mobile}
                onChange={(e) => handleChange(index, e)}
                className="mt-1 p-2 border rounded w-full"
                pattern="\d*"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium">Caste</label>
              <input
                type="text"
                name="caste"
                value={member.caste}
                onChange={(e) => handleChange(index, e)}
                className="mt-1 p-2 border rounded w-full"
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
  );
}
