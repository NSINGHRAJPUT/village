"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "./../../assets/logo.png";
export default function Header() {
  const navbarRef = useRef(null); // For the mobile menu container
  const mobileMenuButtonRef = useRef(null); // For the mobile menu toggle button

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleDropdown = () => {
    setMobileMenuOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside the menu or the toggle button
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target) &&
        mobileMenuButtonRef.current &&
        !mobileMenuButtonRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-[#144F0F80]">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5">
            <Image
              src={logo} // Path to the image
              alt="logo"
              className="h-10 w-56"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            ref={mobileMenuButtonRef} // Assign ref to the button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={toggleDropdown}
          >
            <span className="sr-only">Open main menu</span>
            <Icon
              icon={`${mobileMenuOpen ? "line-md:close" : "ic:round-menu"}`}
              className={`text-4xl text-[#ffffff] transition-transform duration-300 ${
                mobileMenuOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        </div>
        <div className="hidden lg:flex text-[#ffffff] lg:gap-x-8 lg:justify-end font-karma">
          <Link
            href="/"
            className="text-lg font-medium py-2 px-4 rounded-lg hover:bg-[#ffffff] hover:text-primary transition-shadow hover:shadow-[0px_10px_10px_0px_#144F0F26,0px_4px_4px_0px_#00000040]"
          >
            હોમ
          </Link>
          <Link
            href="/family"
            className="text-lg font-medium py-2 px-4 rounded-lg hover:bg-[#ffffff] hover:text-primary transition-shadow hover:shadow-[0px_10px_10px_0px_#144F0F26,0px_4px_4px_0px_#00000040]"
          >
            પરિવાર
          </Link>

          <Link
            href="/gallery"
            className="text-lg font-medium py-2 px-4 rounded-lg hover:bg-[#ffffff] hover:text-primary transition-shadow hover:shadow-[0px_10px_10px_0px_#144F0F26,0px_4px_4px_0px_#00000040]"
          >
            ગેલેરી
          </Link>
        </div>
      </nav>

      {/* Mobile Menu for Small Screens */}
      {mobileMenuOpen && (
        <div
          ref={navbarRef}
          className="lg:hidden bg-white/95 text-primary p-6 flex flex-col items-center"
        >
          <style>{`body { overflow: hidden; }`}</style>
          <Link
            href="/"
            className="text-lg font-medium py-2 px-4 rounded-lg hover:bg-[#ffffff] hover:text-primary transition-shadow hover:shadow-[0px_10px_10px_0px_#144F0F26,0px_4px_4px_0px_#00000040]"
            onClick={() => setMobileMenuOpen(false)}
          >
            હોમ
          </Link>

          <Link
            href="/family"
            className="text-lg font-medium py-2 px-4 rounded-lg hover:bg-[#ffffff] hover:text-primary transition-shadow hover:shadow-[0px_10px_10px_0px_#144F0F26,0px_4px_4px_0px_#00000040]"
            onClick={() => setMobileMenuOpen(false)}
          >
            પરિવાર
          </Link>

          <Link
            href="/gallery"
            className="text-lg font-medium py-2 px-4 rounded-lg hover:bg-[#ffffff] hover:text-primary transition-shadow hover:shadow-[0px_10px_10px_0px_#144F0F26,0px_4px_4px_0px_#00000040]"
            onClick={() => setMobileMenuOpen(false)}
          >
            ગેલેરી
          </Link>
        </div>
      )}
    </header>
  );
}
