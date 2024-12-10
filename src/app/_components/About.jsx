// components/AboutUs.tsx
"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import about from "../../assets/about.png";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex flex-col md:flex-row items-center justify-center px-6 md:px-12 space-y-8 md:space-y-0 md:space-x-8 mt-10 gap-1 mb-10"
    >
      {/* Single Image with Animation */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="flex-shrink-0"
      >
        <Image
          src={about} // Path to the combined image
          alt="About Us Image"
          width={400} // Adjust width as needed
          height={400} // Adjust height as needed
          className="rounded-lg"
        />
      </motion.div>

      {/* Text content with Animation */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="text-center md:text-left max-w-md"
      >
        <motion.h2
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-3xl text-center md:text-4xl font-extrabold underline text-primary mb-4 font-karma"
        >
          અમારા વિષે
        </motion.h2>

        <div className="text-primary font-normal leading-2 text-center space-y-1.5">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            કમાલપુર ગામ, જ્યાંથી અમારો પરંપરાગત વારસો અને સંસ્કાર શરૂ થાય છે.
            કમાલપુરના અનેક પરિવાર અમદાવાદ અને અલગ અલગ શહેરમાં વસવાટ કરી રહ્યા છે,
            પરંતુ અમારી ધરમરેખા અને સંબંધો કમાલપુર સાથે ગાઢ રીતે જોડાયેલા છે.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            કમાલપુર ગામે છેલ્લા ત્રણ પેઢીથી નવરાત્રીના પવિત્ર સમયમાં રામલીલા
            ભજવાય છે, જે અમારું ગૌરવ છે. રામલીલા માત્ર ધાર્મિક કર્તવ્ય નહીં, પણ
            સમગ્ર ગામની એકતા અને સૌહાર્દનું પ્રતીક છે. આ પરંપરાને જીવનંત રાખવું
            અને એમાં યોગદાન આપવું, અમારું ધ્યેય છે.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            ગામના યુવાધન એ અમારી ઉત્કૃષ્ટ ઓળખ છે. તેઓ નવું વિચારધારા અને
            જુસ્સાથી ભરપૂર છે, જે ગામની પરંપરાને આગળ ધપાવે છે. રામલીલા ઉપરાંત,
            તેઓ ગામના વિકાસ અને સાંસ્કૃતિક ઉત્સવોને સફળ બનાવવા માટે સતત કાર્યરત
            રહે છે.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
          >
            કમાલપુર અમારા માટે માત્ર એક ગામ નથી, તે અમારું ઘરેણું છે, જ્યાં શાંતિ,
            પરંપરા અને પ્રેમનો દરિયો વહે છે. અમારા માટે ગામની ભૂમિકા એનું
            આધ્યાત્મિક અને સામાજિક મહત્ત્વ છે, જે અમને હંમેશા ગર્વ આપે છે.
            અમારું ધ્યેય છે કે કમાલપુર ગામની આ પરંપરા જળવાઈ રહે અને આવનારી
            પેઢીઓને તેમાં સંસ્કાર અને મહત્વનો વારસો મળે.
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About;
