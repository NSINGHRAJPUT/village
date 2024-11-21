"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {Icon }  from "@iconify/react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const styles = {
    base: {
      width: "200px",
      height: "100px",
      backgroundColor: "#f0f0f0",
      transition: "box-shadow 0.3s ease",
    },
    hover: {
      boxShadow: "0px 10px 10px 0px #144F0F26, 0px 4px 4px 0px #00000040",
    },
  };

  return (
    <header className="bg-[#144F0F80]">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="text-4xl font-karma text-[#ffffff] font-bold">LOGO</span>
          
            {/* <span className="sr-only">Your Company</span> */}
            {/* <img
              className="h-8 w-auto"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            /> */}
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <span>            <Icon icon="ic:round-menu" className="text-4xl text-[#ffffff]"/>
            </span>
          </button>
        </div>
        {/*  ${pathname == "/" ? "bg-[#ffffff] text-primary" : ""} */}
        <div className="hidden lg:flex text-[#ffffff]  lg:gap-x-8 lg:justify-end font-karma">
          <Link
            href="/"
            className="text-lg font-medium py-2 px-4 rounded-lg hover:bg-[#ffffff] hover:text-primary
          transition-shadow hover:shadow-[0px_10px_10px_0px_#144F0F26,0px_4px_4px_0px_#00000040]
          "
          >
            Home
          </Link>

          <Link
            href="/family"
            className="text-lg font-medium py-2 px-4 rounded-lg hover:bg-[#ffffff] hover:text-primary
          transition-shadow hover:shadow-[0px_10px_10px_0px_#144F0F26,0px_4px_4px_0px_#00000040] "
          >
            Family
          </Link>

          <Link
            href="/gallery"
            className="text-lg font-medium py-2 px-4 rounded-lg hover:bg-[#ffffff] hover:text-primary
          transition-shadow hover:shadow-[0px_10px_10px_0px_#144F0F26,0px_4px_4px_0px_#00000040] "
          >
            Gallery
          </Link>

          <Link
            href="/about"
            className="text-lg font-medium py-2 px-4 rounded-lg hover:bg-[#ffffff] hover:text-primary
          transition-shadow hover:shadow-[0px_10px_10px_0px_#144F0F26,0px_4px_4px_0px_#00000040] "
          >
            About Us
          </Link>

          <Link
            href="/login"
            className="text-lg font-medium py-2 px-8 rounded-lg bg-[#ffffff] text-primary 
          shadow-[0px_10px_10px_0px_#144F0F26,0px_4px_4px_0px_#00000040] "
          >
            Login
          </Link>
        </div>
      </nav>
      {mobileMenuOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-10"></div>
          <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Features
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Marketplace
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Company
                  </a>
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
