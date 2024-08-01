import Image from "next/image";
import Link from "next/link";
import Hero from "./_components/Hero";

export default function Home() {
  return (
    <Hero />
    // <div className="w-full flex items-center justify-center h-[100vh] bg-slate-600 relative landing_page">
    //   <div className="w-full h-full flex items-center flex-wrap justify-center gap-12">
    //     <Link
    //       href={"/login"}
    //       className="px-6 py-2.5 ring-1 ring-white hover:ring-transparent  text-white text-xl font-bold tracking-widest hover:bg-gradient-to-r from-[#50bd08] to-blue-800 transition duration-100 ease-in-out "
    //     >
    //       LOGIN
    //     </Link>
    //     <Link
    //       href={"/register"}
    //       className=" px-6 ring-1 py-2.5 ring-white hover:ring-transparent text-white text-xl font-bold tracking-widest   hover:bg-gradient-to-r from-[#50bd08] to-blue-800  transition duration-100 ease-in-out"
    //     >
    //       REGISTER
    //     </Link>
    //   </div>
    //   <div className="absolute bottom-[1%] left-0 w-full h-[17%] bg-gradient-to-b from-transparent to-[#50bd08]"></div>
    // </div>
  );
}
