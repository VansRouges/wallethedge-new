"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link'


export default function Footer(){
    return (
        <footer className="bg-blue-500 text-white">
            <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
                <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
                    <div className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                        <div className="text-3xl text-blue-500 font-bold">
                            <img
                                className="h-8 w-60 ml-2 cursor-pointer"
                                src="/images/logo-2.webp"
                                alt="Your Company"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex-grow flex flex-wrap md:pl-8 -mb-10 md:mt-0 mt-10 md:text-left text-center">
                    <motion.div
                        initial={{
                            y:80,
                            opacity:0,
                        }}
                        transition={{ duration: .5 }}
                        whileInView={{ opacity: 1, y:0 }}
                        className="lg:w-1/4 md:w-1/2 w-full px-4">
                        <h2 className="font-semibold text-lg mb-3">Quick Links</h2>
                        <nav className="list-none mb-10">
                            <Link href="/" className="mb-2 cursor-pointer">
                                Home
                            </Link>
                            <li className="mb-2 cursor-pointer">
                                Privacy Policy
                            </li>
                            <Link href="/terms" className="mb-2 cursor-pointer">
                                Terms and Conditions
                            </Link>
                            
                        </nav>
                    </motion.div>

                    <motion.div
                        initial={{
                            y:80,
                            opacity:0,
                        }}
                        transition={{ duration: .80 }}
                        whileInView={{ opacity: 1, y:0 }}
                        className="lg:w-1/4 md:w-1/2 w-full px-4">
                        <h2 className="font-semibold text-lg mb-3">Support</h2>
                        <nav className="list-none mb-10">
                            {/* <li className="mb-2 cursor-pointer">
                                How it works
                            </li> */}
                            {/* <li className="mb-2 cursor-pointer">
                                Pricing Plan
                            </li> */}
                            <Link href="/sign-in" className="mb-2 cursor-pointer">
                                Register
                            </Link>
                            {/* <li className="mb-2 cursor-pointer">
                                FAQs
                            </li> */}
                            {/* <li className="mb-2 cursor-pointer">
                                Terms of use
                            </li> */}
                        </nav>
                    </motion.div>

                    <motion.div
                        initial={{
                            y:80,
                            opacity:0,
                        }}
                        transition={{ duration: 1.1 }}
                        whileInView={{ opacity: 1, y:0 }}
                        className="lg:w-1/4 md:w-1/2 w-full px-4">
                        <h2 className="font-semibold text-lg mb-3">Contact Us</h2>
                        <nav className="list-none mb-10">
                            <li className="mb-2 cursor-pointer">
                                +1(706)315-1689
                            </li>
                            <li className="mb-2 cursor-pointer">
                                support@wallethedge.org
                            </li>
                            <li className="mb-2 cursor-pointer">
                                225 Central Park West, New York, NY 10024
                            </li>
                        </nav>
                    </motion.div>

                    {/* <motion.div
                        initial={{
                            y:80,
                            opacity:0,
                        }}
                        transition={{ duration: 1.4 }}
                        whileInView={{ opacity: 1, y:0 }}
                        className="lg:w-1/4 md:w-1/2 w-full px-4">
                        <h2 className="font-semibold text-lg mb-3">Part 4</h2>
                        <nav className="list-none mb-10">
                            <li className="mb-2 cursor-pointer">
                                First Link
                            </li>
                            <li className="mb-2 cursor-pointer">
                                Second Link
                            </li>
                            <li className="mb-2 cursor-pointer">
                                Third Link
                            </li>
                            <li className="mb-2 cursor-pointer">
                                Fourth Link
                            </li>
                        </nav>
                    </motion.div> */}
                </div>
            </div>
            <div className="">
                <div className="container mx-auto py-6 px-5 align-center text-center">
                    <p className="text-base text-center">Copyright © WalletHedge 2024</p>
                </div>
            </div>
        </footer>
    )
}
