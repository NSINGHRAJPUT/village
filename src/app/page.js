"use client";

import { motion } from "framer-motion";
import Hero from "./_components/Hero";
import { Toaster } from "react-hot-toast";
import About from "./_components/About";
import Footer from "./_components/Footer";
import familyPage from "./../assets/familyPage.jpg";
import Image from "next/image";
import Head from "next/head";

import temple from "./../assets/temple.png";

export default function Home() {
  const textAnimation = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const imageAnimation = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
  };

  // Video animation for fading in
  const videoAnimation = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
  };

  const mapAnimation = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
  };

  return (
    <>
      <Head>
        <title>Kamlapur Patel Parivar Ahmedabad </title>
        <meta name="description" content="Kamalpur Patel Parivar Ahmedabad" />
        <meta
          name="keywords"
          content="Kamalpur, Kamalpur Patel Parivar, Kamalpur Ahmedabad, Kamalpur Ramalila, Kamalpur Ahmedabad, Kamalpur Ramayan, Ramayan, Ramalila, Kamalpur Patel Parivar, Kamalpur Patidar Samaj, Kamalpur Patdi, Kamalpur Navratri, Kamalpur Ahmedabad Parivar, Kamalpur Dasada"
        />
        <meta name="author" content="Kamalpur Youth" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Toaster />
      <Hero />
      <About />
      <div className="flex flex-col md:flex-row items-center justify-center px-6 md:px-12 space-y-8 md:space-y-0 md:space-x-8 mb-10 gap-5">
        {/* Text Content */}
        <motion.div
          className="text-center md:text-left max-w-md order-2 md:order-none"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textAnimation}
        >
          <div className="text-primary font-normal leading-2 text-center space-y-1.5">
            <p>
              કમાલપુર ગામ તે પવિત્ર સ્થળ છે, જ્યાં રામના નગર જેવો આનંદ અને
              ભક્તિનો રંગ છવાયેલો છે.
            </p>
            <p>
              કમાલપુર એ પરંપરાનું પવિત્ર કેન્દ્ર છે, જ્યાં ધર્મ અને સંસ્કૃતિ
              જીવંત રહે છે.
            </p>
            <p>
              કમાલપુરનાં લોકોની ઓળખ છે તેમની દયાળુતા અને શ્રદ્ધા, જ્યાં નમ્રતા
              અને પ્રેમ દરેક હૃદયમાં વિરાજે છે.
            </p>
            <p>
              કમાલપુર ગામ એ છે જ્યાં ભક્તિ અને એકતા પવનની જેમ વહે છે, અને દરેક
              મનમાં ભગવાનનું પ્રતિબિંબ દેખાય છે.
            </p>
            <p>
              કમાલપુર એ અનોખું ગામ છે, જ્યાં ભાઇચારાની સાથે આધ્યાત્મિક જીવન
              જીવવાનું એક સુન્દર સંકલ્પ છે.
            </p>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          className="flex-shrink-0 order-1 md:order-none"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={imageAnimation}
        >
          <Image
            src={temple}
            alt="About Us Image"
            width={400}
            height={400}
            className="rounded-lg"
          />
        </motion.div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center px-6 md:px-12 space-y-8 md:space-y-0 md:space-x-8 mb-10 gap-0 w-[90%] md:w-[80%] lg:w-[70%] mx-auto">
        {/* Video iframe with animation */}
        <motion.div
          className="w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={videoAnimation}
        >
          <iframe
            className="w-[100%] rounded-lg"
            height="315"
            src="https://www.youtube.com/embed/vYCLhe4h82Y?si=JwAZzTwgWeRyEgnu&amp;start=540"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </motion.div>

        {/* Text content with animation */}
        <motion.div
          className="text-center text-xl md:text-4xl font-karma font-extrabold text-primary underline max-w-md w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textAnimation}
        >
          <span>કમાલપુરની રામલીલાની ઝાંખી</span>
          </motion.div>
      </div>
      <div className="flex flex-col md:flex-row px-6 md:px-12 space-y-8 md:space-y-0 md:space-x-8 mb-8 gap-0 items-center justify-center w-[90%] md:w-[80%] lg:w-[70%] mx-auto">
        {/* Text Content */}
        <motion.div
          className="text-center md:text-left max-w-md w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textAnimation}
        >
          {/* First Block with Event Details */}
          <div className="text-white bg-primary p-2 mb-2 rounded-lg w-full font-normal leading-2 text-center space-y-1.5">
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold w-full pb-2 underline">
              કમાલપુર પટેલ પરિવાર અમદાવાદ{" "}
            </p>
            <p className="text-xl md:text-2xl font-semibold w-full">
              દસમો વાર્ષિક સ્નેહ મિલન સમારંભ{" "}
            </p>
          </div>

          {/* Second Block with Date and Location */}
          <div className="text-white bg-primary p-2 rounded-lg w-full font-normal leading-2 text-center space-y-1.5">
            <p className="text-lg md:text-xl font-medium w-full pb-1">
              {" "}
              તા.22/12/2024, રવિવાર, સવારે 08:00 કલાકે{" "}
            </p>
            <p className="text-lg md:text-xl font-medium w-full pb-">
              {" "}
              નંદનવન રિસોર્ટ, ઈન્દોર હાઇવે, ભાવડા, અમદાવાદ
            </p>
          </div>
        </motion.div>

        {/* Map iframe */}
        <motion.div
          className="w-full relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={mapAnimation}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3673.4130737066803!2d72.77531407531232!3d22.971832979209328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjLCsDU4JzE4LjYiTiA3MsKwNDYnNDAuNCJF!5e0!3m2!1sen!2sin!4v1733827445316!5m2!1sen!2sin"
            width="600"
            height="450"
            className="w-full rounded-lg"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          {/* Custom Text Over Map */}
          <div className="absolute bg-primary bottom-5 text-white text-lg py-2 px-2 w-[90%] left-1/2 transform -translate-x-1/2 text-center ring-[1px] ring-white rounded-lg font-medium">
            <p className="underline "> : સ્નેહ મિલન સમારંભ નું સ્થાન : </p>
            <p>નંદનવન રિસોર્ટ, ઈન્દોર હાઇવે, ભાવડા, અમદાવાદ </p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </>
  );
}
