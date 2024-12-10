"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [headerName, setHeaderName] = useState("Dashboard");


  const links = [
    { path: "/admin/dashboard", label: "Dashboard" },
    { path: "/admin/dashboard/family", label: "Family" },
  ];

  return (
    <div className="w-full flex gap-5 min-h-screen p-5 relative">
    <Toaster />
      {/* Sidebar */}
      <div className="w-[20%] bg-[#144F0F1A] rounded-2xl py-10 flex flex-col gap-3">
        <div
          className="h-32 w-32 rounded-full bg-[#D9D9D9] flex justify-center items-center mx-auto"
        >
          Logo
        </div>
        
        {links.map((link) => (
          <Link key={link.path} href={link.path}>
            <div
              className={`cursor-pointer w-full rounded-lg text-lg py-2 px-2 ${
                pathname === link.path
                  ? "bg-primary text-white"
                  : "bg-[#D9D9D9] "
              }`}
              onClick={() => setHeaderName(link.label)}
            >
              {link.label}
            </div>
          </Link>
        ))}
      </div>
      {/* Main Content */}
      <div className="w-[80%] space-y-5">
        <div className="bg-[#144F0F1A] h-[10vh] rounded-2xl flex items-center text-2xl font-bold text-primary px-2"> {headerName}</div>
        <div className="bg-[#144F0F1A] h-[81vh] rounded-2xl">{children}</div>
      </div>
    </div>
  );
}
