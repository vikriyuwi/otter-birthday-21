"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const sentences = [
  {
    text: "Experience the flow of modern design.",
    color: "from-blue-400 to-cyan-300"
  },
  {
    text: "Every scroll reveals a new perspective.",
    color: "from-purple-400 to-pink-300"
  },
  {
    text: "Precise control over every interaction.",
    color: "from-orange-400 to-yellow-300"
  }
];

export default function ScrubberView() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  return (
    <main className="bg-[#050505] text-white">
      <section className="h-[50vh] flex items-center justify-center">
        <p className="text-gray-500 uppercase tracking-widest text-sm">Scroll to Paint</p>
      </section>

      {/* Length of scroll is determined by h-[300vh] */}
      <div ref={targetRef} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-10">
          {sentences.map((item, i) => (
            <ScrubText 
              key={i} 
              item={item} 
              index={i} 
              progress={scrollYProgress} 
              total={sentences.length} 
            />
          ))}
        </div>
      </div>

      <section className="h-screen" />
    </main>
  );
}

interface ScrubProps {
  item: { text: string; color: string };
  index: number;
  progress: any;
  total: number;
}

function ScrubText({ item, index, progress, total }: ScrubProps) {
  const start = index / total;
  const end = (index + 1) / total;

  // This controls the "filling" effect of the text
  const opacity = useTransform(progress, [start, start + 0.1, end - 0.1, end], [0.2, 1, 1, 0.2]);
  const blur = useTransform(progress, [start, start + 0.1, end - 0.1, end], ["blur(4px)", "blur(0px)", "blur(0px)", "blur(4px)"]);
  const scale = useTransform(progress, [start, start + 0.1, end - 0.1, end], [0.9, 1, 1, 0.9]);

  return (
    <motion.h2
      style={{ opacity, filter: blur, scale }}
      className={`text-5xl md:text-7xl font-bold mb-8 text-center bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
    >
      {item.text}
    </motion.h2>
  );
}