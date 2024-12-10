"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import img from "../../assets/img.png";
import Loading from "../_components/Loading";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        toast.success("Login successful!");
        router.push("/admin/dashboard");
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
      {loading && <Loading />}
      <Image
        src={img}
        className="absolute z-[-1] top-0 left-0 w-full h-full object-cover opacity-90"
        alt="Background"
      />
      <div className="w-[90%] md:w-[50%] lg:w-[40%] xl:w-[30%] flex flex-col items-center rounded-lg bg-black/90 backdrop-blur-lg shadow-2xl border border-gray-600 relative p-6">
        <h1 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#50bd08] to-blue-800">
          Welcome Back
        </h1>
        <p className="text-sm text-gray-400 mb-6 text-center">
          Enter your credentials to access your account
        </p>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full px-4 py-3 text-gray-200 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#50bd08] focus:outline-none placeholder-gray-400"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full px-4 py-3 text-gray-200 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#50bd08] focus:outline-none placeholder-gray-400"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-[#50bd08] to-blue-800 text-white font-semibold text-lg rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-150 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {/* <p className="mt-6 text-sm text-gray-400">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-[#50bd08] hover:underline transition"
          >
            Sign up
          </a>
        </p> */}
      </div>
    </div>
  );
}
