// components/AboutUs.tsx
import Image from "next/image";
import about from "../../assets/about.png";

const About = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center px-6 md:px-12  space-y-8 md:space-y-0 md:space-x-8 mt-10  gap-1 mb-10">
      {/* Single Image */}
      <div className="flex-shrink-0">
        <Image
          src={about} // Path to the combined image
          alt="About Us Image"
          width={400} // Adjust width as needed
          height={400} // Adjust height as needed
          className="rounded-lg"
        />
      </div>

      {/* Text content */}
      <div className="text-center md:text-left max-w-md">
        <h2 className="text-3xl text-center md:text-4xl font-extrabold underline text-primary mb-4 font-karma">
          અમારા વિષે 
        </h2>
        <div className="text-primary font-normal leading-2 text-center space-y-1.5">
          <p>
            કમાલપુર ગામ,જ્યાંથી અમારો પરંપરાગત વારસો અને સંસ્કાર શરૂ થાય છે.
            કમાલપુરના અનેક પરિવાર અમદાવાદ અને અલગ અલગ શહેર માં વસવાટ કરી રહ્યાં છીએ, પરંતુ અમારી
            ધરમરેખા અને સંબંધો કમાલપુર સાથે ગાઢ રીતે જોડાયેલા છે.
          </p>
          <p>
            કમાલપુર ગામે છેલ્લા ત્રણ પેઢીથી નવરાત્રીના પવિત્ર સમયમાં રામલીલા
            ભજવાય છે, જે અમારું ગૌરવ છે. રામલીલા માત્ર ધાર્મિક કર્તવ્ય નહીં, પણ
            સમગ્ર ગામની એકતા અને સૌહાર્દનું પ્રતીક છે. આ પરંપરાને જીવનંત રાખવું
            અને એમાં યોગદાન આપવું, અમારું ધ્યેય છે.
          </p>
          <p>
            ગામના યુવાધન એ અમારી ઉત્કૃષ્ટ ઓળખ છે. તેઓ નવું વિચારધારા અને
            જુસ્સાથી ભરપૂર છે, જે ગામની પરંપરાને આગળ ધપાવે છે. રામલીલા ઉપરાંત,
            તેઓ ગામના વિકાસ અને સાંસ્કૃતિક ઉત્સવોને સફળ બનાવવા માટે સતત કાર્યરત
            રહે છે.
          </p>

          <p>
            કમાલપુર અમારા માટે માત્ર એક ગામ નથી, તે અમારું ઘરેણું છે, જ્યાં
            શાંતિ, પરંપરા અને પ્રેમનો દરિયો વહે છે. અમારા માટે ગામની ભૂમિકા એનું
            આધ્યાત્મિક અને સામાજિક મહત્ત્વ છે, જે અમને હંમેશા ગર્વ આપે છે.
            અમારું ધ્યેય છે કે કમાલપુર ગામની આ પરંપરા જળવાઈ રહે અને આવનારી
            પેઢીઓને તેમાં સંસ્કાર અને મહત્વનો વારસો મળે.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
