import React from 'react'
import Navbar from '@/components/Navbar'
import CHeader from '@/components/contact/contactHeader'
import CHero from '@/components/contact/contactHero'
import Footer from '@/components/Footer'


const contactUs = () => {
  return (
    <>
      <Navbar />
      <CHeader />
      <CHero />
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

export default contactUs