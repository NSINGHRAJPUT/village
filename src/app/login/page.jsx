"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import img from "../../assets/img.png";

export default function Login() {
  const [mobile, setMobile] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile, age }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        toast.success("Login successful!");
        router.push("/dashboard");
      } else {
        toast.error(data.message || "Failed to log in");
      }
    } catch (error) {
      setLoading(false);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen relative overflow-hidden">
      <Image
        src={img}
        className="absolute z-[-1] top-0 left-0 w-full h-full object-stretch"
        alt="Background"
      />
      <div className="w-[410px] md:w-[660px] h-[480px] flex flex-col items-center rounded-lg bg-black/10 backdrop-blur-md shadow-xl border border-white/30 relative">
        <h1 className="text-2xl font-bold mb-4 pt-4 text-white">Login</h1>
        <form onSubmit={handleSubmit} className="max-w-md w-full m-auto px-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">
              Mobile Number
            </label>
            <input
              type="text"
              name="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="mt-1 p-2 bg-white/20 text-white border-none rounded w-full outline-none placeholder-white"
              pattern="\d*"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">Age</label>
            <input
              type="number"
              name="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="mt-1 p-2 bg-white/20 text-white border-none rounded w-full outline-none placeholder-white"
              required
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 ring-1 ring-white hover:ring-transparent text-white text-xl font-bold tracking-widest hover:bg-gradient-to-r from-[#50bd08] to-blue-800 transition duration-100 ease-in-out relative"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
