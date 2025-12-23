"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Now holding JSX elements instead of just strings
const sentences = [
  {
    id: 0,
    headline: <p key="5" className="text-6xl md:text-9xl font-bold">Let me capture your attention for a moment.</p>,
  },
  {
    id: 1,
    headline: <p key="5" className="text-6xl md:text-9xl font-bold">Have you realized what day this is?</p>,
  },
  {
    id: 1,
    headline: <p key="5" className="text-6xl md:text-9xl font-bold">Dec 24, 2025</p>,
  },
  {
    id: 2,
    headline: <p key="5" className="text-6xl md:text-9xl font-bold">It is the anniversary of a miracle.</p>,
  },
  {
    id: 3,
    headline: <p key="5" className="text-6xl md:text-9xl font-bold">Two decades and one year ago, someone took his first breath.</p>,
  },
  {
    id: 4,
    headline: <p key="5" className="text-6xl md:text-9xl font-bold">Today, he stands as a person of rare</p>,
  },
  {
    id: 5,
    headline: <p key="5" className="text-6xl md:text-9xl font-bold">and dazzling quality—utterly lovely</p>,
  },
  {
    id: 6,
    headline: <p key="5" className="text-6xl md:text-9xl font-bold">and impossible not to adore.</p>,
  }
];


export default function StickyScrollView() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2], // Start changing immediately as the second div enters
    ["#0a0a0a", "#D9FF00"] 
  );

  return (
    <motion.main style={{ backgroundColor }} className="text-white">
      {/* 100vh for every sentence to give enough scroll space */}
      <div ref={containerRef} className="relative h-[500vh]">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
          {sentences.map((element, index) => (
            <Sentence 
              key={index} 
              element={element} 
              index={index} 
              progress={scrollYProgress} 
              total={sentences.length} 
            />
          ))}
        </div>
      </div>
    </motion.main>
  );
}

function Sentence({ element, index, progress, total }: any) {
  const start = index / total;
  const end = (index + 1) / total;
  
  // Maps the scroll progress to opacity and movement
  const opacity = useTransform(progress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0]);
  const scale = useTransform(progress, [start, start + 0.05, end - 0.05, end], [0.5, 1, 1, 1.5]);

  return (
    <motion.div
      style={{ opacity, scale }}
      className="absolute inset-0 flex flex-col gap-4 items-center justify-center px-20 md:px-72 text-center text-black"
    >
      {/* Rendering the p tag directly */}
      {element.headline}
    </motion.div>
  );
}