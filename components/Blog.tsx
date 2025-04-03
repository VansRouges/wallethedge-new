"use client"
import React from 'react';
// import { FaThumbsUp, FaComment } from "react-icons/fa";
import { blogData } from './blogData';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Blog = () => {
    return (
      <>
        <section className="">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4">
            {blogData.map((item) => (
              <motion.div
                  initial={{
                    x:80,
                    opacity:0,
                }}
                transition={{ duration: 1.1 }}
                whileInView={{ opacity: 1, x:0 }}
                className="p-4 md:w-1/3 rounded-lg" key={item.id}>
                <div className="h-full border-2 border-gray-200 border-opacity-60 overflow-hidden bg-blue-200 rounded-xl">
                  <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={item.linkImg} alt={item.name} />
                  <div className="p-4">
                    <h1 className="text-xl font-bold">{item.name}</h1>
                    {/* <p className="mb-3 text-xs">{item.date}</p> */}
                    <p className="leading-relaxed mb-3 font-light text-sm">{item.info}...</p>
                    <div className="flex items-center flex-wrap ">
                      <Link href={item.url} className="inline-flex items-center md:mb-2 lg:mb-0 text-sm font-semibold">Read More</Link>
                    </div>
                  </div>
                </div>
              </motion.div>
             ))}
  
            </div>
          </div>
        </section>
      </>
    )
  }
  
  export default Blog