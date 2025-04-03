"use client"
import React, { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import { FaStar, FaQuoteRight } from "react-icons/fa";


const Testimonials = () => {
    const slides = [
        {
          name: "Fernando Rodriges",
          role: 'Client',
          star: <FaStar className="text-blue-500" />,
          info: "I'm really glade i came across Wallethedge. Now i can store my crypto coins and copy trade from the best!",
          url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
        },
        {
          name: "Wright Philip",
          role: 'Client',
          star: <FaStar className="text-blue-500" />,
          info: "Very good user interface, so easy to navigate. I can't wait to make my next withdrawal soon.",
          url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
        },
        {
          name: "Ryan Shmicell",
          role: 'Client',
          star: <FaStar className="text-blue-500" />,
          info: "Top investment plans. Can't believe i started trading less than two months ago and I'm making good profits. lovely team!",
          url: 'https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80',
        },
    
        {
          name: "Keyla Dunn",
          role: 'Client',
          star: <FaStar className="text-blue-500" />,
          info: "I'm just soo excited i started copy trading with Wallethedge, best ever.",
          url: 'https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80',
        },
      ];
    
      const [currentIndex, setCurrentIndex] = useState(0);
    
      const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
      };
    
      const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
      };
    
    // interface Slide {
    //   name: string;
    //   role: string;
    //   star: JSX.Element;
    //   info: string;
    //   url: string;
    // }

    const goToSlide = (slideIndex: number): void => {
      setCurrentIndex(slideIndex);
    };

  return (
    <>
        <div className="bg-sea3 brightness-50 h-96 bg-fixed bg-no-repeat bg-cover">
            {/* <h2 className="font-bold text-4xl">Sample Section</h2> */}
        </div>
        <div className="relative bottom-80 lg:bottom-0 mx-auto pt-8 -mb-24 grid max-w-2xl grid-cols-1 gap-x-8 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className='grid place-items-center'>
            <div className='px-4'>
                <div className="lg:max-w-lg">
                    <h2 className="text-lg leading-7 text-white lg:text-blue-500 capitalize font-semibold">Clients Feedback</h2>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-white lg:text-blue-900 sm:text-4xl capitalize">Clients Feedback</p>
                    <p className="mt-6 text-lg leading-8 text-gray-200 lg:text-gray-600 font-light">
                      Check out some feedbacks from our lovely clients around the globe.
                    </p>
                </div>
            </div>
          </div>
          <div className='grid place-items-center'>
              <div className='max-w-lg h-[26rem] relative lg:bottom-64 border-2/30 shadow-lg w-full m-auto py-16 px-4 group bg-white/30 backdrop-blur-md'>
                <div className='w-full h-full rounded-2xl p-3'>
                    <p className='p-3 text-lg'>{slides[currentIndex].info}</p>
                    <div className='flex pt-3 px-4 justify-between'>
                        <span className='flex'>{slides[currentIndex].star}{slides[currentIndex].star}{slides[currentIndex].star}{slides[currentIndex].star}</span>
                        <span><FaQuoteRight className="text-gray-400 text-6xl relative bottom-4" /></span>
                    </div>
                    <div className='flex gap-3 -mt-4 pb-3'>
                        <img
                            className='border-2 rounded-full w-16 h-16'
                            src={slides[currentIndex].url}
                            alt=''
                        />
                        <div className='flex-row'>
                            <h2 className='text-blue-500 font-bold'>{slides[currentIndex].name}</h2>
                            <p>{slides[currentIndex].role}</p>
                        </div>
                    </div>
                    
                </div>
                {/* Left Arrow */}
                <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                    <BsChevronCompactLeft onClick={prevSlide} size={30} />
                </div>
                {/* Right Arrow */}
                <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                    <BsChevronCompactRight onClick={nextSlide} size={30} />
                </div>
                <div className='flex top-4 justify-center py-2'>
                    {slides.map((slide, slideIndex) => (
                    <div
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                        className='text-2xl cursor-pointer'
                    >
                        <RxDotFilled />
                    </div>
                    ))}
                </div>
                </div>
          </div>
          
        </div>
    </>
  )
}

export default Testimonials