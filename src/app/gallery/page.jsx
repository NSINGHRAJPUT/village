"use client";
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

      <div className="flex flex-col md:flex-row mx-auto w-[90%] md:w-[80%] lg:w-[70%] my-10 gap-10">
        {/* Single Image */}
        <div className="w-full">
          <Image
            src={kamalapur} // Path to the combined image
            alt="About Us Image"
            className="w-full rounded-lg h-[500px] object-cover"
            height={400} // Adjust height as needed
          />
        </div>

        <div className="w-full">
          <Image
            src={img8} // Path to the combined image
            alt="About Us Image"
            className="w-full rounded-lg h-[500px] object-cover"
            height={400} // Adjust height as needed
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row mx-auto w-[90%] md:w-[80%] lg:w-[70%] my-10 gap-10">
        {/* Single Image */}
        <div className="w-full relative h-[500px]">
          <Image
            src={img1} // Path to the combined image
            alt="About Us Image"
            className="w-full rounded-lg h-full object-cover"
            height={400} // Adjust height as needed
          />
          <div className="absolute bg-primary bottom-5 text-white text-2xl py-2 px-2 w-[90%] left-1/2 transform -translate-x-1/2 text-center ring-[1px] ring-white rounded-lg font-semibold">
            પ્રાથમિક શાળા
          </div>
        </div>
        <div className="w-full relative h-[500px]">
          <Image
            src={img2} // Path to the combined image
            alt="About Us Image"
            className="w-full rounded-lg h-full object-cover"
            height={400} // Adjust height as needed
          />
          <div className="absolute bg-primary bottom-5 text-white text-2xl py-2 px-2 w-[90%] left-1/2 transform -translate-x-1/2 text-center ring-[1px] ring-white rounded-lg font-semibold">
            હાઇસ્કૂલ
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row mx-auto w-[90%] md:w-[80%] lg:w-[70%] my-10 gap-10">
        {/* Single Image */}
        <div className="w-full relative h-[500px]">
          <Image
            src={ramjiTemple} // Path to the combined image
            alt="About Us Image"
            className="w-full rounded-lg h-full object-cover"
            height={400} // Adjust height as needed
          />
          <div className="absolute bg-primary bottom-5 text-white text-2xl py-2 px-2 w-[90%] left-1/2 transform -translate-x-1/2 text-center ring-[1px] ring-white rounded-lg font-semibold">
            રામજી મંદિર
          </div>
        </div>
        <div className="w-full relative h-[500px]">
          <Image
            src={img5} // Path to the combined image
            alt="About Us Image"
            className="w-full rounded-lg h-full object-cover"
            height={400} // Adjust height as needed
          />
          <div className="absolute bg-primary bottom-5 text-white text-2xl py-2 px-2 w-[90%] left-1/2 transform -translate-x-1/2 text-center ring-[1px] ring-white rounded-lg font-semibold">
            શિવાલય
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row mx-auto w-[90%] md:w-[80%] lg:w-[70%] my-10 gap-10">
        {/* Single Image */}
        <div className="w-full relative h-[500px]">
          <Image
            src={img4} // Path to the combined image
            alt="About Us Image"
            className="w-full rounded-lg h-full object-cover"
            height={400} // Adjust height as needed
          />
          <div className="absolute bg-primary bottom-5 text-white text-2xl py-2 px-2 w-[90%] left-1/2 transform -translate-x-1/2 text-center ring-[1px] ring-white rounded-lg font-semibold">
            શક્તિમાં નું મંદિર
          </div>
        </div>
        <div className="w-full relative h-[500px]">
          <Image
            src={img3} // Path to the combined image
            alt="About Us Image"
            className="w-full rounded-lg h-full object-cover"
            height={400} // Adjust height as needed
          />
          <div className="absolute bg-primary bottom-5 text-white text-2xl py-2 px-2 w-[90%] left-1/2 transform -translate-x-1/2 text-center ring-[1px] ring-white rounded-lg font-semibold">
            સરદાર વડ
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row mx-auto w-[90%] md:w-[80%] lg:w-[70%] my-10 gap-10">
        {/* Single Image */}
        <div className="w-full relative h-[500px]">
          <Image
            src={img7} // Path to the combined image
            alt="About Us Image"
            className="w-full rounded-lg h-full object-cover"
            height={400} // Adjust height as needed
          />
        </div>
        <div className="w-full relative h-[500px]">
          <Image
            src={img6} // Path to the combined image
            alt="About Us Image"
            className="w-full rounded-lg h-full object-cover"
            height={400} // Adjust height as needed
          />
        </div>
      </div>

      <div className="h-[500px] flex flex-col  mx-auto w-[90%] md:w-[80%] lg:w-[70%] my-10 gap-10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28209.473264373555!2d71.85873031560565!3d23.11447871297433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39595607a3679509%3A0xe4b0a4d8ad7bb1c6!2sKamalpur%2C%20Gujarat!5e1!3m2!1sen!2sin!4v1733826392376!5m2!1sen!2sin"
          height="450"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          className="w-full rounded-lg"
        ></iframe>
        
      </div>

      <Footer />
    </div>
  );
}
