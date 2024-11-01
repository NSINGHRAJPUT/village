// components/Footer.tsx
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white py-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between rounded-t-2xl space-y-6 md:space-y-0">
      {/* Logo */}
      <div className="text-3xl font-bold">LOGO</div>

      {/* Navigation Links */}
      <div className="flex flex-col text-center space-y-2 md:space-y-4 md:text-left">
        <a href="#" className="hover:text-gray-300">Home</a>
        <a href="#" className="hover:text-gray-300">Gallery</a>
        <a href="#" className="hover:text-gray-300">About Us</a>
      </div>

      {/* Contact and Social Icons */}
      <div className="flex flex-col items-center space-y-4">
        <p className="text-lg font-medium">Contact Us</p>
        <div className="flex space-x-4">
          <a href="#" aria-label="Facebook" className="p-2 rounded-full border border-white hover:bg-white hover:text-green-800">
            <FaFacebookF />
          </a>
          <a href="#" aria-label="Instagram" className="p-2 rounded-full border border-white hover:bg-white hover:text-green-800">
            <FaInstagram />
          </a>
          <a href="#" aria-label="YouTube" className="p-2 rounded-full border border-white hover:bg-white hover:text-green-800">
            <FaYoutube />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
