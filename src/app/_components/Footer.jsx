// components/Footer.tsx
"use client";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white py-4 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between rounded-t-2xl space-y-6 md:space-y-0">
      {/* Logo */}
      <div className="text-3xl font-bold">LOGO</div>

      {/* Navigation Links */}
      <div className="flex flex-col text-center space-y-1.5 md:space-y-2 md:text-left">
        <Link href="/" className="hover:text-opacity-80 text-white text-center">
          હોમ
        </Link>
        <Link
          href="/family"
          className="hover:text-opacity-80 text-white text-center"
        >
          {" "}
          પરિવાર{" "}
        </Link>

        <Link
          href="/gallery"
          className="hover:text-opacity-80 text-white text-center"
        >
          ગેલેરી
        </Link>
      </div>

      {/* Contact and Social Icons */}
      <div className="flex flex-col items-center space-y-4">
        <p className="text-lg font-medium">Contact Us</p>
        <div className="flex space-x-4">
          <Link
            href="https://www.instagram.com/kamalpurgam_official"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full border border-white hover:bg-white hover:text-green-800"
          >
            <FaInstagram />
          </Link>

          <Link
            href="https://www.youtube.com/@shreeramvijaykamalpur"
            aria-label="YouTube"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full border border-white hover:bg-white hover:text-green-800"
          >
            <FaYoutube />
          </Link>
          <Link
            href="https://www.facebook.com/share/18UQmkoJc7/?mibextid=qi2Omg"
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full border border-white hover:bg-white hover:text-green-800"
          >
            <FaFacebookF />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
