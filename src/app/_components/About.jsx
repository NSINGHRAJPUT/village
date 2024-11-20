// components/AboutUs.tsx
import Image from 'next/image';
import about from '../../assets/about.png';

const About = () => {
  return (
    <div className="flex my-12 flex-col md:flex-row items-center justify-center px-6 md:px-12 py-8 space-y-8 md:space-y-0 md:space-x-8">
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
        <h2 className="text-3xl text-center md:text-4xl font-bold text-primary mb-4 font-karma">
          About Us
        </h2>
        <p className="text-primary font-normal leading-2 text-center">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type 
          specimen book. It has survived not only five centuries, but also the leap into 
          electronic typesetting, remaining essentially unchanged. It was popularised in 
          the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
          and more recently with desktop publishing software like Aldus PageMaker 
          including versions of Lorem Ipsum.
        </p>
      </div>
    </div>
  );
};

export default About;
