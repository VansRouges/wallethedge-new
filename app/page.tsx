// import Image from "next/image";
import Navbar from "@/components/Navbar";
import Header from '@/components/Header'
import Info from '@/components/Info'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import Expertise from '@/components/Expertise'
import Accordion from '@/components/Accordion'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <Header />
      <Info />
      <Hero />
      <Stats />
      <Expertise />
      <Accordion />
      <Testimonials />
      <a
        href="https://wa.me/33678850344"
        className="whatsapp_float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fa fa-whatsapp whatsapp-icon"></i>
      </a>
      <Footer />
    </div>
  );
}
