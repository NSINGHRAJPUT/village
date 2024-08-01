// components/Hero.js
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Fallback image */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: "url(../../assets/img.png)" }}
      >
        {/* Overlay to darken the image/video */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      </div>

      <div className="absolute z-50  top-[2%] right-[1%] w-fit ">
        <Link
          href={"/login"}
          className="px-6 py-2.5 ring-1 ring-white hover:ring-transparent  text-black text-xl font-bold tracking-widest hover:bg-gradient-to-r from-[#50bd08] to-blue-800 transition duration-100 ease-in-out "
        >
          LOGIN
        </Link>
      </div>

      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/vid.MP4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white mb-4">
          Your Hero Heading
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-white max-w-2xl">
          Your description goes here. It should be concise and engaging, giving
          a brief introduction or call to action.
        </p>
      </div>
    </div>
  );
};

export default Hero;
