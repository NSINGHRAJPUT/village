"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [mobile, setMobile] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mobile, age }),
    });

    const data = await response.json();

    if (response.ok) {
      setSuccess("Login successful!");
      router.push("/dashboard");
      // Handle successful login, e.g., redirect or store user info
    } else {
      setError(data.message || "Failed to log in");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Mobile Number</label>
          <input
            type="text"
            name="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            pattern="\d*"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Age</label>
          <input
            type="number"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
        >
          Login
        </button>
      </form>
    </div>
  );
}
