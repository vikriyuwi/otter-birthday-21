"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  "/images/otter/1.jpg",
  "/images/otter/2.jpg",
  "/images/otter/3.jpg",
  "/images/otter/4.jpg",
  "/images/otter/5.jpg",
];

export default function ImageSlideShow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[100vh] overflow-hidden bg-black">
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, y: -20 }} // Starts slightly above and transparent
          animate={{ opacity: 1, y: 0 }}    // Slides down to center and becomes visible
          exit={{ opacity: 0, y: 20 }}     // Slides further down and fades out
          transition={{
            duration: 3,
            ease: [0.4, 0, 0.2, 1], // Smooth cubic-bezier
          }}
        >
          <img
            src={images[index]}
            alt={`Slide ${index}`}
            className="w-full h-full object-cover"
          />
          
          {/* Optional Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay Example */}
      <div className="absolute inset-0 flex flex-col items-center justify-end mb-10 2xl:mb-32 z-10 text-theme-green text-center px-10">
        <p className='mt-5 2xl:mt-10'><span className='italic font-serif'>Dec 24, 2025</span></p>
        <p className="mt-4 font-black text-6xl md:text-8xl font-serif italic">Happy Birthday,<br />Bubub!</p>
        <p className='mt-4'>From: <span className="text-pink-400 font-black font-serif italic">LDMV</span>—your boyfriend, your love, love of your life, right now, future, and forevermore</p>
      </div>
    </div>
  );
};