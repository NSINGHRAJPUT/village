"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CountUp from "react-countup"; // Import CountUp

export default function DashboardPage() {
  const [data, setData] = useState([
    { label: "Total Cast", value: 0 },
    { label: "Total Family", value: 0 },
    { label: "Total Member", value: 0 },
  ]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/dashboard");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setData(result.data); // Set the fetched data to state
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      toast.error("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Call the fetch function on component mount
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4">
      {data.map((item, index) => (
        <div
          key={index}
          className="bg-[#144F0F1A] text-xl h-32 flex flex-col justify-center items-center rounded-lg shadow-md m-3 relative text-primary font-semibold text-center"
        >
          <p>{item.label}</p>
          <p className="pt-2">
            {/* Use CountUp to animate the number */}
            <CountUp end={item.value} duration={2} />
          </p>
        </div>
      ))}
    </div>
  );
}
