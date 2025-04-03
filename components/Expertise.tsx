"use client"
import React from 'react'
import { motion } from 'framer-motion';
// import { Disclosure } from '@headlessui/react'
// import { ChevronUpIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';

const Blog = () => {
  return (
    <>
        <div className="p-5 mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-1">
            <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
                <div className="lg:max-w-lg">
                <p className="text-base font-semibold leading-7 text-indigo-600 capitalize">Our Expertise</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-5">Why Invest With Wallethedge ?</h1>
                {/* <p className="mt-6 text-xl leading-8 text-gray-700">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p> */}
                </div>
            </div>
            </div>
            <div className="-ml-12 lg:-mt-1 -mt-12 p-10 lg:sticky lg:top-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                <Link href='/contact' className="bg-blue-600 uppercase p-4 w-44 text-center text-white lg:ml-[28rem]">
                  Contact us 
                </Link>
            </div>
        </div>
        <div className="justify-center lg:flex flex-row">
            <motion.div
                initial={{
                    y:-80,
                    opacity:0,
                }}
                transition={{ duration: 1.1 }}
                whileInView={{ opacity: 1, y:30 }}
                className="p-4 md:w-96">
                <div className="h-[31rem] border-2 border-gray-200 border-opacity-60 overflow-hidden bg-blue-800">
                    <img 
                        className="lg:h-60 md:h-36 w-full object-cover object-center"
                        src="/images/expertise2.jpg"
                        alt="blog image"
                    />
                    <div className="p-4">
                        <h1 className="text-2xl p-2 font-bold text-white">Trusted by Investor</h1>
                        {/* <p className="mb-3 text-xs">{item.date}</p> */}
                        <p className="leading-relaxed mb-6 p-2 text-gray-200">
                            Wallethedge is well trusted in the financial market. Our Clients around the globe are rest-assured that their funds are safe.
                        </p>
                        <div className="flex items-center flex-wrap ">
                            {/* <p className="inline-flex items-center md:mb-2 lg:mb-0 capitalize text-blue-500">learn More
                            </p> */}
                            {/* <span className="mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                                <FaThumbsUp className="w-4 h-4 mr-1" />{item.likes}
                            </span>
                            <span className="inline-flex items-center leading-none text-sm">
                                <FaComment className="w-4 h-4 mr-1" />{item.comment}
                            </span> */}
                        </div>
                    </div>
                </div>
            </motion.div>
            <motion.div
                initial={{
                    y:80,
                    opacity:0,
                }}
                transition={{ duration: 1.1 }}
                whileInView={{ opacity: 1, y:-10 }}
                className="p-4 md:w-96">
                <div className="h-full border-2 border-gray-200 border-opacity-60 overflow-hidden bg-blue-500">
                    <img 
                        className="lg:h-60 md:h-36 w-full object-cover object-center"
                        src="/images/expertise3.jpg"
                        alt="blog image"
                    />
                    <div className="p-4">
                        <h1 className="text-2xl p-2 font-bold text-white">Invest With Confidence</h1>
                        {/* <p className="mb-3 text-xs">{item.date}</p> */}
                        <p className="leading-relaxed mb-6 p-2 text-gray-200">
                            With our trading plans, your investment is safe. Wallethedge assures you that you can invest your money with confidence and expect good returns.
                        </p>
                        <div className="flex items-center flex-wrap ">
                            {/* <p className="inline-flex items-center md:mb-2 lg:mb-0 capitalize text-blue-300">learn More
                            </p> */}
                            {/* <span className="mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                                <FaThumbsUp className="w-4 h-4 mr-1" />{item.likes}
                            </span>
                            <span className="inline-flex items-center leading-none text-sm">
                                <FaComment className="w-4 h-4 mr-1" />{item.comment}
                            </span> */}
                        </div>
                    </div>
                </div>
            </motion.div>
            <motion.div
                initial={{
                    y:80,
                    opacity:0,
                }}
                transition={{ duration: 1.1 }}
                whileInView={{ opacity: 1, y:-50 }}
                className="p-4 md:w-96">
                <div className="h-full border-2 border-gray-200 border-opacity-60 overflow-hidden bg-blue-500">
                    <img 
                        className="lg:h-60 md:h-36 w-full object-cover object-center"
                        src="/images/expertise1.jpg"
                        alt="blog image"
                    />
                    <div className="p-4">
                        <h1 className="text-2xl p-2 font-bold text-white">Secure Platform</h1>
                        {/* <p className="mb-3 text-xs">{item.date}</p> */}
                        <p className="leading-relaxed mb-6 p-2 text-gray-200">
                            Wallethedge is very much secure. With our team of top developers, be rest assured that your money is safe and secure.
                        </p>
                        <div className="flex items-center flex-wrap ">
                            {/* <p className="inline-flex items-center md:mb-2 lg:mb-0 capitalize text-blue-300">learn More
                            </p> */}
                            {/* <span className="mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                                <FaThumbsUp className="w-4 h-4 mr-1" />{item.likes}
                            </span>
                            <span className="inline-flex items-center leading-none text-sm">
                                <FaComment className="w-4 h-4 mr-1" />{item.comment}
                            </span> */}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    </>
    
  )
}

export default Blog