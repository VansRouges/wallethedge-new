import React from 'react'
import Navbar from '@/components/Navbar'
import Header from '@/components/about/Header'
import CTA from '@/components/about/CTA'
import Info from '@/components/about/Info'
import Hero from '@/components/about/Hero'


import Footer from '@/components/Footer'

const about = () => {
  return (
    <>
        <Navbar />
        <Header />
        <Hero />
        <Info />
        <CTA />
        <a
        href="https://wa.me/33678850344"
        className="whatsapp_float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fa fa-whatsapp whatsapp-icon"></i>
      </a>
    <a
        href="https://wa.me/447477227706"
        className="whatsapp_float mb-20"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fa fa-whatsapp whatsapp-icon"></i>
      </a>
        <Footer />
    </>
  )
}

export default about