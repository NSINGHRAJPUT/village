"use client";
import { motion } from "framer-motion";
import Hero from "./../_components/Hero";
import { Toaster } from "react-hot-toast";
import About from "./../_components/About";
import Footer from "./../_components/Footer";
import Header from "./../_components/Header";
import familyPage from "./../../assets/familyPage.jpg";
import Image from "next/image";
import kamalapur from "./../../assets/kamalapur.jpg";
import ramjiTemple from "./../../assets/ramajiTemple.jpg";
import img1 from "./../../assets/1.jpg";
import img2 from "./../../assets/2.jpg";
import img3 from "./../../assets/3.jpg";
import img4 from "./../../assets/4.jpg";
import img5 from "./../../assets/5.jpg";
import img6 from "./../../assets/6.jpg";
import img7 from "./../../assets/7.jpg";
import img8 from "./../../assets/8.jpg";

export default function Home() {
  // Define animation variants for different elements
  const imageAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const textAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.5, ease: "easeOut" },
    },
  };

  const subtitleAnimation = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, delay: 0.3, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen relative">
      <div className="absolute z-50 top-[0%] left-[0%] w-full text-white">
        <Header />
      </div>

      <div className="relative text-white py-16 px-4 text-center min-h-[90vh] pt-[15vh]">
        <Image
          src={ramjiTemple}
          alt="Village Background"
          layout="fill"
          objectFit="cover"
          className="z-[-1]" // To make sure it sits behind other content
        />

        <div className="absolute z-10 top-0 left-0 w-full h-full bg-[#144F0F80] text-white"></div>

        <h1 className="text-2xl md:text-4xl z-20 font-karma font-bold absolute bottom-24 left-1/2 transform -translate-x-1/2 w-full">
          <div className="bg-primary m-3 p-4 rounded-lg ring-[1px] ring-white">
            ગેલેરી
          </div>
        </h1>
      </div>

      {/* Gallery Section */}
      <div className="flex flex-col md:flex-row mx-auto w-[90%] md:w-[80%] lg:w-[70%] my-10 gap-10">
        <motion.div
          className="w-full"
          initial="hidden"
          whileInView="visible"
          variants={imageAnimation}
          viewport={{ once: true }}
        >
          <Image
            src={kamalapur}
            alt="About Us Image"
            className="w-full rounded-lg h-[500px] object-cover"
            height={400}
          />
        </motion.div>

        <motion.div
          className="w-full"
          initial="hidden"
          whileInView="visible"
          variants={imageAnimation}
          viewport={{ once: true }}
        >
          <Image
            src={img8}
            alt="About Us Image"
            className="w-full rounded-lg h-[500px] object-cover"
            height={400}
          />
        </motion.div>
      </div>

      <div className="flex flex-col md:flex-row mx-auto w-[90%] md:w-[80%] lg:w-[70%] my-10 gap-10">
        {/* Single Image with text */}
        <motion.div
          className="w-full relative h-[500px]"
          initial="hidden"
          whileInView="visible"
          variants={imageAnimation}
          viewport={{ once: true }}
        >
          <Image
            src={img1}
            alt="About Us Image"
            className="w-full rounded-lg h-full object-cover"
            height={400}
          />
          <div className="absolute bg-primary bottom-5 text-white text-2xl py-2 px-2 w-[90%] left-1/2 transform -translate-x-1/2 text-center ring-[1px] ring-white rounded-lg font-semibold">
            પ્રાથમિક શાળા
          </div>
        </motion.div>

        <motion.div
          className="w-full relative h-[500px]"
          initial="hidden"
          whileInView="visible"
          variants={imageAnimation}
          viewport={{ once: true }}
        >
          <Image
            src={img2}
            alt="About Us Image"
            className="w-full rounded-lg h-full object-cover"
            height={400}
          />
          <div className="absolute bg-primary bottom-5 text-white text-2xl py-2 px-2 w-[90%] left-1/2 transform -translate-x-1/2 text-center ring-[1px] ring-white rounded-lg font-semibold">
            હાઇસ્કૂલ
          </div>
        </motion.div>
      </div>

      {/* Other Sections */}
      <div className="flex flex-col md:flex-row mx-auto w-[90%] md:w-[80%] lg:w-[70%] my-10 gap-10">
        <motion.div
          className="w-full relative h-[500px]"
          initial="hidden"
          whileInView="visible"
          variants={imageAnimation}
          viewport={{ once: true }}
        >
          <Image
            src={ramjiTemple}
            alt="About Us Image"
            className="w-full rounded-lg h-full object-cover"
            height={400}
          />
          <div className="absolute bg-primary bottom-5 text-white text-2xl py-2 px-2 w-[90%] left-1/2 transform -translate-x-1/2 text-center ring-[1px] ring-white rounded-lg font-semibold">
            રામજી મંદિર
          </div>
        </motion.div>

        <motion.div
          className="w-full relative h-[500px]"
          initial="hidden"
          whileInView="visible"
          variants={imageAnimation}
          viewport={{ once: true }}
        >
          <Image
            src={img5}
            alt="About Us Image"
            className="w-full rounded-lg h-full object-cover"
            height={400}
          />
          <div className="absolute bg-primary bottom-5 text-white text-2xl py-2 px-2 w-[90%] left-1/2 transform -translate-x-1/2 text-center ring-[1px] ring-white rounded-lg font-semibold">
            શિવાલય
          </div>
        </motion.div>
      </div>

      {/* Embed Google Map */}
      <div className="h-[500px] flex flex-col mx-auto w-[90%] md:w-[80%] lg:w-[70%] my-10 gap-10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28209.473264373555!2d71.85873031560565!3d23.11447871297433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39595607a3679509%3A0xe4b0a4d8ad7bb1c6!2sKamalpur%2C%20Gujarat!5e1!3m2!1sen!2sin!4v1733826392376!5m2!1sen!2sin"
          height="450"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full rounded-lg"
        ></iframe>
      </div>

      <Footer />
    </div>
  );
}
