"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const data = [
  {
    bgText: "ORIGIN",
    headline: "The Art of Silence",
    body: "Minimalism is not the lack of something, but the perfect amount of everything.",
  },
  {
    bgText: "FLOW",
    headline: "Motion as Language",
    body: "Interaction should feel like a conversation, intuitive and rhythmic.",
  },
  {
    bgText: "ETHOS",
    headline: "Timeless Design",
    body: "Built to endure the changing tides of digital trends.",
  }
];

export default function ElegantView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60, // Lower stiffness for a "floaty" feel
    damping: 25,
  });

  return (
    <main ref={containerRef} className="relative h-[400vh] bg-[#0a0a0a] text-stone-200">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Subtle Ambient Light Follower */}
        <div className="absolute inset-0" />
        
        {data.map((item, index) => (
          <ElegantSection 
            key={index} 
            item={item} 
            index={index} 
            progress={smoothProgress} 
            total={data.length} 
          />
        ))}
      </div>
    </main>
  );
}

function ElegantSection({ item, index, progress, total }: any) {
  const start = index / total;
  const end = (index + 1) / total;

  // Background Text Parallax (moves faster, stays blurred)
  const bgY = useTransform(progress, [start, end], [150, -150]);
  const bgOpacity = useTransform(progress, [start, start + 0.2, end - 0.2, end], [0, 0.07, 0.07, 0]);
  
  // Content Transitions
  const contentOpacity = useTransform(progress, [start, start + 0.15, end - 0.15, end], [0, 1, 1, 0]);
  const contentScale = useTransform(progress, [start, start + 0.2, end - 0.2, end], [0.1, 1, 1, 1.1]);
  const contentBlur = useTransform(progress, [start, start + 0.2, end - 0.2, end], ["100px", "0px", "0px", "100px"]);

  return (
    <motion.div
      style={{ opacity: contentOpacity }}
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
    >
      {/* Massive Background Watermark */}
      <motion.span
        style={{ y: bgY, opacity: bgOpacity }}
        className="absolute text-[20vw] font-black tracking-widest select-none pointer-events-none"
      >
        {item.bgText}
      </motion.span>

      {/* Main Content */}
      <motion.div
        style={{ scale: contentScale, filter: contentBlur }}
        className="relative z-10 flex flex-col items-center text-center px-6"
      >
        <h2 className="text-5xl md:text-7xl font-serif italic mb-6 tracking-tight text-white">
          {item.headline}
        </h2>
        <div className="w-12 h-[1px] bg-stone-500 mb-6" />
        <p className="max-w-lg text-lg md:text-xl text-stone-400 font-light leading-relaxed">
          {item.body}
        </p>
      </motion.div>
    </motion.div>
  );
}