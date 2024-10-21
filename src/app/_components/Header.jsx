"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-transparent shadow-md py-4 px-6">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">
          <Link href="/">MyLogo</Link>
        </div>
        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/login" className="text-gray-600 hover:text-blue-500">
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/family"
                className="text-gray-600 hover:text-blue-500"
              >
                Family
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
