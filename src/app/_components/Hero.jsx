"use client";
import Link from "next/link";
import React from "react";
import Header from "./Header";
import { motion } from "framer-motion";
const Hero = () => {
  const textAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const subtitleAnimation = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, delay: 0.3, ease: "easeOut" } },
  };
  
    return (
      <div className="relative w-full h-screen overflow-hidden">
        {/* Fallback image */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: "url(/img.png)" }}
        >
          {/* Overlay to darken the image/video */}
        </div>
  
        <div className="absolute z-10 top-0 left-0 w-full h-full bg-[#144F0F80] text-white"></div>
       
        <div className="absolute z-50 top-[0%] left-[0%] w-full">
          <Header />
        </div>
  
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source
            src="https://res.cloudinary.com/dtztxlz65/video/upload/v1722584351/bmj9adurjauwguwwav2r.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
  
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center font-karma h-full px-4 text-center md:mt-48">
          {/* Main Title */}
          <motion.h1
            className="text-6xl md:text-6xl lg:text-8xl font-bold font-karma text-white mb-4"
            initial="hidden"
            whileInView="visible"
            variants={textAnimation}
            viewport={{ once: true }}
          >
            કમાલપુર
          </motion.h1>
  
          {/* Subtitle */}
          <motion.p
            className="text-lg lg:text-2xl text-white max-w-2xl"
            initial="hidden"
            whileInView="visible"
            variants={subtitleAnimation}
            viewport={{ once: true }}
          >
            કમાલપુર એ ગામ છે, જ્યાં રામલીલાની જ્યોતિ પ્રત્યેક હૃદયમાં બળે છે.
          </motion.p>
        </div>
      </div>
  );
};

export default Hero;
