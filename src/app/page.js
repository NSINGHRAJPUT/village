import Hero from "./_components/Hero";
import { Toaster } from "react-hot-toast";
import About from "./_components/About";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <>
      <Toaster />
      <Hero />
      <About />
      <Footer />
    </>
  );
}
